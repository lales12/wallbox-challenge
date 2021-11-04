
import container from "App/Shared/Infrastructure/DependencyInjection/Container";
import { HandlerForQueryNotFoundException } from "App/Shared/Infrastructure/Exception/HandlerForQueryNotFoundException";

import { IQuery } from "./IQuery";
import { IQueryBus } from "./IQueryBus";
import { IQueryHandler } from "./IQueryHandler";

export class QueryBus implements IQueryBus {
  private static _instance: QueryBus;


  static getInstance(): QueryBus {
    QueryBus._instance = QueryBus._instance || new QueryBus();

    return QueryBus._instance;
  }

  public async query(Query: IQuery): Promise<void> {
    const queryName = Object.getPrototypeOf(Query).constructor.name as string;

    const handler = container.get<IQueryHandler>(queryName);

    if (handler) {
      return await handler.handle(Query);
    }

    throw new HandlerForQueryNotFoundException(Query);
  }

  public register(
    Query: IQuery,
    handler: any
  ): void {
    const queryName = Object.getPrototypeOf(Query).constructor.name as string;

    container.bind(queryName).to(handler);
  }
}
