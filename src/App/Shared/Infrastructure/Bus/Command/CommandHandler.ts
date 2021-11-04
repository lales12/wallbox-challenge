import { ICommand } from "@shared/Infrastructure/Bus/Command/ICommand";
import { injectable } from "inversify";

import { ICommandHandler } from "./ICommandHandler";

@injectable()
export class CommandHandler implements ICommandHandler {
  public async handle(command: ICommand): Promise<void> {
    throw new Error("CommandHandler.handle() must be implemented");
  }
}


