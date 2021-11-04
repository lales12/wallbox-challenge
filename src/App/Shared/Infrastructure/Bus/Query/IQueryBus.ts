import { IQuery } from "./IQuery";

export interface IQueryBus {
    query(query: IQuery): Promise<any>;
}