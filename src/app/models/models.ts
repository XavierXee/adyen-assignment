export interface Currency {
  code: string;
  name: string;
}

export interface ValueCurrency {
  value: number;
  currency: string;
}

export interface ValueCurrencyRates {
  value: number;
  currency: string;
  rates: number[];
}

export interface Targets {
  sourceCurrency: string;
  items: ValueCurrencyRates[];
}

export interface AppState {
  currencies: Currency[];
  end: string;
  source: ValueCurrency;
  targets: Targets;
}

export interface AllCurrencyPayload {
  currencies: Currency[];
}

export interface RatesPayload {
  items: any[];
  sourceCurrency: string;
}

export interface SourcePayload {
  source: ValueCurrency;
}

export interface TargetPayload {
  target: ValueCurrency;
  index: number;
}

export interface PartialState {
  end: string;
  source: ValueCurrency;
  targets: Targets;
}

export interface UpdateStatePayload {
  state: PartialState;
}

export interface ErrorPayload {
  message: any;
}
