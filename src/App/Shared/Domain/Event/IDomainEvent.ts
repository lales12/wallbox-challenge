export interface ISerializedEvent {
    type: string;
    aggregate_id: string;
    data?: object;
    occurred_on: string
}

export interface IDomainEvent {
    serialize(): ISerializedEvent;
}
