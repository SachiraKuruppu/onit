import { ConceptNetApi } from "../concept-net-api";

class MockConceptNetApi extends ConceptNetApi {
  async callGenerateHierarchicalJson(conceptsMap: Map<string, string[]>, term: string): Promise<string> {
    return await this.generateHierarchicalJson(conceptsMap, term);
  }

  async callFetchConceptsRecursively(term: string, limit: number, maxLevel: number): Promise<Map<string, string[]>> {
    return await this.fetchConceptsRecursively(term, limit, maxLevel);
  }

  async fetchConcepts(term: string, limit: number): Promise<string[]> {
    return ["a", "b", "c"];
  }
}

test("should be able to generate a hierarchical json given a concept map", async () => {
  const mockApi = new MockConceptNetApi({
    fetch: async (url: string) => {
      return new Response();
    }
  });

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
  const mockApi = new MockConceptNetApi({
    fetch: async (url: string) => {
      return new Response();
    }
  });

  const conceptMap = await mockApi.callFetchConceptsRecursively("z", 100, 10);

  // With the current logic, it is still possible to have circular connections (e.g. a -> b -> a). I assume ConceptAPI won't do this.
  expect(conceptMap.size).toBe(4);
  expect(conceptMap.get("z")).toStrictEqual(["a", "b", "c"]);
  expect(conceptMap.get("a")).toStrictEqual(["b", "c"]);
  expect(conceptMap.get("b")).toStrictEqual(["a", "c"]);
  expect(conceptMap.get("c")).toStrictEqual(["a", "b"]);
});

test("should call the concept api endpoint", async () => {
  class MockConceptNetApiFetchTest extends ConceptNetApi {
    async callFetchConcepts(term: string, limit: number): Promise<string[]> {
      return await this.fetchConcepts(term, limit);
    }
  }

  const mockFetchFunction = jest.fn();

  const mockApi = new MockConceptNetApiFetchTest({
    fetch: async (url: string) => {
      mockFetchFunction(url as any);
      return new Response(`{
        "edges": []
      }`);
    }
  });

  const expectedUrl = `https://api.conceptnet.io/query?start=${encodeURIComponent(`/c/en/supreme_court`)}&rel=/r/IsA&limit=100`;

  await mockApi.callFetchConcepts("supreme court", 100);

  expect(mockFetchFunction).toHaveBeenCalledWith(expectedUrl);
});

test("should be able to limit the hierarchy depth", async () => {
  const mockApi = new MockConceptNetApi({
    fetch: async (url: string) => {
      return new Response();
    }
  });

  const conceptMap = await mockApi.callFetchConceptsRecursively("z", 100, 1);

  expect(conceptMap.size).toBe(1);
  expect(conceptMap.get("z")).toStrictEqual(["a", "b", "c"]);
});
