import { IServerAdapter } from "../Server/IServerAdapter";

export interface IController {
  event: string;
  checkUrl(url: string): boolean;
  run: (adapter: IServerAdapter, data: any) => void;
}