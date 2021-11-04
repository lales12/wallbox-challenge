import { IDomainEvent } from "@shared/Domain/Event/IDomainEvent";
import { injectable } from "inversify";
import { EventPublisher } from "./EventPublisher";

@injectable()
export class EventBus {
  public async publish(event: IDomainEvent[]): Promise<void> {
    await EventPublisher.getInstance().publish(event);
  }
}