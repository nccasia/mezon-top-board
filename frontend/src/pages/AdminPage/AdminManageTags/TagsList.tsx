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
import { Button, Form, Input, InputRef, message, Modal, Popconfirm, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useAppSelector } from '@app/store/hook'
import MtbTypography from '@app/mtb-ui/Typography/Typography'

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

  const [form] = Form.useForm<SearchFormValues>()
  const { tagList } = useSelector<RootState, ITagStore>((s) => s.tag)
  const searchRef = useRef<InputRef>(null)

  const [newTag, setNewTag] = useState({
    name: '',
    slug: generateSlug('')
  })
  const [isSlugEdited, setIsSlugEdited] = useState(false)
  const [showSlugInput, setShowSlugInput] = useState(false)

  const [editingTag, setEditingTag] = useState<{
    id: string | null
    name: string
    slug: string
  }>({ id: null, name: '', slug: '' })

  const [page, setPage] = useState<number>(1)
  const totalTags = searchTagList?.data?.length || 0

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  useEffect(() => {
    searchTagsList()
  }, [page])

  const handleCreate = async () => {
    if (!newTag.name.trim()) return
    const isDuplicate = tagList?.data?.some((tag) => tag.slug === newTag.slug)

    if (isDuplicate) {
      message.error('Tag already exists')
      return
    }

    try {
      await createTag({ createTagRequest: newTag }).unwrap()
      handleCancel()
      await getTagList()
      searchTagsList()
      message.success('Tag created')
    } catch (err) {
      message.error('Failed to create tag')
    }
  }

  const handleUpdate = async (id: string) => {
    if (!editingTag.name.trim()) return

    const isDuplicate = tagList?.data?.some((tag) => tag.name === editingTag.name && tag.id !== id)

    if (isDuplicate) {
      message.error('Tag name already exists')
      return
    }

    try {
      await updateTag({
        updateTagRequest: {
          id,
          name: editingTag.name,
          slug: editingTag.slug
        }
      }).unwrap()

      setEditingTag({ id: null, name: '', slug: '' })
      await getTagList()
      searchTagsList()
      message.success('Tag updated')
    } catch {
      message.error('Failed to update tag')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTag({ requestWithId: { id } }).unwrap()
      await getTagList()
      searchTagsList()
      message.success('Tag deleted')
    } catch {
      message.error('Cannot delete tag. It might be in use.')
    }
  }

  const searchTagsList = () => {
    const formValues = form.getFieldsValue()
    searchTag({
      search: formValues.search || '',
      pageNumber: page,
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
          <Input
            value={editingTag.name}
            onChange={(e) => setEditingTag((prev) => ({ ...prev, name: e.target.value }))}
          />
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
          <Input
            value={editingTag.slug}
            onChange={(e) => setEditingTag((prev) => ({ ...prev, slug: e.target.value }))}
          />
        ) : (
          text
        )
    },
    {
      title: 'Bot Count',
      dataIndex: 'botCount',
      key: 'botCount'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) =>
        editingTag.id === record.id ? (
          <>
            <Button type='primary' onClick={() => handleUpdate(record.id)}>
              Save
            </Button>
            <Button danger onClick={() => setEditingTag({ id: null, name: '', slug: '' })}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              icon={<EditOutlined />}
              onClick={() => setEditingTag({ id: record.id, name: record.name, slug: record.slug })}
            />
            <Popconfirm title='Delete this tag?' onConfirm={() => handleDelete(record.id)} okText='Yes' cancelText='No'>
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </>
        )
    }
  ]

  const handleCancel = () => {
    setIsOpenModal(false)
    setNewTag({ name: '', slug: generateSlug('') })
    setShowSlugInput(false)
    setIsSlugEdited(false)
  }

  return (
    <div>
      <h2 className='font-bold text-lg mb-4'>Manage Tags</h2>

      {/* Search & Add */}
      <div className='flex gap-2 mb-4'>
        <Form form={form} onFinish={searchTagsList} initialValues={{ search: '' }} className='flex-grow'>
          <Form.Item name='search' className='w-full'>
            <Input
              ref={searchRef}
              placeholder='Search by name or slug'
              prefix={<SearchOutlined style={{ color: '#bbb' }} />}
              onPressEnter={() => form.submit()}
            />
          </Form.Item>
        </Form>
        <Button type='primary' icon={<SearchOutlined />} onClick={() => form.submit()}>
          Search
        </Button>
        <Button color='default' variant='outlined' icon={<PlusOutlined />} onClick={() => setIsOpenModal(true)} />
      </div>

      {searchTagList?.data?.length ? (
        <Table dataSource={searchTagList.data} columns={columns} rowKey='id' pagination={false} />
      ) : (
        <MtbTypography variant='h4' weight='normal' customClassName='!text-center !block !text-gray-500'>
          No result
        </MtbTypography>
      )}
      {totalTags > 7 && (
        <div className='flex justify-center mt-4'>
          <Button size='large' loading={isLoading} onClick={() => setPage((prev) => prev + 1)}>
            Load More
          </Button>
        </div>
      )}

      <Modal
        title={'Create New Tag'}
        open={isOpenModal}
        onCancel={handleCancel}
        footer={<Button onClick={handleCreate}>Add</Button>}
        width={600}
        centered
      >
        <Form layout='vertical' className='!pt-2'>
          <Form.Item name='name' label='Name' rules={[{ required: true, message: 'This field is required' }]}>
            <Input
              placeholder='New tag name'
              value={newTag.name}
              onChange={(e) => {
                setNewTag((prev) => ({
                  ...prev,
                  name: e.target.value,
                  slug: isSlugEdited ? prev.slug : generateSlug(e.target.value)
                }))
              }}
            />
          </Form.Item>
          {!showSlugInput ? (
            <div className='flex items-center justify-between mb-3'>
              <div>
                <strong>Slug:</strong> {newTag.slug}
              </div>
              <Button
                type='link'
                icon={<EditOutlined />}
                onClick={() => {
                  setShowSlugInput(true)
                  setIsSlugEdited(true)
                }}
              />
            </div>
          ) : (
            <Form.Item name='slug' label='Slug' rules={[{ required: true, message: 'This field is required' }]}>
              <Input
                placeholder={newTag.slug}
                value={newTag.slug}
                onChange={(e) => {
                  setNewTag({
                    ...newTag,
                    slug: e.target.value
                  })
                  setIsSlugEdited(true)
                }}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default TagsList
