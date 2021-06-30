import { Component, OnInit } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import {
  updateValues,
  getAllCurrencies,
  updateRates,
  removeTarget
} from "./store/actions";
import { Selectors } from "./store/selectors";
import { Observable } from "rxjs";
import { Currency, Targets, ValueCurrency, ValueCurrencyRates } from "./models/models";
import { convertFromTarget } from "./utils/utils";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { initialState } from "./store/reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  get currencies(): Observable<Currency[]> {
    return this.selectors.selectAllCurrencies$;
  }

  get source$(): Observable<ValueCurrency> {
    return this.selectors.selectSource$;
  }

  get target$(): Observable<Targets> {
    return this.selectors.selectTargets$;
  }

  title = 'Currency Converter';
  faTrashAlt = faTrashAlt;
  source = initialState.source;
  targets = initialState.targets;
  end = initialState.end;

  constructor(
    private store: Store,
    private actionSubject: ActionsSubject,
    private selectors: Selectors
  ) {}

  ngOnInit() {
    this.initSubscriptions();
    this.store.dispatch(getAllCurrencies());
    this.store.dispatch(updateRates());
  }

  updateEndDate(value: string) {
    this.end = value;
    this.updateState(true);
  }

  updateSourceValue(target: any): void {
    this.source.value = convertFromTarget(
      target.value,
      target.rates[target.rates.length - 1]
    )
    this.updateState(false);
  }

  removeTarget(index: number): void {
    this.store.dispatch(removeTarget({ index }));
    this.updateState(false);
  }

  updateState(reloadRates?: boolean): void {
    this.store.dispatch(updateValues({
      state: {
        end: this.end,
        source: this.source,
        targets: this.targets
      },
    }));
    if (reloadRates) {
      this.store.dispatch(updateRates());
    }
  }

  private initSubscriptions(): void {
    this.source$.subscribe((source: any) => {
      this.source = { ...source };
    });

    this.target$.subscribe((targets: Targets) => {
      this.targets = { ...targets, items: targets.items
          .map((item: ValueCurrencyRates) => {
            return { ... item };
          })
      };
    });
  }
}
