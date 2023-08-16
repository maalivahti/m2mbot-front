const typeObjectOptions = [
  { value: 'l', label: 'Легковой' },
  { value: 'gr', label: 'Грузовой' },
  { value: 'sp', label: 'Спецтехника' },
  { value: 'pr', label: 'Прицеп' },
  { value: 'not', label: 'Не задан' },
];

const categoryObjectOptions = [
  { value: 'm1', label: 'M1' },
  { value: 'm2', label: 'M2' },
  { value: 'm3', label: 'M3' },
  { value: 'n1', label: 'N1' },
  { value: 'n2', label: 'N2' },
  { value: 'n3', label: 'N3' },
  { value: 'o1', label: 'O1' },
  { value: 'o2', label: 'O2' },
  { value: 'o3', label: 'O3' },
  { value: 'o4', label: 'O4' },
  { value: 'not', label: 'Не задана' },
];

const fuelTypeOptions = [
  { value: 'petrol', label: 'Бензин' },
  { value: 'disel', label: 'Дизель' },
];

const consumObjectOptions = [
  { value: 'p', label: 'Пробег' },
  { value: 'mh', label: 'Моточасы' },
  { value: 'a', label: 'Пробег + Моточасы' },
  { value: 'ph', label: 'Пробег + Холостой ход' },
];

export default {
  typeObjectOptions,
  categoryObjectOptions,
  fuelTypeOptions,
  consumObjectOptions,
};
