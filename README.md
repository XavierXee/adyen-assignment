# AdyenAssignment

##Currency Converter

Here is my attempt at solving the currency converter exercise.
Thanks for your consideration and for taking time reviewing it.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.
State management is handled with NgRx
Cypress is used as the end-to-end framework
Karma for unit tests

##Quick Start

Run
`npm install`
then
`npm start`

##Quick Start

Run
`npm install`
then
`npm start`

##Features
* Select a source currency
* Select targets currencies
* Add target currency using bottom button
* Remove target currency (by clicking on the trash icon below a target currency row)
* Ability to select the date from which the rate is used to make the calculations
* Rate evolution chart (always takes the 30 previous days rates from the chosen reference data)
* Automatic recalculation on change from inputs or currency dropdown

##Improvements
Many improvements can still be made to this exercise:
* UI can be better
* Error handling can be more precise and not completely blocking
* Default source and target currencies could be detected by user/navigator data (e.g with reverse geolocoding)
* More complete e2e testing scenarios
* API call optimization (e.g amount of data retrieved per call could be lowered)
* Splitting app.component into smaller child components


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
