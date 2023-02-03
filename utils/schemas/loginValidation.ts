import * as yup from 'yup';

export const LoginFormSchema = yup
  .object()
  .shape({
    email: yup.string().email('Неверный формат почты').required('Вы не ввели почту'),
    password: yup.string().min(6, 'Длина пароля минимум 6 символов').required('Вы не ввели пароль'),
  })
  .required();
