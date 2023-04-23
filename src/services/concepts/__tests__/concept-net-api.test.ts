import { ConceptNetApi } from "../concept-net-api";

class MockConceptNetApi extends ConceptNetApi {
  async callGenerateHierarchicalJson(conceptsMap: Map<string, string[]>, term: string): Promise<string> {
    return await this.generateHierarchicalJson(conceptsMap, term);
  }

  async callFetchConceptsRecursively(term: string, limit: number): Promise<Map<string, string[]>> {
    return await this.fetchConceptsRecursively(term, limit);
  }

  async fetchConcepts(term: string, limit: number): Promise<string[]> {
    return ["a", "b", "c"];
  }
}

test("should be able to generate a hierarchical json given a concept map", async () => {
  const mockApi = new MockConceptNetApi();

  const conceptMap = new Map<string, string[]>([
    ["a", ["b", "c"]],
    ["b", ["c"]],
    ["c", []]
  ]);
  const expectedJsonString = `
    {
        "a": {
            "b": {
                "c": {}
            },
            "c": {}
        }
    }
  `;

  const jsonString = await mockApi.callGenerateHierarchicalJson(conceptMap, "a");
  expect(jsonString.replace(/[\n\r\s]+/g, "")).toBe(expectedJsonString.replace(/[\n\r\s]+/g, ""));
});

test("should be able to fetch recursively and construct the concepts map", async () => {
  const mockApi = new MockConceptNetApi();

  const conceptMap = await mockApi.callFetchConceptsRecursively("z", 100);

  // With the current logic, it is still possible to have circular connections (e.g. a -> b -> a). I assume ConceptAPI won't do this.
  expect(conceptMap.size).toBe(4);
  expect(conceptMap.get("z")).toStrictEqual(["a", "b", "c"]);
  expect(conceptMap.get("a")).toStrictEqual(["b", "c"]);
  expect(conceptMap.get("b")).toStrictEqual(["a", "c"]);
  expect(conceptMap.get("c")).toStrictEqual(["a", "b"]);
});
