import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements OnInit {

  @Input() name: string = '';
  @Input() value: number = 1;
  @Output() onChange = new EventEmitter<number>();

  format($event: Event): void {

  }

  onModelUpdate($event: Event): void {
    console.log(this.value);
    this.onChange.emit(this.value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
