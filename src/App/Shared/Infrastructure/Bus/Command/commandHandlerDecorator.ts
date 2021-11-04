import { CommandBus } from "./CommandBus";

export const commandHandlerDecorator = (commandHandler: any): ClassDecorator => {
  return (command: any) => {
    CommandBus.getInstance().register(command, commandHandler);
  };
};