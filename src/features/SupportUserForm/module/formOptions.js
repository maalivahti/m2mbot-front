const modulesCheckList = [
  { field: 'lk', label: 'Доступ к ЛК клиента:' },
  { field: 'lk_manager', label: 'Доступ к ЛК менеджера:' },
  { field: 'lk_techsup', label: 'Доступ к ЛК техпода:' },
  { field: 'lk_hr', label: 'Доступ к ЛК HR:' },
  { field: 'travels', label: 'Доступ к путевым:' },
  { field: 'transacts', label: 'Доступ к транзакциям:' },
  { field: 'diagn', label: 'Доступ к диагностике:' },
  { field: 'fdowns', label: 'Доступ к сливам:' },
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

const servicesCheckList = [
  { field: 'send_gay_info', label: 'Отправлять инфо по объектам экспорта:' },
  { field: 'send_supervisor_income', label: 'Отправлять инфо о платежах руководителю:' },
  { field: 'send_notif_close_req_tp', label: 'Отправлять уведомления по закрытию заявки ТП:' },
];

const roleOptions = [
  { value: 'client', label: 'Клиент' },
  { value: 'client_h', label: 'Управляющий клиента' },
  { value: 'dealer', label: 'Дилер' },
  { value: 'manager', label: 'Менеджер' },
  { value: 'supervisor', label: 'Руководитель М2М' },
  { value: 'techsup', label: 'Техпод' },
  { value: 'dev', label: 'Разработчик' },
  { value: 'hr', label: 'HR' },
];

const mainTabsItems = [
  { name: 'general', label: 'Основные' },
  { name: 'modules', label: 'Модули' },
  { name: 'accesses', label: 'Доступы' },
  { name: 'services', label: 'Сервисные' },
];

const accessTabsItems = [
  { name: 'company', label: 'Компании' },
  { name: 'accounts', label: 'Учетные записи' },
  { name: 'reports', label: 'Доп. отчеты' },
];

export default {
  modulesCheckList,
  regionOptions,
  servicesCheckList,
  roleOptions,
  mainTabsItems,
  accessTabsItems,
};
