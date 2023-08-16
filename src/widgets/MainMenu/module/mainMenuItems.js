export const lcMenuItems = [
  {
    title: 'Статистика',
    icon: 'bar_chart',
    dropdown: false,
    link: '/',
  },
  {
    title: 'Объекты',
    icon: 'directions_car',
    dropdown: false,
    link: 'objects',
  },
  {
    title: 'Заявки на ТО',
    icon: 'construction',
    dropdown: false,
    link: 'reqsTO',
  },
  {
    title: 'Заявки на ТП',
    icon: 'headset_mic',
    dropdown: false,
    link: 'reqsTP',
  },
  {
    title: 'Финансы',
    icon: 'calculate',
    dropdown: false,
    link: 'finances',
  },
  {
    title: 'Диспетчеризация',
    icon: 'support_agent',
    dropdown: false,
    link: 'client_dispatch',
  },
  {
    title: 'ЛК Менеджера',
    icon: 'person',
    dropdown: false,
    link: 'lc_manager',
  },
  {
    title: 'HR Модуль',
    icon: 'groups',
    dropdown: false,
    link: 'hr_module',
  },
  {
    title: 'Зарплата',
    icon: 'payments',
    dropdown: true,
    dropdownList: [
      {
        title: 'Таблица Зарплат',
        link: 'salary_table',
      },
      {
        title: 'Персонал',
        link: 'salary_pers',
      },
      {
        title: 'Список Начислений',
        link: 'salary_accrual_list',
      },
      {
        title: 'Согласование',
        link: 'salary_agreement',
      },
    ],
  },
  {
    title: 'ЛК Тех. Поддержки',
    icon: 'manage_accounts',
    dropdown: true,
    dropdownList: [
      {
        title: 'Диспетчеризация',
        link: 'support_dispatch',
      },
      {
        title: 'Пользователи',
        link: 'support_users',
      },
      {
        title: 'Компании',
        link: 'support_comp',
      },
      {
        title: 'Уведомления',
        link: 'support_notify',
      },
    ],
  },
  {
    title: 'Доп. Отчеты',
    icon: 'table_chart',
    dropdown: false,
    link: 'custom_reports',
  },
  {
    title: 'Путевые Листы',
    icon: 'fact_check',
    link: 'travels',
    dropdown: true,
    dropdownList: [
      {
        title: 'Таблица путевых',
        link: 'travels',
      },
      {
        title: 'Статистика',
        link: 'travels_stats',
      },
    ],
  },
  {
    title: 'Транзакции',
    icon: 'local_gas_station',
    link: 'fuel_trans',
    dropdown: true,
    dropdownList: [
      {
        title: 'Таблица транзакций',
        link: 'transactions',
      },
      {
        title: 'Статистика',
        link: 'transactions_stats',
      },
    ],
  },
  {
    title: 'Диагностика',
    icon: 'car_crash',
    dropdown: false,
    link: 'diagnostics',
  },
  {
    title: 'Сливы топлива',
    icon: 'mdi-fuel',
    dropdown: false,
    link: 'fuel_downs',
  },
];
