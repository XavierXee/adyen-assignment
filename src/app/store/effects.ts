import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import {
  map,
  mergeMap,
  catchError,
  withLatestFrom,
  concatMap
} from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '../services/api.service';
import {
  getAllCurrencies,
  getAllCurrenciesSuccess,
  getAllCurrenciesFailed,
  updateRates,
  updateRatesSuccess,
  updateRatesFailed,
} from './actions';
import { Selectors } from "./selectors";
import { mapRatesToTargets, mapSymbols, setStartDate } from "../utils/utils";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class Effects {

  getAllCurrencies = createEffect(() => this.actions$.pipe(
    ofType(getAllCurrencies),
    mergeMap(() => this.API.getAllCurrencies()
      .pipe(
        map(({ data }: any) => {
          const currencies = Object.keys(data).map((currencyKey: string) => {
            return {
              code: currencyKey,
              name: data[currencyKey]
            }
          });
          return getAllCurrenciesSuccess({ currencies })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          return of(getAllCurrenciesFailed({
            message: 'Error fetching currencies',
            error: errorResponse
          }));
        })
      ))
    )
  );

  getRates = createEffect(() => this.actions$.pipe(
    ofType(updateRates),
    concatMap((action: any) => of(action).pipe(withLatestFrom(this.selectors.state$))),
    mergeMap(([action, state]: [any, any]) => {
      return this.API.getRates(
        setStartDate(state.end),
        state.end,
        state.source.currency,
        mapSymbols(state.targets)
      ).pipe(
        map(({ data }: any) => {
          return updateRatesSuccess(mapRatesToTargets(data));
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(updateRatesFailed({
            message: 'Error fetching rates',
            error: errorResponse
          }));
        })
      )
    })
    )
  );

  constructor(
    private actions$: Actions,
    private API: ApiService,
    private selectors: Selectors
  ) {}
}
