import { ICommand } from "App/Shared/Infrastructure/Bus/Command/ICommand";

import { ICommandHandler } from "./ICommandHandler";

export class CommandHandler implements ICommandHandler {
  public async handle(command: ICommand): Promise<void> {
    throw new Error("CommandHandler.handle() must be implemented");
  }
}
