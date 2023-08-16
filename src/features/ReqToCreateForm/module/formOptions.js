const objToggleOptions = [
  { label: 'не на Wialon', value: 'objNotWialon' },
  { label: 'на Wialon', value: 'objIsWialon' },
];

const reqTypeOptions = [
  { label: 'Диагностика', value: 'diagn' },
  { label: 'Ремонт', value: 'repair' },
  { label: 'Монтаж', value: 'install' },
  { label: 'Осмотр', value: 'inspect' },
  { label: 'Демонтаж', value: 'unInstall' },
];

const reqPlaceOption = [
  { label: 'Выезд', value: 'depart' },
  { label: 'Бокс М2М', value: 'boxM2M' },
];

const m2mBoxAddress = [
  { label: 'Бокс Красноярск', value: 'boxKrsk' },
  { label: 'Бокс Канск', value: 'boxKnsk' },
  { label: 'Бокс Лесосибирск', value: 'boxLsbsk' },
  { label: 'Бокс Норильск', value: 'boxNrsk' },
  { label: 'Бокс Абакан', value: 'boxAbkn' },
  { label: 'Бокс Кызыл', value: 'boxKzl' },
];

export default {
  objToggleOptions,
  reqTypeOptions,
  reqPlaceOption,
  m2mBoxAddress,
};
