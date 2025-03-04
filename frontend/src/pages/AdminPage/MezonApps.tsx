import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMezonAppControllerDeleteMezonAppMutation, useMezonAppControllerSearchMezonAppQuery } from "@app/services/api/mezonApp/mezonApp";
import { Button, Spin, Table, Tooltip, Popconfirm } from "antd";
import { toast } from "react-toastify";

const MezonApps = ({ onEdit }: { onEdit: (app: any) => void }) => {
    const { data: apps, error, isLoading } = useMezonAppControllerSearchMezonAppQuery({
      pageSize: 10,
      pageNumber: 1,
      sortField: "createdAt",
      sortOrder: "DESC",
    });
    const [deleteMezonApp, { isLoading: isDeleting }] = useMezonAppControllerDeleteMezonAppMutation();
    const handleDelete = async (appId: string) => {
      try {
        await deleteMezonApp({ requestWithId: { id: appId } }).unwrap();
        toast.success("App deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete app");
      }
    };
  
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Headline",
        dataIndex: "headline",
        key: "headline",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ellipsis: true, // Truncate long text
      },
      {
        title: "Actions",
        key: "actions",
        render: (_: any, record: any) => (
          <>
            <Tooltip title="Edit">
              <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)} />
            </Tooltip>
            <Popconfirm
            title="Are you sure you want to delete this app?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button type="link" icon={<DeleteOutlined />} danger loading={isDeleting} />
            </Tooltip>
          </Popconfirm>
          </>
        ),
      },
    ];
    return isLoading ? (
      <Spin size="large" style={{ textAlign: "center", marginTop: "20px" }} />
    ) : (
      <Table dataSource={apps?.data} columns={columns} rowKey="id" />
    );
  };
export default MezonApps
  