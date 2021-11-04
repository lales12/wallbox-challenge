import "reflect-metadata";

import { ChargerStatusSetter } from "@chargers/Application/ChargerStatusSetter";
import { SetChargerStatusCommandHandler } from "@chargers/Application/SetChargerStatusCommandHandler";
import { SetChargerStatusCommand } from "@chargers/Application/SetChargerStatusCommand";

jest.mock("@chargers/application/ChargerStatusSetter");

describe("SetChargerStatusCommand", () => {
  let chargerStatusSetterMock: ChargerStatusSetter;
  let chargerId: string = "chargerId";
  let invalidChargerStatus = -40;
  let validChargerStatus = 20;

  beforeEach(() => {
    chargerStatusSetterMock = new ChargerStatusSetter();
  });

  it("Set new battery status correctly", async () => {
    const setChargerStatusCommandHandler = new SetChargerStatusCommandHandler(
      chargerStatusSetterMock
    );
    await setChargerStatusCommandHandler.handle(
      new SetChargerStatusCommand(chargerId, validChargerStatus)
    );
    expect(chargerStatusSetterMock.setChargerStatus).toHaveBeenCalled();
  });

  it("Throw error when invalid battery status is set", async () => {
    const setChargerStatusCommandHandler = new SetChargerStatusCommandHandler(
      chargerStatusSetterMock
    );
    
    try {
      await setChargerStatusCommandHandler.handle(
        new SetChargerStatusCommand(chargerId, invalidChargerStatus)
      )
    } catch (error: any) {
      expect(error.message).toBe("Invalid charger status");
    }
  });
});
