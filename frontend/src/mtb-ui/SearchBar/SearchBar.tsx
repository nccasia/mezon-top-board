import { AutoComplete, Input } from 'antd'
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { debounce } from 'lodash'
import { ISearchBarProps } from '@app/types/Search.types'
import { Controller, useForm } from 'react-hook-form'
import { SEARCH_SCHEMA } from '@app/validations/search.validations'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../Button'

const SearchBar = ({
  placeholder = 'Search',
  allowClear = true,
  onSearch,
  debounceTime = 500,
  data = [],
  isShowButton = true,
  ...props
}: ISearchBarProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<{ search: string }>({
    resolver: yupResolver(SEARCH_SCHEMA)
  })

  const handleSearch = debounce((val: string) => {
    if (!val) return setSuggestions([])
    setSuggestions(data.filter((item) => item.toLowerCase().includes(val.toLowerCase())))
  }, debounceTime)

  const handleClear = () => {
    setValue('search', '')
    setSuggestions([])
  }

  const onSubmit = (data: { search: string }) => {
    onSearch(data.search.trim())
  }

  return (
    <div className='flex gap-5 items-center'>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Controller
          name='search'
          control={control}
          render={({ field }) => (
            <AutoComplete
              {...props}
              options={suggestions.map((item) => ({ value: item }))}
              onSearch={(val) => handleSearch(val)}
              onSelect={(val) => {
                setValue('search', val)
                onSearch(val.trim())
              }}
              value={field.value}
              style={{ width: '100%' }}
            >
              <Input
                {...field}
                style={{ borderRadius: '100px' }}
                status={errors.search ? 'error' : ''}
                placeholder={placeholder}
                prefix={<SearchOutlined style={{ color: '#bbb' }} />}
                suffix={
                  allowClear && field.value ? (
                    <button onClick={handleClear} className='cursor-pointer flex align-middle'>
                      <CloseCircleOutlined  className='text-sm'/>
                    </button>
                  ) : null
                }
                onPressEnter={handleSubmit(onSubmit)}
              />
            </AutoComplete>
          )}
        />
        {errors.search && <p style={{ color: 'red', paddingTop: '10px' }}>{errors.search.message}</p>}
      </form>
      {isShowButton && (
        <Button color='primary' variant='solid' size='large' htmlType='submit' onClick={handleSubmit(onSubmit)}>
          Search
        </Button>
      )}
    </div>
  )
}

export default SearchBar
