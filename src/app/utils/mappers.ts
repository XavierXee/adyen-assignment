import {Targets, ValueCurrency, ValueCurrencyRates} from "../models/models";
import sub from 'date-fns/sub';
import format from 'date-fns/format';

export function setStartDate(endDate: string): string {
  return format(sub(new Date(endDate), {days: 30}), 'yyyy-MM-dd');
}

export function convertFromSource(sourceValue: number, rate: number): number {
  return sourceValue * rate;
}

export function convertFromTarget(targetValue: number, rate: number): number {
  return targetValue * (1 / rate);
}

export function mapSymbols(targets: Targets): any {
  return targets.items.map((targetItem: ValueCurrency) => targetItem.currency).join(',');
}

export function mapRatesToTargets(data: any): any {
  return {
    sourceCurrency: data.base,
    items: Object
      .keys(Object.values(data.rates)[0] as {})
      .sort((dateA: string, dateB: string) => {
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      })
      .map((currency: string) => {
        return {
          currency: currency,
          rates: Object.values(data.rates).map((rate: any) => rate[currency])
        }
      })
  }
}

export function normalizeData(data: ValueCurrencyRates): any {
  const min = Math.min.apply(null, data.rates);
  const max = Math.max.apply(null, data.rates);
  return data.rates.map((rate: number, index: number) => {
    return {
      name: `${data.currency}-${index}`,
      value: Math.round((((rate - min) / (max - min)) + 1) * 100) / 100
    }
  });
}
