import "reflect-metadata";

import { WebSocketServer } from "@shared/Infrastructure/Server/WebSocketServer";
import { SetChargerStatusController } from "@chargers/Infrastructure/Controllers/SetChargerStatusContoller";
import { LinkDeviceChargerStatusController } from "@widgets/Infrastructure/Controllers/LinkDeviceChargerStatusController";
import { ChargerStatusUpdatedEvent } from "@chargers/Infrastructure/Event/ChargerStatusUpdatedEvent";
import { EventPublisher } from "@shared/Infrastructure/Event/EventPublisher";


const server = new WebSocketServer([3100, 3200], EventPublisher.getInstance());

server.registerController(
  new SetChargerStatusController("StateOfCharge", /\/chargers\/(.*)\/?$/)
);

server.registerEventController(
  new LinkDeviceChargerStatusController(ChargerStatusUpdatedEvent.type, /\/widgets\/(.*)\/?$/)
)
server.start();
