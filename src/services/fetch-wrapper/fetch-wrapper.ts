import "reflect-metadata";
import { injectable } from "tsyringe";
import { type IFetch } from "./IFetch";

@injectable()
export class FetchWrapper implements IFetch {
  async fetch(url: string): Promise<Response> {
    return await fetch(url);
  }
}
