import { Component, Output, EventEmitter } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from "rxjs";
import { Currency } from "../../models/models";
import { Selectors } from "../../store/selectors";
import { Store } from "@ngrx/store";
import { addTarget } from "../../store/actions";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent {
  get currencies(): Observable<Currency[]> {
    return this.selectors.selectAllCurrencies$;
  }

  @Output() update = new EventEmitter<null>();

  faPlus = faPlus;
  form = new FormControl();

  constructor(
    private store: Store,
    private selectors: Selectors
  ) { }

  addTarget(): void {
    this.store.dispatch(addTarget({currency: this.form.value}));
    this.form.setValue('');
    this.update.emit();
  }
}
