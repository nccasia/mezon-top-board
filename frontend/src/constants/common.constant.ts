import { FieldError } from 'react-hook-form'

export const ratings = [
  { stars: 5, percent: 80, value: 80000 },
  { stars: 4, percent: 60, value: 60000 },
  { stars: 3, percent: 40, value: 40000 },
  { stars: 2, percent: 20, value: 30000 },
  { stars: 1, percent: 10, value: 10000 }
]

export const searchOption = ['Apple', 'Banana', 'Cherry']
export const tagOption = ['Enhance', 'Tool']

export const REQUIRED_ERROR_FIELD = () => `This field is required`
export const errorStatus = (field: FieldError | undefined) => (field?.message ? 'error' : '')
export const URL_REGEX = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
