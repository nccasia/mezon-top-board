import { AutoCompleteProps } from 'antd'

export interface ISearchBarProps extends Omit<AutoCompleteProps, 'onSearch' | 'options'> {
  placeholder?: string
  allowClear?: boolean
  onSearch: (value?: string, fieldId?: string) => void
  debounceTime?: number
  data?: string[],
  isShowButton?: boolean
  isResultPage?: boolean
}
