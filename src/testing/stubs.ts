import { of } from "rxjs";
import { mockCurrencies, mockSource, mockTargets } from "./mocks";
import {getAllCurrencies} from "../app/store/actions";

export const selectorsStub = {
  selectAllCurrencies$: of(mockCurrencies),
  selectSource$: of(mockSource),
  selectTargets$: of(mockTargets),
  state$: of({
    source: mockSource,
    targets: mockTargets,
    end: "2021-06-30",
    currencies: mockCurrencies
  })
};
