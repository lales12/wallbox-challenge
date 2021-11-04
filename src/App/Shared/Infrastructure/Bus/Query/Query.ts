import { IQuery } from "./IQuery";

export class Query implements IQuery {
  public query(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
