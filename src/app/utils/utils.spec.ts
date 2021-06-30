import {
  convertFromSource,
  convertFromTarget,
  mapRatesToTargets,
  mapSymbols, normalizeData,
  setStartDate
} from "./utils";
import {
  mockMappedRates,
  mockRates,
  mockDataRates,
  mockTargets, normalizedDataRates
} from "../../testing/mocks";

describe('Utils', () => {

  it('should retrieve a string date that is 30 days before', () => {
    expect(setStartDate('2021-05-31')).toEqual('2021-05-01');
  });

  it('should multiply a value by a rate', () => {
    expect(convertFromSource(2, 4)).toEqual(8);
  });

  it('should multiply a value by a rate invert', () => {
    expect(convertFromTarget(2, 4)).toEqual(0.5);
  });

  it('should retrieve a concatenated string separated by comma', () => {
    expect(mapSymbols(mockTargets)).toEqual('USD,CAD');
  });

  it('should map rates to targets', () => {
    expect(mapRatesToTargets(mockRates)).toEqual(mockMappedRates);
  });

  it('should normalize a set of data from 1 to 2', () => {
    expect(normalizeData(mockDataRates)).toEqual(normalizedDataRates);
  });
});
