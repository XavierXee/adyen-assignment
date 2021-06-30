import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from './actions';
import {
  AllCurrencyPayload,
  AppState,
  RatesPayload,
  UpdateStatePayload,
  ValueCurrencyRates
} from "../models/models";
import {convertFromSource, convertFromTarget, setStartDate} from "../utils/mappers";

export const initialState: AppState = {
  currencies: [],
  end: '2021-06-29',
  source: {
    value: 1,
    currency: 'EUR'
  },
  targets: {
    sourceCurrency: 'EUR',
    items: [
      {
        value: 2,
        currency: 'USD',
        rates: [3]
      },
      {
        value: 3,
        currency: 'CAD',
        rates: [4]
      },
      {
        value: 3,
        currency: 'BTC',
        rates: [4]
      }
    ]
  }
};

function storeCurrencies(state: AppState, action: AllCurrencyPayload) {
  state = { ...state, currencies: action.currencies };
  return state;
}

function updateSource(state: AppState, action: AllCurrencyPayload) {
  state = { ...state, currencies: action.currencies };
  return state;
}

function updateTargetsRates(state: AppState, action: RatesPayload) {
  const targets = {
    ...state.targets,
    sourceCurrency: action.sourceCurrency,
    items: state.targets.items.map((target: ValueCurrencyRates) => {
      const item = action.items.find((item) => item.currency === target.currency);
      return {
        ...target,
        rates: item.rates
      };
    })
  }
  state = { ...state, targets: targets };
  return updateValues(state, { state: {
      end: state.end,
      source: state.source,
      targets: state.targets
    }});
}

function updateValues(state: AppState, action: UpdateStatePayload) {
  state = {
    ...state,
    ...{
      ...action.state,
      targets: {
        ...action.state.targets,
        items: action.state.targets.items.map((target: ValueCurrencyRates) => {
          return {
            ...target,
            value: convertFromSource(
              action.state.source.value,
              target.rates[target.rates.length - 1]
            ),
          }
        })
      }
    },
  }
  return state;
}

const currencyConverterReducer = createReducer(
  initialState,
  on(Actions.getAllCurrenciesSuccess, storeCurrencies),
  on(Actions.updateRatesSuccess, updateTargetsRates),
  on(Actions.updateValues, updateValues),
);

export function reducer(state: AppState | undefined, action: Action) {
  return currencyConverterReducer(state, action);
}
