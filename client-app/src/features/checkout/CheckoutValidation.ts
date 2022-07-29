import * as yup from 'yup';

export const validationSchema = yup.object({
    fullName: yup.string().required('Full name is required'),
    address1: yup.string().required('Address is required'),
    city: yup.string().required(),
    country: yup.string().required(),
    zip: yup.string().required(),
})