import {
  useLazyTagControllerGetTagsQuery,
  useLazyTagControllerSearchTagsQuery,
  useTagControllerCreateTagMutation,
  useTagControllerDeleteTagMutation,
  useTagControllerUpdateTagMutation,
} from '@app/services/api/tag/tag'
import { RootState } from '@app/store'
import { ITagStore } from '@app/store/tag'
import { generateSlug } from '@app/utils/stringHelper'
import { Button, Form, Input, InputRef, message, Select } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  DeleteOutlined,
  EditOutlined,
  UnlockOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { useAppSelector } from '@app/store/hook'

interface SearchFormValues {
  search: string;    
  pageSize: 7,
  pageNumber: number,
  sortField: string;
  sortOrder: 'ASC' | 'DESC';
}

const { Option } = Select
function TagsList() {
  const [getTagList] = useLazyTagControllerGetTagsQuery()
  const [createTag] = useTagControllerCreateTagMutation()
  const [updateTag] = useTagControllerUpdateTagMutation()
  const [deleteTag] = useTagControllerDeleteTagMutation()
  const [searchTag, { error, isLoading }] = useLazyTagControllerSearchTagsQuery()
  const searchTagList = useAppSelector((state: RootState) => state.tag.searchTagList);

  const [form] = Form.useForm<SearchFormValues>();
  const { tagList } = useSelector<RootState, ITagStore>((s) => s.tag)
  const searchRef = useRef<InputRef>(null);

  const [newTagName, setNewTagName] = useState('')
  const [editingTag, setEditingTag] = useState<string | null>(null)
  const [editedTagName, setEditedTagName] = useState('')
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [page, setPage] = useState<number>(1)
  
  const initialValues: SearchFormValues = {
    search: '',
    pageSize: 7,
    pageNumber: 1,
    sortField: 'createdAt',
    sortOrder: 'DESC'
  };
  
  useEffect(() => {
    searchTagsList();
  }, [page])

  const totalTags = searchTagList?.data?.length || 0

  const handleCreate = async () => {
    if (!newTagName.trim()) return
    const isDuplicate = tagList?.data?.some(
      (tag) => tag.name === editedTagName
    )

    if (isDuplicate) {
      message.error('Tag name already exists')
      return
    }

    generateSlug(newTagName)
    const isSlugDuplicate = tagList?.data?.some(
      (tag) => tag.slug === generateSlug(newTagName)
    )
    try {
      await createTag({ createTagRequest: { name: newTagName, slug: newTagName } }).unwrap()
      setNewTagName('')
      getTagList()
      message.success('Tag created')
    } catch (err) {
      message.error('Failed to create tag')
    }
  }

  const handleUpdate = async (id: string) => {
    if (!editedTagName.trim()) return
    const isDuplicate = tagList?.data?.some(
      (tag) => tag.name === editedTagName && tag.id !== id
    )

    if (isDuplicate) {
      message.error('Tag name already exists')
      return
    }

    try {
      await updateTag({
        updateTagRequest: {
          id,
          name: editedTagName,
          slug: editedTagName, // bạn có thể xử lý slug riêng nếu cần
        },
      }).unwrap()
      setEditingTag(null)
      setEditedTagName('')
      getTagList()
      message.success('Tag updated')
    } catch {
      message.error('Failed to update tag')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTag({ requestWithId: { id } }).unwrap()
      getTagList()
      message.success('Tag deleted')
    } catch {
      message.error('Cannot delete tag. It might be in use.')
    }
  }

  const onLoadMore = async () => {
    setIsLoadingMore(true)
    try {
      await getTagList().unwrap()
    } catch (_) {}
    setIsLoadingMore(false)
  }

  const handleSubmit = () => {
    setPage(1);
    searchTagsList();
  }
  
  const searchTagsList = () => {
    const formValues = form.getFieldsValue();
    searchTag({
      search: formValues.search || '',
      pageNumber: page,
      pageSize: 7
    })
  }  

  return (
    <div>
      <h2 className='font-bold text-lg'>Manage Tags</h2>

      <div className='flex gap-2 mb-4'>
        <Form 
          form={form}
          onFinish={handleSubmit}
          initialValues={initialValues}
          layout='inline'
          className='flex flex-wrap gap-2 items-end'
        >
          <Form.Item name='search' className='flex-grow w-full lg:max-w-lg '>
            <Input
              ref={searchRef}
              placeholder='Search by name or slug'
              prefix={<SearchOutlined style={{ color: '#bbb' }} />}
              onPressEnter={() => form.submit()}
              
              style={{ borderRadius: '8px', height: '40px' }}
              className='w-full'
            />
          </Form.Item>

          <Form.Item className='mb-0'>
            <Button 
              type='primary' 
              htmlType='submit'
              icon={<SearchOutlined />}
            >
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* <div className='flex gap-2 mb-4'>
        <Form.Item
          // validateStatus={errors?.socialLinks?.[index]?.url ? 'error' : ''}
          // help={errors?.socialLinks?.[index]?.url?.message}
          className="flex-1"
        >
          <Input
            placeholder='New tag name'
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onBlur={(event) =>}
          />
        </Form.Item>
        <Input
        />
        <Button onClick={handleCreate} type='primary'>
          Add
        </Button>
      </div> */}

      {searchTagList?.data?.slice(0, totalTags).map((tag) => (
        <div
          key={tag.id}
          className='flex items-center justify-between mb-2 p-2 border rounded'
        >
          {editingTag === tag.id ? (
            <>
              <Input
                value={editedTagName}
                onChange={(e) => setEditedTagName(e.target.value)}
                className='mr-2'
              />
              <Button onClick={() => handleUpdate(tag.id)}>Save</Button>
              <Button onClick={() => setEditingTag(null)} danger>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <span>{tag.name} ({tag.botCount})</span>
              <div className='flex gap-2'>
                <Button
                  onClick={() => {
                    setEditingTag(tag.id)
                    setEditedTagName(tag.name)
                  }}
                >
                  Edit
                </Button>
                <Button danger onClick={() => handleDelete(tag.id)}>
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      ))}

      {totalTags > 7 && (
        <Button
          size='large'
          disabled={isLoadingMore}
          loading={isLoadingMore}
          onClick={onLoadMore}
        >
          Load More
        </Button>
      )}
    </div>
  )
}

export default TagsList
