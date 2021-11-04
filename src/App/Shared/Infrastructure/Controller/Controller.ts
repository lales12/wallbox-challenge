import { ICommand } from "../Bus/Command/ICommand";
import { CommandBus } from "../Bus/Command/CommandBus";
import { IQuery } from "../Bus/Query/IQuery";
import { QueryBus } from "../Bus/Query/QueryBus";
import { EventPublisher } from "../Event/EventPublisher";

export class Controller {
  public event: string;
  private _urlRegExp: RegExp;

  constructor(event: string, urlRegexp: RegExp) {
    this.event = event;
    this._urlRegExp = urlRegexp;
  }

  protected getUrlParams(path: string): string[] {
    const regexpExec = this._urlRegExp.exec(path);

    if (regexpExec) {
      return regexpExec.slice(1);
    }

    return [];
  }

  public checkUrl(path: string): boolean {
    return this._urlRegExp.test(path);
  }
  
  public subscribeEvent(type: string, callback: (data: any) => void): void {
    EventPublisher.getInstance().subscribe(type, callback);
  }

  public unsubscribeEvent(type: string, callback: (data: any) => void): void {
    EventPublisher.getInstance().unsubscribe(type, callback);
  }

  public async dispatch(command: ICommand): Promise<void> {
    const commandBus = CommandBus.getInstance();

    await commandBus.dispatch(command);
  }

  public async query(query: IQuery): Promise<any> {
    const queryBus = QueryBus.getInstance();

    await queryBus.query(query);
  }
}
