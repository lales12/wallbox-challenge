import { Container } from "inversify";

import { CommandBus } from "App/Shared/Infrastructure/Bus/Command/CommandBus";

import { ICommandBus } from "../Bus/Command/ICommandBus";
import { ICommandHandler } from "../Bus/Command/ICommandHandler";
import { IQueryBus } from "../Bus/Query/IQueryBus";
import { QueryBus } from "../Bus/Query/QueryBus";

import { SetChargerStatusCommandHandler } from "@chargers/Application/SetChargerStatusCommandHandler";
import { ChargerStatusSetter } from "@chargers/Application/ChargerStatusSetter";
import { IChargerRepository } from "@chargers/Infrastructure/Repository/IChargerRepository";
import { FileChargerRepository } from "@chargers/Infrastructure/Repository/FileChargerRepository";
import { EventBus } from "../Event/EventBus";

const container = new Container();

container.bind<EventBus>("EventBus").to(EventBus).inSingletonScope();

container.bind<IChargerRepository>("ChargerRepository").to(FileChargerRepository);

container.bind('ChargerStatusSetter').to(ChargerStatusSetter)
container
  .bind<ICommandHandler>("SetChargerStatusCommandHandler")
  .to(SetChargerStatusCommandHandler)

export default container;
