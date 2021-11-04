import { IDomainEvent } from "@shared/Domain/Event/IDomainEvent";
import { IController } from "@shared/Infrastructure/Controller/IController";
import { IncomingMessage } from "http";
import { Server, WebSocket } from "ws";
import { EventBus } from "../Event/EventBus";
import { EventPublisher } from "../Event/EventPublisher";

import { IServer } from "./IServer";
import { IServerAdapter } from "./IServerAdapter";
import { WebsocketAdapter } from "./WebsocketAdapter";

export class WebSocketServer implements IServer {
  private _ports: number[];
  private _wss: Server[] | undefined;

  private _registeredControllers: IController[];
  private _registeredEventsControllers: IController[];

  constructor(ports = [8080], eventPublisher: EventPublisher) {
    this._ports = ports;
    this._registeredControllers = [];
    this._registeredEventsControllers = [];
  }

  public registerController(controller: IController) {
    this._registeredControllers.push(controller);
  }

  public registerEventController(controller: IController) {
    this._registeredEventsControllers.push(controller);
  }

  public start(): void {
    this._wss = this._ports.map((port) => {
      const ws = new Server({ port });
      console.log("Starting server on port", port);
      
      ws.on("connection", (_ws: WebSocket, request: IncomingMessage) => {
        const adapter = new WebsocketAdapter(_ws, request);

        this._runConnectionController(adapter);

        _ws.on("message", this._handleMessage.bind(this, adapter));
        _ws.on("error", this._handleError.bind(this, adapter));
        _ws.on("close", this._handleClose.bind(this, adapter));
      });

      return ws;
    });
  }

  private _handleMessage(adapter: IServerAdapter, message: BinaryData): void {
    try {
      const data = JSON.parse(message.toString());
      const controller = this._getController(data.event);

      if (controller) {
        controller.run(adapter, data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private _runConnectionController(adapter: IServerAdapter): void {
    const controllers = this._getEventsController(adapter.url);

    controllers.forEach((controller: IController) => {
      controller.run(adapter, {});
    });
  }

  private _handleError(adapter: IServerAdapter, error: any): void {
    adapter.send(JSON.stringify({ error: error.message }));
    console.log(error);
  }

  private _handleClose(adapter: IServerAdapter): void {
    console.log("Connection closed");
  }

  private _getEventsController(path: string): IController[] {
    return this._registeredEventsControllers.filter((c) => c.checkUrl(path));
  }

  private _getController(event: string): IController | undefined {
    return this._registeredControllers.find((c) => c.event === event);
  }

  public stop(): Promise<void> {
    return Promise.resolve();
  }
}
