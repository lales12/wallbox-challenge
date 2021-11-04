import { inject, injectable } from "inversify";

import { ChargerId } from "@chargers/Domain/valueObject/ChargerId";
import { ChargerStatus } from "@chargers/Domain/valueObject/ChargerStatus";
import { IChargerRepository } from "@chargers/Infrastructure/Repository/IChargerRepository";
import { EventBus } from "@shared/Infrastructure/Event/EventBus";

@injectable()
export class ChargerStatusSetter {
  private _chargerRepository: IChargerRepository;
  private _eventBus: EventBus;

  constructor(
    @inject("ChargerRepository") chargerRepository: IChargerRepository,
    @inject("EventBus") eventBus: EventBus
  ) {
    this._chargerRepository = chargerRepository;
    this._eventBus = eventBus;
  }

  public async setChargerStatus(
    chargerId: ChargerId,
    status: ChargerStatus
  ): Promise<void> {

    const charger = await this._chargerRepository.getCharger(chargerId.value);

    if (charger) {
      charger.status = status.value;

      await this._chargerRepository.updateCharger(charger);

      this._eventBus.publish(charger.releaseEvents());
    }

  }
}

export type ChargerStatusSetterType = ChargerStatusSetter;
