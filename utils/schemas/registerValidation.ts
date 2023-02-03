import * as yup from 'yup';

export const RegisterFormSchema = yup
  .object()
  .shape({
    fullName: yup.string().required('Вы не ввели имя и фамилию'),
    email: yup.string().email('Неверный формат почты').required('Вы не ввели почту'),
    password: yup.string().min(6, 'Длина пароля минимум 6 символов').required('Вы не ввели пароль'),
  })
  .required();
