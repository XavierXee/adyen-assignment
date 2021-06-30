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
import {mapRatesToTargets, mapSymbols, setStartDate} from "../utils/utils";

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
        // catchError(() => {
        //   return getAllCurrenciesFailed({
        //     message: 'Error fetching currencies'
        //   })
        // })
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
        // catchError((err: any) => {
        //   console.log(err)
        //   return getAllCurrenciesSuccess([])
        // })
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
