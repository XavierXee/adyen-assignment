import {
  convertFromSource,
  convertFromTarget,
  mapRatesToTargets,
  mapSymbols,
  setStartDate
} from "./utils";

describe('Utils', () => {
  const mockSource = {
    value: 1,
      currency: 'EUR'
  };

  const mockTargets = {
    sourceCurrency: 'EUR',
    items: [
      {
        value: 2,
        currency: 'USD',
        rates: [1.5]
      },
      {
        value: 4,
        currency: 'CAD',
        rates: [4.5]
      },
    ]
  };

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

  it('should convert a value from a rate', () => {
    // expect(mapRatesToTargets('2021-05-31')).toEqual('2021-05-01');
  });
});
