import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useLazyTagControllerGetTagsQuery } from '@app/services/api/tag/tag'
import { RootState } from '@app/store'
import { useAppSelector } from '@app/store/hook'
import { ITagStore } from '@app/store/tag'
import { Button, Input, Modal, Space, Table } from 'antd'
import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

function TagsList() {
  const [getTags, { isLoading }] = useLazyTagControllerGetTagsQuery()
  const { tagList } = useAppSelector<RootState, ITagStore>((s) => s.tag)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditingTag, setIsEditingTag] = useState<any>(null)
  const [tagName, setTagName] = useState('')

  useEffect(() => {
    getTags()
  }, [])

  const showModal = (tag?: any) => {
    setIsEditingTag(Boolean(tag))
    setTagName(tag?.name || '')
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    try {
      if (isEditingTag) {
        toast.success('Tag updated successfully')
      } else {
        toast.success('Tag created successfully')
      }
      setIsModalVisible(false)
      setTagName('')
      setIsEditingTag(false)
    } catch (err) {
      toast.error('Failed to save tag')
    }
  }

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this tag?',
      onOk: async () => {
        try {
          toast.success('Tag deleted successfully')
        } catch {
          toast.error('Failed to delete tag')
        }
      }
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      )
    }
  ]

  return (
    <main className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Tags</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          New Tag
        </Button>
      </div>
      <Table
        rowKey="id"
        dataSource={tagList.data}
        columns={columns}
        loading={isLoading}
      />

      <Modal
        title={isEditingTag ? 'Edit Tag' : 'Create Tag'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          placeholder="Enter tag name"
        />
      </Modal>
    </main>
  )
}

export default TagsList
