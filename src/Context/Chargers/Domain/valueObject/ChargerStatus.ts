export class ChargerStatus {
  private readonly _value: number;

  private static MIN_VALUE = 0;
  private static MAX_VALUE = 100;

  constructor(value: number) {
    this._value = value;
    this.validateValue();
  }

  get value(): number {
    return this._value;
  }

  private validateValue(): void {
    if (
      this._value < ChargerStatus.MIN_VALUE ||
      this._value > ChargerStatus.MAX_VALUE
    ) {
      throw new Error("Invalid charger status");
    }
  }
}
