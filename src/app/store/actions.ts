import { createAction , props} from '@ngrx/store';
import {
  AddTargetPayload,
  AllCurrencyPayload,
  ErrorPayload,
  RatesPayload, RemoveTargetPayload,
  UpdateStatePayload,
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

export const addTarget = createAction(
  '[Currency Converter] Add New Target',
  props<AddTargetPayload>()
);

export const removeTarget = createAction(
  '[Currency Converter] Remove Target',
  props<RemoveTargetPayload>()
);
