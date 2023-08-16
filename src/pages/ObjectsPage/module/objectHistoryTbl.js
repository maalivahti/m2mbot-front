const objectHistoryTbl = {
  head: [
    {
      name: 'objectName',
      required: true,
      label: 'Название ТС',
      align: 'left',
      field: 'name',
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: 'date', align: 'center', label: 'Дата', field: 'date', sortable: true,
    },
    {
      name: 'user', align: 'center', label: 'Пользователь', field: 'user', sortable: true,
    },
    {
      name: 'event', align: 'left', label: 'Событие', field: 'event', sortable: true,
    },
  ],
  body: [
    {
      name: '1. Камаз В806ХТ (Новолотский А)',
      date: '20.03.2023',
      user: 'saraninm2m',
      event: 'Деактивация (На год)',
    },
    {
      name: '1. Камаз В806ХТ (Новолотский А)',
      date: '20.03.2023',
      user: 'saraninm2m',
      event: 'Активация',
    },
    {
      name: '1. Камаз В806ХТ (Новолотский А)',
      date: '20.03.2023',
      user: 'saraninm2m',
      event: 'Деактивация (На год)',
    },
    {
      name: '1. Камаз В806ХТ (Новолотский А)',
      date: '20.03.2023',
      user: 'saraninm2m',
      event: 'Активация',
    },
  ],
};

export default { objectHistoryTbl };
