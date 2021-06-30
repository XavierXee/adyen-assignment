import { createAction , props} from '@ngrx/store';
import {
  AllCurrencyPayload, AppState,
  Currency,
  ErrorPayload,
  RatesPayload,
  SourcePayload,
  TargetPayload, UpdateStatePayload,
  ValueCurrency
} from '../models/models';

export const getAllCurrencies = createAction(
  '[Currency Converter] Get All Currencies'
);

export const getAllCurrenciesSuccess = createAction(
  '[Currency Converter] Get All Currencies Success',
  props<AllCurrencyPayload>()
);

export const getAllCurrenciesFailed = createAction('[Currency Converter] Error',
  props<ErrorPayload>()
);

export const updateRates = createAction(
  '[Currency Converter] Update Rates'
);

export const updateRatesSuccess = createAction(
  '[Currency Converter] Update Rates Success',
  props<RatesPayload>()
);

export const updateRatesFailed = createAction(
  '[Currency Converter] Update Rates Success',
  props<RatesPayload>()
);

export const updateValues = createAction(
  '[Currency Converter] Update Source and Targets values',
  props<UpdateStatePayload>()
);

export const updateSource = createAction(
  '[Currency Converter] Update Source from Target Value',
  props<UpdateStatePayload>()
);
