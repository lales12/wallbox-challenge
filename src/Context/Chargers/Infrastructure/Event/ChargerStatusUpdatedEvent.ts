import { IDomainEvent, ISerializedEvent } from "@shared/Domain/Event/IDomainEvent";

import { Charger } from "../../Domain/Models/Charger";

export class ChargerStatusUpdatedEvent implements IDomainEvent {
  public static type: string = "wallbox.chager.status_updated";
  private readonly _charger: Charger;

  constructor(_charger: Charger) {
    this._charger = _charger;
  }

  serialize(): ISerializedEvent {
    return {
      type: ChargerStatusUpdatedEvent.type,
      data: this._charger.serializeData(),
      aggregate_id: this._charger.id,
      occurred_on: (new Date()).toISOString(),
    }
  }

}