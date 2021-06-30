import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ErrorPayload } from "../../models/models";
import { Selectors } from "../../store/selectors";
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  get error$(): Observable<ErrorPayload | null | undefined> {
    return this.selectors.selectError$;
  }

  faExclamationTriangle = faExclamationTriangle;

  constructor(
    private selectors: Selectors
  ) { }
}
