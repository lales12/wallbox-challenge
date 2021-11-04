import { IController } from "@shared/Infrastructure/Controller/IController";
import { SetChargerStatusCommand } from "@chargers/Application/SetChargerStatusCommand";

import { Controller } from "App/Shared/Infrastructure/Controller/Controller";
import { IServerAdapter } from "@shared/Infrastructure/Server/IServerAdapter";

export class SetChargerStatusController extends Controller implements IController {

  public run (adapter: IServerAdapter, data: any)  {
    const urlParams = this.getUrlParams(adapter.url);

    if (urlParams.length) {  
      const id = urlParams[0];
      const status = data.soc;

      this.dispatch(new SetChargerStatusCommand(id, status));
    }
  }
}