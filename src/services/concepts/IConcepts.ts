
export interface ConceptOutputType { [key: string]: ConceptOutputType }

export interface IConcepts {
  getConcepts: (term: string) => Promise<string>
}
