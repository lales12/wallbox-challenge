import { IQuery } from "./IQuery";

export interface IQueryHandler {
    handle(query: IQuery): Promise<any>;
}