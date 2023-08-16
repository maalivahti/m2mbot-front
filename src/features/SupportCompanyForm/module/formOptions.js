const accessOptions = [
  { value: 'n', label: 'Нет' },
  { value: 'free', label: 'Бесплатно' },
  { value: 'test', label: 'Тест' },
  { value: 'pay', label: 'Платно' },
];

const fuelTransVendorList = [
  { value: 'gazprom', label: 'Газпром' },
  { value: 'rosneft', label: 'Роснефть' },
  { value: 'knp', label: 'КНП' },
  { value: 'ppr', label: 'ППР' },
  { value: 'autocard', label: 'АВТОКАРД' },
  { value: 'mc', label: 'MastersCard' },
];

const downloadPeriod = [
  { value: '3h', label: 'Раз в 3 часа' },
  { value: '6h', label: 'Раз в 6 часов' },
  { value: '12h', label: 'Раз в 12 часов' },
  { value: '24h', label: 'Раз в 24 часа' },
];

const regionOptions = [
  { value: '7200', label: 'Калининград (+2)' },
  { value: '10800', label: 'Москва (+3)' },
  { value: '14400', label: 'Астрахань (+4)' },
  { value: '18000', label: 'Пермь (+5)' },
  { value: '21600', label: 'Омск (+6)' },
  { value: '25200', label: 'Красноярск (+7)' },
  { value: '28800', label: 'Иркутск (+8)' },
  { value: '32400', label: 'Якутск (+9)' },
  { value: '36000', label: 'Владивосток (+10)' },
];

export default {
  accessOptions,
  fuelTransVendorList,
  downloadPeriod,
  regionOptions,
};
