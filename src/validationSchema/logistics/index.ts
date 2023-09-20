import * as yup from 'yup';

export const logisticsValidationSchema = yup.object().shape({
  delivery_date: yup.date().required(),
  return_date: yup.date().required(),
  delivery_address: yup.string().required(),
  return_address: yup.string().required(),
  rental_id: yup.string().nullable().required(),
});
