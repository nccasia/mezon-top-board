import { EditOutlined } from '@ant-design/icons'
import { SearchUserResponse, UpdateUserRequest, UserControllerSearchUserApiArg, useUserControllerSearchUserQuery } from '@app/services/api/user/user'
import { useAppSelector } from '@app/store/hook'
import { Alert, Breakpoint, Button, Form, Input, InputRef, Select, Spin, Table, Tag } from 'antd'
import { useMemo, useRef, useState } from 'react'
import { userRoleColors } from './components/UserTableColumns'
import EditUserForm from './EditUserForm'

const { Option } = Select

function UsersList() {
  const searchRef = useRef<InputRef>(null)

  const [queryArgs, setQueryArgs] = useState<UserControllerSearchUserApiArg>({
    search: '',
    pageSize: 5,
    pageNumber: 1,
    sortField: 'createdAt',
    sortOrder: 'DESC'
  })

  const { data, error, isLoading } = useUserControllerSearchUserQuery(queryArgs)
  const users = useAppSelector((state: any) => state.user.pages?.[queryArgs.pageNumber] || []) // Get users from Redux
  const [selectedUser, setSelectedUser] = useState<UpdateUserRequest | null>(null)

  const handlePageChange = (page: number, pageSize: number) => {
    setQueryArgs((prev) => ({
      ...prev,
      pageNumber: page,
      pageSize
    }))
  }

  //   Error handling
  const errorMessage = useMemo(() => {
    if (error && 'data' in error) {
      const serverError = error.data as { message?: string[] }
      if (serverError?.message) {
        return Array.isArray(serverError.message) ? serverError.message.join(', ') : serverError.message
      }
    }
    return 'There was an issue fetching user data.'
  }, [error])

  // Handle form submission
  const handleSubmit = (values: UserControllerSearchUserApiArg) => {
    setQueryArgs((prev) => ({
      ...prev,
      search: values.search || '',
      sortField: values.sortField,
      sortOrder: values.sortOrder,
      pageNumber: 1
    }))
  }
  const userTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true, // Prevents overflow
      width: 100,
      responsive: ['xs', 'sm', 'md', 'lg'] as Breakpoint[], // Adjusts on small screens
      render: (text: string) => text || <span className='text-gray-400'>No name</span>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100
    },
    {
      title: 'Bio',
      dataIndex: 'bio',
      key: 'bio',
      width: 100,
      responsive: ['sm', 'md', 'lg'] as Breakpoint[], // Hides on extra-small screens
      render: (text: string | null) => (text ? <Tag color='geekblue'>{text}</Tag> : <Tag color='gray'>No bio</Tag>)
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      render: (role: string) => <Tag color={userRoleColors[role] || 'default'}>{role}</Tag>
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      fixed: 'right' as const, // Keeps actions fixed when scrolling
      render: (_: any, record: UpdateUserRequest) => (
        <Button type='primary' icon={<EditOutlined />} onClick={() => setSelectedUser(record)}></Button>
      )
    }
  ]
  return (
    <div className='p-4 bg-white rounded-md shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>Users List</h2>

      {/* Search & Sorting Form */}
      <div className='mb-4'>
        <Form onFinish={handleSubmit} initialValues={queryArgs} layout='inline'>
          <Form.Item name='search'>
            <Input ref={searchRef} placeholder='Search by name or email' className='w-60' />
          </Form.Item>

          <Form.Item name='sortField'>
            <Select className='w-40'>
              <Option value='createdAt'>Created At</Option>
              <Option value='name'>Name</Option>
            </Select>
          </Form.Item>

          <Form.Item name='sortOrder'>
            <Select className='w-40'>
              <Option value='ASC'>Ascending</Option>
              <Option value='DESC'>Descending</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* Loading Spinner */}
      {isLoading && (
        <div className='flex justify-center my-4'>
          <Spin size='large' />
        </div>
      )}

      {/* Server Error Alert */}
      {error && (
        <Alert message='Error Loading Users' description={errorMessage} type='error' showIcon className='mb-4' />
      )}

      {/* Render Table */}
      {!isLoading && !error && (
        <Table
          columns={userTableColumns}
          dataSource={users.map((user: SearchUserResponse) => ({ ...user, key: user.id }))}
          pagination={{
            current: data?.pageNumber || 1, // ✅ Controlled by API
            pageSize: data?.pageSize || 5, // ✅ Controlled by API
            total: data?.totalCount || 0, // ✅ Controlled by API
            onChange: handlePageChange // ✅ Handles Page Change
          }}
          bordered
          scroll={{ x: 'max-content' }} // Enables horizontal scrolling on overflow
        />
      )}
      {selectedUser && (
        <div className='bg-opacity-50'>
          <EditUserForm user={selectedUser} onClose={() => setSelectedUser(null)} />
        </div>
      )}
    </div>
  )
}

export default UsersList
