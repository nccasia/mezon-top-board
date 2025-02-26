import { Input, Tag } from 'antd'
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { ISearchBarProps } from '@app/types/Search.types'
import { Controller, useForm } from 'react-hook-form'
import { SEARCH_SCHEMA } from '@app/validations/search.validations'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../Button'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@app/store'
import { ITagStore } from '@app/store/tag'
import { useState } from 'react'

const MAX_VISIBLE_TAGS = 10

const SearchBar = ({
  placeholder = 'Search',
  allowClear = true,
  onSearch,
  isShowButton = true,
  isResultPage = false,
  ...props
}: ISearchBarProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { control, handleSubmit, setValue } = useForm<{ search?: string }>({
    resolver: yupResolver(SEARCH_SCHEMA),
    defaultValues: { search: searchParams.get('q') || '' }
  })
  const [showAllTags, setShowAllTags] = useState(false)
  const { tagList } = useSelector<RootState, ITagStore>((s) => s.tag)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleClear = () => {
    setValue('search', '')
  }

  const onSubmit = (data: { search?: string }) => {
    const searchText = data.search?.trim() || ''
    if (isResultPage) {
      onSearch(searchText)
      setSearchParams({ q: searchText })
    } else {
      navigate(`/search?q=${encodeURIComponent(searchText)}`)
    }
  }
  const handleSearchTag = (tagId: string) => {
    if (isResultPage || pathname === '/') {
      onSearch('', tagId)
    }
  }

  const totalTags = tagList?.data?.length || 0
  const hiddenTagsCount = totalTags - MAX_VISIBLE_TAGS

  return (
    <>
      <div className='flex gap-5 items-center'>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Controller
            name='search'
            control={control}
            render={({ field }) => (
              <Input
                {...props}
                {...field}
                style={{ borderRadius: '100px' }}
                placeholder={placeholder}
                prefix={<SearchOutlined style={{ color: '#bbb' }} />}
                suffix={
                  allowClear && field.value ? (
                    <button onClick={handleClear} className='cursor-pointer flex align-middle'>
                      <CloseCircleOutlined className='text-sm' />
                    </button>
                  ) : null
                }
                onPressEnter={handleSubmit(onSubmit)}
              />
            )}
          />
        </form>
        {isShowButton && (
          <Button color='primary' variant='solid' size='large' htmlType='submit' onClick={handleSubmit(onSubmit)}>
            Search
          </Button>
        )}
      </div>
      <div className={`pt-5 cursor-pointer`}>
        {tagList?.data?.slice(0, showAllTags ? totalTags : MAX_VISIBLE_TAGS).map((tag) => (
          <Tag key={tag.id} className='!rounded-[10px] !bg-gray-300' onClick={() => handleSearchTag(tag?.id)}>
            {tag.name}
          </Tag>
        ))}
        {!showAllTags && totalTags > 10 && (
          <Tag className='!rounded-[10px] !bg-gray-300 !mb-2' onClick={() => setShowAllTags(true)}>
            +{hiddenTagsCount}
          </Tag>
        )}
      </div>
    </>
  )
}

export default SearchBar
