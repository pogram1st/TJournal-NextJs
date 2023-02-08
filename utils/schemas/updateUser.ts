import * as yup from 'yup';

export const updateUserSchema = yup
  .object()
  .shape(
    {
      fullName: yup.string().required('Вы не ввели имя и фамилию'),
      email: yup.string().email('Неверный формат почты').required('Вы не ввели почту'),
      password: yup
        .string()
        .nullable()
        .notRequired()
        .when('password', {
          is: (value) => value?.length,
          then: (rule) => rule.min(6),
        }),
      newPassword: yup
        .string()
        .nullable()
        .notRequired()
        .when('newPassword', {
          is: (value) => value?.length,
          then: (rule) => rule.min(6),
        }),
    },
    [
      ['password', 'password'],
      ['newPassword', 'newPassword'],
    ],
  )
  .required();
