import "reflect-metadata";
import { injectable } from "tsyringe";
import { Queue } from "queue-typescript";
import { type IConcepts } from "./IConcepts";

interface ConceptApiEdgeType { end: { label: string }}
interface GraphType { [key: string]: GraphType }

@injectable()
export class ConceptNetApi implements IConcepts {
  async getConcepts(term: string): Promise<string> {
    const conceptsMap = await this.fetchConceptsRecursively(term, 100);
    const hierarchicalJson = await this.generateHierarchicalJson(conceptsMap, term);

    return hierarchicalJson;
  }

  private escapeTerm(term: string): string {
    return term.split(" ").join("_");
  }

  protected async fetchConceptsRecursively(term: string, limit: number): Promise<Map<string, string[]>> {
    let currentLimit = limit;
    const conceptsMap = new Map<string, string[]>();
    const q = new Queue<{ level: number, term: string }>();
    q.enqueue({ level: 0, term });

    while (q.length > 0) {
      const { level, term: newTerm } = q.dequeue();
      console.log(`level: '${level}', term: '${newTerm}'`);
      if (!conceptsMap.has(newTerm)) {
        const concepts = await this.fetchConcepts(newTerm, currentLimit);
        const filteredConcepts = concepts.filter(concept => concept !== newTerm);
        conceptsMap.set(newTerm, filteredConcepts);

        filteredConcepts.forEach(concept => { q.enqueue({ level: level + 1, term: concept }); });
        currentLimit -= filteredConcepts.length;
      }
    }

    return conceptsMap;
  }

  protected async generateHierarchicalJson(conceptsMap: Map<string, string[]>, term: string): Promise<string> {
    const nodeList: GraphType = {};

    conceptsMap.forEach((values, key) => {
      nodeList[key] = {};
    });

    conceptsMap.forEach((values, key) => {
      values.forEach(child => {
        nodeList[key][child] = nodeList[child];
      });
    });

    return JSON.stringify({ [term]: nodeList[term] }, null, 4);
  }

  protected async fetchConcepts(term: string, limit: number): Promise<string[]> {
    // prepare url to fetch search results
    const baseAddress = "https://api.conceptnet.io";
    const preparedQuery = `/c/en/${this.escapeTerm(term)}`;
    const encodedQuery = encodeURIComponent(preparedQuery);
    const encodedLimit = encodeURIComponent(limit);
    const preparedUrl = `${baseAddress}/query?start=${encodedQuery}&rel=/r/IsA&limit=${encodedLimit}`;

    const response = await fetch(preparedUrl);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const edges: ConceptApiEdgeType[] = data.edges;

    return edges.map(edge => edge.end.label);
  }
}
