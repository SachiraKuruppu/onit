import "reflect-metadata";
import { container } from "tsyringe";
import { type IConcepts } from "./concepts/IConcepts";
import { ConceptNetApi } from "./concepts/concept-net-api";
import { type IFetch } from "./fetch-wrapper/IFetch";
import { FetchWrapper } from "./fetch-wrapper/fetch-wrapper";

export const TYPES = {
  IConcept: Symbol.for("IConcept"),
  IFetch: Symbol.for("IFetch")
};

export type { IConcepts, IFetch };

container.register(TYPES.IFetch, {
  useClass: FetchWrapper
});

container.register(TYPES.IConcept, {
  useClass: ConceptNetApi
});

export { container };
