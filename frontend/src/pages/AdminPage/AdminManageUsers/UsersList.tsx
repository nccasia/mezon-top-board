import { UserControllerSearchUserApiArg, useUserControllerSearchUserQuery } from '@app/services/api/user/user'
import { Table, Tag, Spin, Alert, Input, Select, Button, Form } from 'antd'
import { useState, useRef } from 'react'

const { Option } = Select

function UsersList() {
  const searchRef = useRef<HTMLInputElement>(null)

  const [queryArgs, setQueryArgs] = useState<UserControllerSearchUserApiArg>({
    search: '',
    pageSize: 5,
    pageNumber: 1,
    sortField: 'createdAt',
    sortOrder: 'DESC'
  })

  const { data, error, isLoading } = useUserControllerSearchUserQuery(queryArgs)
  const users = data?.data || []

  //   Error handling
  let errorMessage = 'There was an issue fetching user data.'
  if (error && 'data' in error) {
    const serverError = error.data as { message?: string[] }
    if (serverError?.message) {
      errorMessage = Array.isArray(serverError.message) ? serverError.message.join(', ') : serverError.message
    }
  }

  // Handle form submission
  const handleSubmit = (values: any) => {
    setQueryArgs((prev) => ({
      ...prev,
      search: values.search || '',
      sortField: values.sortField,
      sortOrder: values.sortOrder,
      pageNumber: 1
    }))
  }

  //   Styling
  const roleColors: Record<string, string> = {
    ADMIN: 'red',
    DEVELOPER: 'blue',
    USER: 'green'
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => text || <span className='text-gray-400'>No name</span>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Bio',
      dataIndex: 'bio',
      key: 'bio',
      render: (text: string | null) => (text ? <Tag color='geekblue'>{text}</Tag> : <Tag color='gray'>No bio</Tag>)
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => <Tag color={roleColors[role] || 'default'}>{role}</Tag>
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
          columns={columns}
          dataSource={users.map((user) => ({ ...user, key: user.id }))}
          pagination={{
            current: queryArgs.pageNumber,
            pageSize: queryArgs.pageSize,
            total: data?.totalCount || 0,
            onChange: (page, pageSize) => setQueryArgs({ ...queryArgs, pageNumber: page, pageSize })
          }}
          bordered
        />
      )}
    </div>
  )
}

export default UsersList
