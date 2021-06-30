import { Component, OnInit } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import {
  updateValues,
  getAllCurrencies,
  updateRates
} from "./store/actions";
import { Selectors } from "./store/selectors";
import { Observable } from "rxjs";
import { Currency, Targets, ValueCurrency, ValueCurrencyRates } from "./models/models";
import format from 'date-fns/format';
import {convertFromTarget} from "./utils/mappers";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  get dateMax(): string {
    return format(new Date(), 'yyyy-MM-dd');
  }

  get currencies(): Observable<Currency[]> {
    return this.selectors.selectAllCurrencies$;
  }

  get source$(): Observable<ValueCurrency> {
    return this.selectors.selectSource$;
  }

  get target$(): Observable<Targets> {
    return this.selectors.selectTargets$;
  }

  faTrashAlt = faTrashAlt;

  title = 'adyen-assignment';
  source = {
    value: 1,
    currency: 'CAD'
  };
  targets = {
    sourceCurrency: 'EUR',
    items: [
      { value: 2, currency: 'USD', rates: [2]}
    ]
  };
  end = '2021-06-29';

  ngOnInit() {
    this.store.dispatch(getAllCurrencies());
    this.store.dispatch(updateRates());

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

  updateSourceValue(target: any): void {
    this.source.value = convertFromTarget(
      target.value,
      target.rates[target.rates.length - 1]
    )
    this.update(false);
  }

  format($event: Event): void {

  }

  addTarget($event: Event): void {

  }

  update(reloadRates?: boolean): void {
    console.log(this.source.value);
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

  constructor(
    private store: Store,
    private actionSubject: ActionsSubject,
    private selectors: Selectors
  ) {
  }
}
