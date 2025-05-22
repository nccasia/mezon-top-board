import {
  useLazyTagControllerGetTagsQuery,
  useLazyTagControllerSearchTagsQuery,
  useTagControllerCreateTagMutation,
  useTagControllerDeleteTagMutation,
  useTagControllerUpdateTagMutation
} from '@app/services/api/tag/tag'
import { RootState } from '@app/store'
import { ITagStore } from '@app/store/tag'
import { generateSlug } from '@app/utils/stringHelper'
import { Form, Input, InputRef, Popconfirm, Table, Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useAppSelector } from '@app/store/hook'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { toast } from 'react-toastify'
import { SLUG_RULE } from '@app/constants/common.constant'

import MtbButton from '@app/mtb-ui/Button'
import CreateTagModal from './components/CreateTagModel'

interface TagFormValues {
  name: string,
  slug: string
}
interface SearchFormValues {
  search: string
}

function TagsList() {
  const [getTagList] = useLazyTagControllerGetTagsQuery()
  const [createTag] = useTagControllerCreateTagMutation()
  const [updateTag] = useTagControllerUpdateTagMutation()
  const [deleteTag] = useTagControllerDeleteTagMutation()
  const [searchTag, { isLoading }] = useLazyTagControllerSearchTagsQuery()
  const searchTagList = useAppSelector((state: RootState) => state.tag.searchTagList)

  const [searchForm] = Form.useForm<SearchFormValues>()
  const [tagForm] = Form.useForm<TagFormValues>()

  const { tagList } = useSelector<RootState, ITagStore>((s) => s.tag)
  const searchRef = useRef<InputRef>(null)

  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const [editingTag, setEditingTag] = useState<{
    id: string | null
    name: string
    slug: string
  }>({ id: null, name: '', slug: '' })

  const [page, setPage] = useState<number>(1)

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const totalTags = searchTagList?.totalCount || 0
  const editError = !editingTag.name.trim() || !SLUG_RULE.pattern.test(editingTag.slug)

  useEffect(() => {
    searchTagsList()
  }, [page])
  useEffect(() => {
    getTagList()
  }, [])

  const handleCreate = async (values: TagFormValues) => {
    if (typeof values.slug !== 'string' || !values.slug.trim()) {
      values.slug = generateSlug(values.name)
    }
    values.name = values.name.trim()
    const isDuplicate = tagList?.data?.some((tag) =>
      (tag.name.trim() === values.name || tag.slug === values.slug)
    )
    if (isDuplicate) {
      toast.error('Tag already exists')
      return
    }

    try {
      await createTag({ createTagRequest: values }).unwrap()
      handleCancel()
      await getTagList()
      toast.success('Tag created')
    } catch (err) {
      toast.error('Failed to create tag')
    }
  }

  const handleUpdate = async (id: string) => {
    const isDuplicate = tagList?.data?.some((tag) =>
      (tag.name === editingTag.name.trim() || tag.slug === editingTag.slug) &&
      tag.id !== id
    )

    if (isDuplicate) {
      toast.error('Tag name or tag slug already exists')
      return
    }

    try {
      await updateTag({
        updateTagRequest: {
          id,
          name: editingTag.name.trim(),
          slug: editingTag.slug
        }
      }).unwrap()
      setEditingTag({ id: null, name: '', slug: '' })
      await getTagList()
      toast.success('Tag updated')
    } catch {
      toast.error('Failed to update tag')
    }
  }

  const handleDelete = async (id: string) => {
    if (tagList?.data?.some((tag) => tag.id === id && tag.botCount > 0) ) {
      toast.error('Tag is in use and cannot be deleted')
      return
    }
    try {
      await deleteTag({ requestWithId: { id } }).unwrap()
      await getTagList()
      toast.success('Tag deleted')
    } catch {
      toast.error('Cannot delete tag. It might be in use.')
    }
  }

  const handleSearch = () => {
    setPage(1)
    searchTagsList(1)
  }

  const searchTagsList = (pageNumber? : number) => {
    const formValues = searchForm.getFieldsValue()
    searchTag({
      search: formValues.search || '',
      pageNumber: pageNumber ?? page,
      pageSize: 7
    })
  }

  const columns = [
    {
      title: 'Tag Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) =>
        editingTag.id === record.id ? (
          <Tooltip
            open={!editingTag.name.trim()}
            title='This field is required'
            placement='topLeft' color='rgba(255, 0, 0, 0.8)'
          >
            <Input
              required
              status={!editingTag.name.trim() ? 'error' : ''}
              value={editingTag.name}
              onChange={(e) => setEditingTag((prev) => ({ ...prev, name: e.target.value }))}
            />
          </Tooltip>
        ) : (
          text
        )
    },
    {
      title: 'Tag Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (text: string, record: any) =>
        editingTag.id === record.id ? (
          <Tooltip
            open={!SLUG_RULE.pattern.test(editingTag.slug)}
            title='Slug must be lowercase, alphanumeric, and use hyphens (no spaces or special characters)'
            placement='topLeft' color='rgba(255, 0, 0, 0.8)'
          >
            <Input
              required
              status={!SLUG_RULE.pattern.test(editingTag.slug) ? 'error' : ''}
              value={editingTag.slug}
              onChange={(e) => setEditingTag((prev) => ({ ...prev, slug: e.target.value }))}
            />
          </Tooltip>
        ) : (
          text
        )
    },
    {
      title: 'Bot Count',
      dataIndex: 'botCount',
      key: 'botCount',
      width: '15%',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '20%',
      render: (_: any, record: any) =>
        editingTag.id === record.id ? (
          <div className='flex gap-2'>
            <MtbButton disabled={editError} color="default" variant='outlined' onClick={() => handleUpdate(record.id)}>
              Save
            </MtbButton>
            <MtbButton color='danger' onClick={() => setEditingTag({ id: null, name: '', slug: '' })}>
              Cancel
            </MtbButton>
          </div>
        ) : (
          <div className='flex gap-2'>
            <MtbButton color='secondary'
              icon={<EditOutlined />}
              onClick={() => setEditingTag({ id: record.id, name: record.name, slug: record.slug })}
            />
            <Popconfirm title='Delete this tag?' onConfirm={() => handleDelete(record.id)} okText='Yes' cancelText='No'>
              <MtbButton color='danger'  icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        )
    }
  ]

  const handleCancel = () => {
    setIsOpenModal(false)
    tagForm.resetFields();
  }

  const onLoadMore = async () => {
    setIsLoadingMore(true)
    setPage((prev) => prev + 1)
    setIsLoadingMore(false)
  }

  return (
    <div>
      <h2 className='font-bold text-lg mb-4'>Manage Tags</h2>

      <div className='flex gap-2 mb-4'>
        <Form form={searchForm} onFinish={handleSearch} initialValues={{ search: '' }} className='flex-grow'>
          <Form.Item name='search' className='w-full'>
            <Input
              ref={searchRef}
              placeholder='Search by name or slug'
              prefix={<SearchOutlined style={{ color: '#bbb' }} />}
              onPressEnter={() => searchForm.submit()}
            />
          </Form.Item>
        </Form>
        <MtbButton icon={<SearchOutlined />} onClick={() => searchForm.submit()}>
          Search
        </MtbButton>
        <MtbButton color='default' variant='outlined' icon={<PlusOutlined />} onClick={() => setIsOpenModal(true)} />
      </div>

      {searchTagList?.data?.length ? (
        <Table dataSource={searchTagList.data} columns={columns} rowKey='id' pagination={false} />
      ) : (
        <MtbTypography variant='h4' weight='normal' customClassName='!text-center !block !text-gray-500'>
          No result
        </MtbTypography>
      )}
      {totalTags > 7 && searchTagList.hasNextPage && (
        <MtbButton block
          customClassName="mt-4 !h-10"
          loading={isLoading}
          onClick={onLoadMore}
        >
          Load More
        </MtbButton>
      )}

      <CreateTagModal
        open={isOpenModal}
        onClose={handleCancel}
        onCreate={handleCreate}
      />
    </div>
  )
}

export default TagsList
