import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { REVIEW_HISTORY_COLUMNS } from '@app/constants/table.constant'
import {
  ReviewHistoryResponse,
  useLazyReviewHistoryControllerGetAppReviewsQuery,
  useReviewHistoryControllerDeleteAppReviewMutation,
  useReviewHistoryControllerUpdateAppReviewMutation
} from '@app/services/api/reviewHistory/reviewHistory'
import { mapDataSourceTable } from '@app/utils/table'
import { Button, Form, Input, Modal, Popconfirm, Table, Tooltip } from 'antd'
import { ChangeEvent, useEffect, useState } from 'react'
import ReviewHistoryInfo from './ReviewHistoryInfo/ReviewHistoryInfo'
import { toast } from 'react-toastify'

function ReviewHistoryPage() {
  const [getReviewHistory, { data }] = useLazyReviewHistoryControllerGetAppReviewsQuery()
  const [getReviewHistoryDetail, { data: reviewHistoryDetail }] = useLazyReviewHistoryControllerGetAppReviewsQuery()
  const [updateReviewHistory] = useReviewHistoryControllerUpdateAppReviewMutation()
  const [deleteReviewHistory] = useReviewHistoryControllerDeleteAppReviewMutation()
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1)
  const [currentPageSize, setCurrentPageSize] = useState<number>(5)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [remark, setRemark] = useState<string>('')
  const [selectedHistory, setSelectedHistory] = useState<string>('')

  const fetchData = async () => {
    getReviewHistory({
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
      sortField: 'createdAt',
      sortOrder: 'DESC'
    })
  }

  useEffect(() => {
    fetchData()
  }, [currentPageSize, currentPageNumber])

  const handleView = (id: string) => {
    setIsEdit(false)
    getReviewHistoryDetail({
      appId: id,
      pageNumber: 1,
      pageSize: 1,
      sortField: 'createdAt',
      sortOrder: 'DESC'
    })
    setIsOpenModal(true)
  }

  const handleEdit = (id: string) => {
    setSelectedHistory(id)
    setIsEdit(true)
    setIsOpenModal(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteReviewHistory({
        requestWithId: {
          id
        }
      })
      toast.success('Delete history successfull')
      await fetchData()
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to edit history')
    }
  }

  const handleUpdate = async () => {
    setIsEdit(true)
    setIsOpenModal(true)
    try {
      await updateReviewHistory({
        updateAppReviewRequest: {
          id: selectedHistory,
          remark
        }
      })
      setIsOpenModal(false)
      toast.success('Update history successfull')
      await fetchData()
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to edit history')
    }
  }

  const dataHistoryTable = !!data?.data?.length ? mapDataSourceTable(data?.data) : []
  const columns = [
    ...REVIEW_HISTORY_COLUMNS,
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: ReviewHistoryResponse) => (
        <div className='flex gap-3'>
          <Tooltip title='View'>
            <Button
              color='cyan'
              variant='outlined'
              icon={<EyeOutlined />}
              onClick={() => handleView(record.app.id || '')}
            ></Button>
          </Tooltip>
          <Tooltip title='Edit'>
            <Button
              color='default'
              variant='outlined'
              icon={<EditOutlined />}
              onClick={() => handleEdit(record.id || '')}
            ></Button>
          </Tooltip>
          <Popconfirm
            title='Delete the history'
            description='Are you sure to delete this history?'
            onConfirm={() => handleDelete(record?.id)}
            okText='Yes'
            cancelText='No'
          >
            <Tooltip title='Delete'>
              <Button color='danger' variant='outlined' icon={<DeleteOutlined />}></Button>
            </Tooltip>
          </Popconfirm>
        </div>
      )
    }
  ]

  return (
    <>
      <Table
        dataSource={dataHistoryTable}
        columns={columns}
        rowKey='id'
        pagination={{
          current: currentPageNumber,
          pageSize: currentPageSize,
          total: data?.totalCount,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15'],
          showTotal: (total) => `Total ${total} items`,
          onChange: (page, pageSize) => {
            setCurrentPageNumber(page)
            setCurrentPageSize(pageSize || 5)
          }
        }}
        className='cursor-pointer'
      ></Table>
      <Modal
        title={isEdit ? 'Edit History' : 'View history'}
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={isEdit ? <Button onClick={handleUpdate}>Update</Button> : null}
        width={600}
        centered
      >
        {isEdit ? (
          <Form layout='vertical' className='!pt-2'>
            <Form.Item name='remark' label='Remark' rules={[{ required: true, message: 'This field is required' }]}>
              <Input.TextArea
                autoSize={false}
                rows={4}
                className='!resize-none'
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setRemark(e.target.value)}
              />
            </Form.Item>
          </Form>
        ) : (
          <ReviewHistoryInfo data={reviewHistoryDetail?.data?.[0]}></ReviewHistoryInfo>
        )}
      </Modal>
    </>
  )
}

export default ReviewHistoryPage
