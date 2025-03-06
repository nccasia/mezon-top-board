import moment from 'moment'

export const formatDate = (date?: string | Date, format: string = 'DD/MM/YYYY HH:mm:ss') => {
  return date ? moment(date).format(format) : ''
}
