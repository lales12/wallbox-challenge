import { inject, injectable } from "inversify";

import { CommandHandler } from "@shared/Infrastructure/Bus/Command/CommandHandler";

import { ChargerId } from "@chargers/Domain/valueObject/ChargerId";
import { ChargerStatus } from "@chargers/Domain/valueObject/ChargerStatus";

import { ChargerStatusSetter } from "./ChargerStatusSetter";
import { SetChargerStatusCommand } from "./SetChargerStatusCommand";

@injectable()
export class SetChargerStatusCommandHandler extends CommandHandler {
  private readonly _chargerStatusSetter: ChargerStatusSetter;

  constructor(
    @inject("ChargerStatusSetter") chargerStatusSetter: ChargerStatusSetter
  ) {
    super();
    this._chargerStatusSetter = chargerStatusSetter;
  }

  public async handle(command: SetChargerStatusCommand): Promise<void> {
    const chargerId = new ChargerId(command.chargerId);
    const chargerStatus = new ChargerStatus(command.chargerStatus);

    await this._chargerStatusSetter.setChargerStatus(chargerId, chargerStatus);
  }
}
