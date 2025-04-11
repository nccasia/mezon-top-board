import { URI_REGEX } from '@app/constants/common.constant'
import * as yup from 'yup'

export const ADD_BOT_SCHEMA = yup.object({
  name: yup.string().required('Name is required').min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters'),
  isAutoPublished: yup.boolean().optional(),
  installLink: yup.string().matches(URI_REGEX, 'Invalid URI format').optional(),
  headline: yup.string().optional().min(50, 'Minimum 50 characters').max(510, 'Maximum 510 characters'),
  description: yup.string().optional(),
  prefix: yup.string().optional().min(1, 'Minimum 1 characters').max(10, 'Maximum 10 characters'),
  featuredImage: yup.string().optional(),
  supportUrl: yup.string().matches(URI_REGEX, 'Invalid URI format').optional(),
  remark: yup.string().optional(),
  tagIds: yup.array().of(yup.string().required()).min(1, 'At least one tag is required'),
  socialLinks: yup.array().optional(),
})
