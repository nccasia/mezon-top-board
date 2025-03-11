import { Tag } from 'antd'

// Define role colors
const userRoleColors: Record<string, string> = {
  ADMIN: 'red',
  DEVELOPER: 'blue',
  USER: 'green'
}

// Table columns definition
export const userTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => text || <span className="text-gray-400">No name</span>
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
    render: (text: string | null) =>
      text ? <Tag color="geekblue">{text}</Tag> : <Tag color="gray">No bio</Tag>
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role: string) => <Tag color={userRoleColors[role] || 'default'}>{role}</Tag>
  }
]
