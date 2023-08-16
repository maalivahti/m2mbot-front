export default function checkModuleStatus(status) {
  let iconUrl = 'img:icons/pay_in_check_icon.svg';
  let statusDescr = 'Доступ к модулю оплачен';

  if (status === 'n') {
    iconUrl = 'img:icons/red_cross_in_circle_icon.svg';
    statusDescr = 'Нет доступа к модулю';
  }
  if (status === 'free') {
    iconUrl = 'img:icons/pay_in_cross_icon.svg';
    statusDescr = 'Бесплатный доступ к модулю';
  }
  if (status === 'test') {
    iconUrl = 'img:icons/test_icon.svg';
    statusDescr = 'Модуль доступен в тестовом режиме';
  }

  return { iconUrl, statusDescr };
}
