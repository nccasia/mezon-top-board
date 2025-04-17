import * as yup from 'yup'

export const ADD_BOT_SCHEMA = yup.object({
  name: yup.string().required('Name is required').min(3, 'Minimum 3 characters').max(128, 'Maximum 128 characters'),
  isAutoPublished: yup.boolean().optional(),
  installLink: yup
    .string()
    .required('Install Link is required')
    .url('Invalid URL')
    .test('url-length', 'URL is too long', (val) => val.length <= 2082),
  headline: yup
    .string()
    .required('Headline is required')
    .min(50, 'Minimum 50 characters')
    .max(510, 'Maximum 510 characters'),
  description: yup.string().required('Full Description is required'),
  prefix: yup.string().required('Prefix is required').min(1, 'Minimum 1 characters').max(10, 'Maximum 10 characters'),
  featuredImage: yup.string().optional(),
  supportUrl: yup
    .string()
    .required('Support URL is required')
    .url('Invalid URL')
    .test('url-length', 'URL is too long', (val) => val.length <= 2082),
  remark: yup.string().optional(),
  tagIds: yup.array().of(yup.string().required()).min(1, 'At least one tag is required').strict().defined(),
})
