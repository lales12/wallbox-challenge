
import { ICommand } from "./ICommand";
import { ICommandHandler } from "./ICommandHandler";

export interface ICommandBus {
  dispatch(command: ICommand): Promise<void>;
  register(
    command: ICommand,
    handler: ICommandHandler
  ): void;
}
