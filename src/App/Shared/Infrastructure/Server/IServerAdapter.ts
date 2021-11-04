export interface IServerAdapter {
    send(message: any): void;
    url: string;
}