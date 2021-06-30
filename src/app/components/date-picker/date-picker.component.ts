import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import format from "date-fns/format";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  get dateMax(): string {
    return format(new Date(), 'yyyy-MM-dd');
  }

  @Input() value: string = '';
  @Output() update = new EventEmitter<string>();

  onChange(): void {
    this.update.emit(this.value);
  }
}
