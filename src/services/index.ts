import "reflect-metadata";
import { container } from "tsyringe";
import { type IConcepts } from "./concepts/IConcepts";
import { ConceptNetApi } from "./concepts/concept-net-api";

export const TYPES = {
  IConcept: Symbol.for("IConcept")
};

export type { IConcepts };

container.register(TYPES.IConcept, {
  useClass: ConceptNetApi
});

export { container };
