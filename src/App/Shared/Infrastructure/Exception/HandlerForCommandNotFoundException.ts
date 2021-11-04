import { ICommand } from '../Bus/Command/ICommand';

export class HandlerForCommandNotFoundException extends Error {
    constructor(command: ICommand) {
        super(`Handler for command ${command.constructor.name} does not exist`);
    }
}
