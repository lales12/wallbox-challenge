import { IDomainEvent } from "@shared/Domain/Event/IDomainEvent";

export class EventPublisher {
  private static _instance: EventPublisher;
  private subscribers: { [key: string]: Array<(event: any) => void> } =
    {};

  public static getInstance(): EventPublisher {
    this._instance = this._instance || new EventPublisher();

    return this._instance;
  }

  public subscribe(eventName: string, callback: (event: any) => void): void {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }

    this.subscribers[eventName].push(callback);
  }

  public unsubscribe(eventName: string, callback: (event: any) => void): void {
    if (!this.subscribers[eventName]) {
      return;
    }

    this.subscribers[eventName] = this.subscribers[eventName].filter(
      (subscriber) => subscriber !== callback
    );
  }



  public publish(events: IDomainEvent[]): void {
    events.forEach((event) => {
      const eventData = event.serialize();

      const subscribersType = this.subscribers[eventData.type] || [];
      const subscribers = subscribersType.concat(this.subscribers["*"] || []);

      if (!subscribers.length) {
        return;
      }

      subscribers.forEach((callback) => callback(eventData));
    });
  }
}
