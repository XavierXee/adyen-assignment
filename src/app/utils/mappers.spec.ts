import {
  convertFromSource,
  convertFromTarget,
  mapRatesToTargets,
  mapSymbols,
  setStartDate
} from "./mappers";

fdescribe('Mappers', () => {
  const mockTarget = {};

  const mockSource = {};

  it('should retrieve a string date that is 30 days before', () => {
    expect(setStartDate('2021-05-31')).toEqual('2021-05-01');
  });

  it('should multiply a value by a rate', () => {
    expect(convertFromSource(2, 4)).toEqual(8);
  });

  it('should multiply a value by a rate invert', () => {
    expect(convertFromTarget(2, 4)).toEqual(0.5);
  });

  xit('should retrieve a concatenated string separated by comma', () => {
    // expect(mapSymbols('2021-05-31')).toEqual('2021-05-01');
  });

  xit('should convert a value from a rate', () => {
    // expect(mapRatesToTargets('2021-05-31')).toEqual('2021-05-01');
  });
});
