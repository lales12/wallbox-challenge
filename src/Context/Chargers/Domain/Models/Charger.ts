import { ChargerStatusUpdatedEvent } from "@chargers/Infrastructure/Event/ChargerStatusUpdatedEvent";
import { AggregateRoot } from "@shared/Domain/Entity/AggregateRoot";

export class Charger extends AggregateRoot {
  private _id: string;
  private _deviceId: string;
  private _status: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    deviceId: string,
    status: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super();
    this._id = id;
    this._deviceId = deviceId;
    this._status = status;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  get id(): string {
    return this._id;
  }

  get deviceId(): string {
    return this._deviceId;
  }

  get status(): number {
    return this._status;
  }

  set status(status: number) {
    this.record(new ChargerStatusUpdatedEvent(this));

    this._status = status;
  }

  public serializeData(): any {
    return {
      id: this._id,
      deviceId: this._deviceId,
      status: this._status,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString()
    };
  }

  public static create(id: string, deviceId: string, status: number): Charger {
    return new Charger(id, deviceId, status, new Date(), new Date());
  }

}
