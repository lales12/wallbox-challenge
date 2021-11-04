import { Command } from "@shared/Infrastructure/Bus/Command/Command"
import { commandHandlerDecorator } from "@shared/Infrastructure/Bus/Command/commandHandlerDecorator";
import { SetChargerStatusCommandHandler } from "./SetChargerStatusCommandHandler";


@commandHandlerDecorator(SetChargerStatusCommandHandler)
export class SetChargerStatusCommand extends Command {
  private _chargerId: string;
  private _chargerStatus: number;

  constructor(chargerId: string, chargerStatus: number) {
    super();
    this._chargerId = chargerId;
    this._chargerStatus = chargerStatus;
  }

  get chargerId(): string {
    return this._chargerId;
  }

  get chargerStatus(): number {
    return this._chargerStatus;
  }
}