export const mockCurrencies = ['EUR', 'USD', 'CAD'];

export const mockRates = {
  base: 'EUR',
  rates: {
    '2021-06-30': {
      'EUR': 1.2, 'USD': 2.4, 'CAD': 3.6
    },
    '2021-06-29': {
      'EUR': 2.2, 'USD': 3.4, 'CAD': 4.6
    }
  }
};

export const mockMappedRates = {
  items: [
    {
      currency: 'EUR',
      rates: [1.2, 2.2]
    },
    {
      currency: 'USD',
      rates: [2.4, 3.4]
    },
    {
      currency: 'CAD',
      rates: [3.6, 4.6]
    },
  ],
  sourceCurrency: 'EUR'
};

export const mockSource = {
  value: 1,
  currency: 'EUR'
};

export const mockTargets = {
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

export const mockDataRates = {
  currency: 'EUR',
  value: 0,
  rates:[0.2, 1.4, 2.6]
};

export const normalizedDataRates = [
  {
    name: 'EUR-0',
    value: 1
  },
  {
    name: 'EUR-1',
    value: 1.5
  },
  {
    name: 'EUR-2',
    value: 2
  },
];
