import * as yup from 'yup'

export const ADD_BOT_SCHEMA = yup.object({
  name: yup.string().required('Name is required').min(3, 'Minimum 3 characters').max(128, 'Maximum 128 characters'),
  isAutoPublished: yup.boolean().optional(),
  installLink: yup.string().transform(value => value === '' ? undefined : value).url('Invalid URL').optional().nullable(),
  headline: yup.string().min(50, 'Minimum 50 characters').max(510, 'Maximum 510 characters'),
  description: yup.string().optional(),
  prefix: yup.string().min(1, 'Minimum 1 characters').max(10, 'Maximum 10 characters'),
  featuredImage: yup.string().optional(),
  supportUrl: yup.string().transform(value => value === '' ? undefined : value).url('Invalid URL').optional().nullable(),  
  remark: yup.string().optional(),
  tagIds: yup.array().of(yup.string().required()).min(1, "At least one tag is required"),
})
