import { injectable } from "inversify";
import path from "path";
import fs from "fs";

import { Charger } from "../../Domain/Models/Charger";

import { IChargerRepository } from "./IChargerRepository";

@injectable()
export class FileChargerRepository implements IChargerRepository {
  public async getChargers(): Promise<Charger[]> {
    return this._getFileData();
  }

  public async getCharger(id: string): Promise<Charger | undefined> {
    const chargers = await this._getFileData();

    return chargers.find((charger) => charger.id === id);
  }

  public async updateCharger(charger: Charger): Promise<Charger> {
    const chargers = await this._getFileData();

    const updatedChargers = chargers.map((c: Charger) =>
      c.id === charger.id ? charger : c
    );

    await this._saveFileData(updatedChargers);

    return charger;
  }

  private async _getFileData(): Promise<Charger[]> {
    return new Promise((resolve, reject) => {
      try {
        const chargerFilePath = path.join(
          __dirname,
          "../../../../data/chargers.json"
        );

        fs.readFile(chargerFilePath, "utf8", (err, data) => {
          if (err) {
            throw err;
          }

          resolve(
            JSON.parse(data).map(
              (jsonCharger: Charger) =>
                new Charger(
                  jsonCharger.id,
                  jsonCharger.deviceId,
                  jsonCharger.status
                )
            )
          );
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  private async _saveFileData(chargers: Charger[]): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const chargerFilePath = path.join(
          __dirname,
          "../../../../data/chargers.json"
        );

        const jsonChargers = chargers.map((charger) => charger.serializeData());

        fs.writeFile(chargerFilePath, JSON.stringify(jsonChargers), (err) => {
          if (err) {
            throw err;
          }
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
