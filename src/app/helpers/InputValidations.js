const validationPatterns = {
  // eslint-disable-next-line
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Не верный формат E-mail',
  notEmpty: (v) => !!v || 'Поле обязательно для заполнения',
  password: (v) => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v) || 'Пароль не соответствует требованиям',
  confirmPass: (v, pass) => v === pass || 'Пароли не совпадают',
};

export default { validationPatterns };
