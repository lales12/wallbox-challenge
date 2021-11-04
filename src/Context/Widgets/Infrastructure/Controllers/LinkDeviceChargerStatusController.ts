import { IController } from "@shared/Infrastructure/Controller/IController";
import { IServerAdapter } from "@shared/Infrastructure/Server/IServerAdapter";

import { Controller } from "App/Shared/Infrastructure/Controller/Controller";

enum ChargerStatus {
  Charging = "charging",
  Charging80 = "charging80",
  Charged = "charged",
}

export class LinkDeviceChargerStatusController
  extends Controller
  implements IController
{
  public run(adapter: IServerAdapter, data: any) {
    const urlParams = this.getUrlParams(adapter.url);

    if (urlParams.length) {
      const device = urlParams[0];

      this.subscribeEvent(this.event, (event) => {
        if (event.data.deviceId === device) {
          adapter.send({
            event: "chargingStatus",
            data: {
              status: this._getChargerStatus(event.data.status),
            },
          });
        }
      });
    }
  }

  private _getChargerStatus(status: number): ChargerStatus {
    if (status === 100) {
      return ChargerStatus.Charged;
    }

    if (status >= 80) {
      return ChargerStatus.Charging80;
    }

    return ChargerStatus.Charging;
  }
}
