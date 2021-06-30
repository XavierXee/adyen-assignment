import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from './actions';
import {
  AddTargetPayload,
  AllCurrencyPayload,
  AppState,
  RatesPayload, RemoveTargetPayload,
  UpdateStatePayload,
  ValueCurrencyRates
} from "../models/models";
import { convertFromSource } from "../utils/mappers";

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
        rates: []
      },
    ]
  }
};

function storeCurrencies(state: AppState, action: AllCurrencyPayload) {
  state = { ...state, currencies: action.currencies };
  return state;
}

function addTarget(state: AppState, action: AddTargetPayload) {
  const updatedTargets = {
    ...state.targets,
    items: [...state.targets.items]
  };
  updatedTargets.items.push({
    value: 0,
    rates: [],
    currency: action.currency,
  });
  state = { ...state, targets: updatedTargets };
  return state;
}

function removeTarget(state: AppState, action: RemoveTargetPayload) {
  const updatedTargets = {
    ...state.targets,
    items: [...state.targets.items]
  };
  updatedTargets.items.splice(action.index, 1);
  state = { ...state, targets: updatedTargets };
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
  on(Actions.addTarget, addTarget),
  on(Actions.removeTarget, removeTarget),
);

export function reducer(state: AppState | undefined, action: Action) {
  return currencyConverterReducer(state, action);
}
