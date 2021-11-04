import { IDomainEvent } from '../Event/IDomainEvent';

export class AggregateRoot {
    private _events: IDomainEvent[] = [];

    public releaseEvents(): IDomainEvent[] {
        const events = this._events;

        this.eraseEvents();

        return events;
    }

    public eraseEvents(): void {
        this._events = [];
    }

    protected record(event: IDomainEvent): void {
        this._events.push(event);
    }
}
