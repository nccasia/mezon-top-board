import * as yup from 'yup'

export const ADD_BOT_SCHEMA = yup.object({
  name: yup.string().required('Name is required'),
  isAutoPublished: yup.boolean().optional(),
  installLink: yup.string().url('Invalid URL').optional(),
  headline: yup.string().optional(),
  description: yup.string().optional(),
  prefix: yup.string().optional(),
  featuredImage: yup.string().optional(),
  ownerId: yup.string().required('Owner ID is required'),
  supportUrl: yup.string().url('Invalid URL').optional(),
  remark: yup.string().optional(),
  tagIds: yup.array().of(yup.string().required()).optional(),
  socialLinkIds: yup.array().optional(),
})
