import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Effects } from './store/effects';
import * as AppReducer from './store/reducer';
import { Selectors } from "./store/selectors";
import { ChartComponent } from './components/chart/chart.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    FloatingButtonComponent,
    DatePickerComponent
  ],
  imports: [
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
  providers: [Effects, Selectors],
  bootstrap: [AppComponent]
})
export class AppModule { }
