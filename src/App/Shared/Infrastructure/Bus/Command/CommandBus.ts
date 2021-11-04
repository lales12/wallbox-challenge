import { ICommand } from "@shared/Infrastructure/Bus/Command/ICommand";

import container from "@shared/Infrastructure/DependencyInjection/Container";
import { HandlerForCommandNotFoundException } from "@shared/Infrastructure/Exception/HandlerForCommandNotFoundException";

import { ICommandBus } from "./ICommandBus";
import { ICommandHandler } from "./ICommandHandler";

export class CommandBus implements ICommandBus {
  private static _instance: CommandBus;
  private readonly _handlersToCommand: { [key: string]: string } = {};

  static getInstance(): CommandBus {
    CommandBus._instance = CommandBus._instance || new CommandBus();

    return CommandBus._instance;
  }

  public async dispatch(command: ICommand): Promise<void> {
    const handler = this.resolve(command);

    if (handler) {
      return await handler.handle(command);
    }

    throw new HandlerForCommandNotFoundException(command);
  }

  public register(command: ICommand, handler: ICommandHandler): void {
    const commandName = Object(command).name as string;
    const handlerName = Object(handler).name as string;

    this._handlersToCommand[commandName] = handlerName;
  }

  private resolve(command: ICommand): ICommandHandler | undefined {
    const commandName = Object.getPrototypeOf(command).constructor
      .name as string;

    const handlerName = this._handlersToCommand[commandName];
    return container.get<ICommandHandler>(handlerName);
  }
}
