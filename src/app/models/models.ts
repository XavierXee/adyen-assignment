export interface AppState extends PartialState{
  currencies: Currency[];
}

export interface PartialState {
  end: string;
  source: ValueCurrency;
  targets: Targets;
}

export interface Currency {
  code: string;
  name: string;
}

export interface ValueCurrency {
  value: number;
  currency: string;
}

export interface ValueCurrencyRates extends ValueCurrency {
  rates: number[];
}

export interface Targets {
  sourceCurrency: string;
  items: ValueCurrencyRates[];
}

export interface AllCurrencyPayload {
  currencies: Currency[];
}

export interface RatesPayload {
  items: any[];
  sourceCurrency: string;
}

export interface UpdateStatePayload {
  state: PartialState;
}

export interface AddTargetPayload {
  currency: string;
}

export interface RemoveTargetPayload {
  index: number;
}

export interface ErrorPayload {
  message: any;
}
