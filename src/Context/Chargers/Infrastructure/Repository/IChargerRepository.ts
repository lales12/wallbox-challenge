import { Charger } from "../../Domain/Models/Charger";

export interface IChargerRepository {
  getChargers(): Promise<Charger[]>;
  getCharger(id: string): Promise<Charger|undefined>;
  updateCharger(charger: Charger): Promise<Charger>;
}