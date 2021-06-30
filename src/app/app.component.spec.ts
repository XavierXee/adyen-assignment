import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Selectors } from "./store/selectors";
import { selectorsStub } from "../testing/stubs";
import {
  ActionsSubject,
  ReducerManager,
  ReducerManagerDispatcher,
  StateObservable,
  Store,
  StoreModule
} from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import * as AppReducer from "./store/reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { Effects } from "./store/effects";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxChartsModule,
        FontAwesomeModule,
        StoreModule.forRoot({'appState': AppReducer.reducer}),
        StoreDevtoolsModule.instrument({
          name: 'Currency Converter',
          maxAge: 25,
          autoPause: true,
        }),
        EffectsModule.forRoot([Effects])
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        Store,
        StateObservable,
        ActionsSubject,
        ReducerManager,
        ReducerManagerDispatcher,
        { provide: Selectors, useValue: selectorsStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Currency Converter'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Currency Converter');
  });

  it('should dispatch getAllCurrencies action on Init', () => {
    const spy = spyOn(component['store'], 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith({ type: '[Currency Converter] Get All Currencies' });
  });

  it('should dispatch updateRates action on Init', () => {
    const spy = spyOn(component['store'], 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith({ type: '[Currency Converter] Update Rates' });
  });
});
