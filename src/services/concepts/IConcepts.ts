
export interface ConfigType {
  limit: number
  maxLevel: number
}

export interface IConcepts {
  getConcepts: (term: string, config: ConfigType) => Promise<string>
}
