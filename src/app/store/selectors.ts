import { createSelector, Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { distinctUntilChanged } from "rxjs/operators";
import {AppState, Currency, ErrorPayload, Targets, ValueCurrency} from "../models/models";

export const selectState = (state: any) => state.appState;

export const selectError = createSelector(
  selectState,
  (state: AppState) => {
    return state.error;
  }
);

export const selectCurrencies = createSelector(
  selectState,
  (state: AppState) => {
    return state.currencies;
  }
);

export const selectSource = createSelector(
  selectState,
  (state: AppState) => {
    return state.source;
  }
);

export const selectTargets = createSelector(
  selectState,
  (state: AppState) => {
    return state.targets;
  }
);

@Injectable()
export class Selectors {
  get selectAllCurrencies$(): Observable<Currency[]> {
    return this.store.select(selectCurrencies);
  }

  get selectSource$(): Observable<ValueCurrency> {
    return this.store.select(selectSource).pipe(distinctUntilChanged());
  }

  get selectTargets$(): Observable<Targets> {
    return this.store.select(selectTargets);
  }

  get state$(): Observable<AppState> {
    return this.store.select(selectState);
  }

  get selectError$(): Observable<ErrorPayload | null | undefined> {
    return this.store.select(selectError);
  }

  constructor(
    private store: Store<AppState>
  ) {}
}
