import "reflect-metadata";

import { ChargerStatusSetter } from "@chargers/Application/ChargerStatusSetter";


describe('ChargerStatusSetter', () => {
  it('Instantiated', () => {
    expect(new ChargerStatusSetter()).toBeInstanceOf(ChargerStatusSetter);
  })
})