import { REQUIRED_ERROR_FIELD, URL_REGEX } from '@app/constants/common.constant'
import { array, boolean, object, string } from 'yup'
export const ADD_BOT_SCHEMA = object({
  name: string().required(REQUIRED_ERROR_FIELD()),
  headline: string().required(REQUIRED_ERROR_FIELD()),
  description: string().required(REQUIRED_ERROR_FIELD()),
  autoPublish: boolean(),
  installLink: string().required(REQUIRED_ERROR_FIELD()).matches(URL_REGEX, 'Invalid URL'),
  prefix: string().required(REQUIRED_ERROR_FIELD()),
  supportURL: string().required(REQUIRED_ERROR_FIELD()).matches(URL_REGEX, 'Invalid URL'),
  tags: array().of(string().required()).min(1, REQUIRED_ERROR_FIELD()).default([]),
  note: string().required(REQUIRED_ERROR_FIELD()),
  linkType: string()
})
