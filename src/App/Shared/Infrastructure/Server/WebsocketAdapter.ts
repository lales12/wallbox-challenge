import { IncomingMessage } from "http";
import { WebSocket } from "ws";
import { IServerAdapter } from "./IServerAdapter";

export class WebsocketAdapter  implements IServerAdapter {
  private readonly _data: any;
  private readonly _ws: WebSocket;
  private readonly _request: IncomingMessage;

  constructor(
    ws: WebSocket,
    request: IncomingMessage,
  ) {
    this._ws = ws;
    this._request = request;
  }

  get url(): string {
    return this._request.url || '';
  }


  public send(data: any): void {
    this._ws.send(JSON.stringify(data));
  }

  public getQueryParams(): any {
    return this._data;
  }
}



