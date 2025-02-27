import { Table, Button, Modal, Form, Input, Image, Tooltip, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useAdminControllerGetAppsQuery } from "@app/services/api/admin/listAllApp";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMezonAppControllerSearchMezonAppQuery } from "@app/services/api/mezonApp/mezonApp";

const MezonApps = () => {
  // const { data, error, isLoading } = useAdminControllerGetAppsQuery({
  //   pageSize: 10,
  //   pageNumber: 1,
  //   sortField: "createdAt",
  //   sortOrder: "DESC",
  // });
  const { data: apps, error, isLoading } = useMezonAppControllerSearchMezonAppQuery({
    pageSize: 10,
    pageNumber: 1,
    sortField: "createdAt",
    sortOrder: "DESC",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [form] = Form.useForm();
  const defaultImage = "https://placehold.co/200x200"; // Default image URL

  useEffect(() => {
    if (error) {
      console.error("Error loading data:", error);
      toast.error("Error loading data. Please try again later!");
    }
  }, [error]);

  const handleEdit = (record: any) => {
    setSelectedApp(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    message.success(`Deleted App with ID: ${id}`);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log("Updated values:", values);
      message.success("App updated successfully");
      setIsModalVisible(false);
    });
  };

  const columns = [
    {
      title: "Featured Image",
      dataIndex: "featuredImage",
      key: "featuredImage",
      render: (url: string | null) =>
        <Image width={50} src={url ?? defaultImage} />
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rate Score",
      dataIndex: "rateScore",
      key: "rateScore",
    },
    {
      title: "Headline",
      dataIndex: "headline",
      key: "headline",
      render: (text: string | null) =>
        text ? (
          <Tooltip title={text}>
            <span>{text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
          </Tooltip>
        ) : (
          <span>No Headline</span>
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string | null) =>
        text ? (
          <Tooltip title={text}>
            <span>{text.length > 30 ? `${text.slice(0, 30)}...` : text}</span>
          </Tooltip>
        ) : (
          <span>No Description</span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Tooltip title="Edit">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        </Tooltip>
        <Tooltip title="Delete">
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Tooltip>
        </>
      ),
    },
  ];

  return isLoading ? (
    <Spin size="large" style={{ display: "block", textAlign: "center", marginTop: "20px" }} />
  ) : (
    <div>
      <Table dataSource={apps?.data} columns={columns} rowKey="id" />
  
      <Modal
        title="Edit App"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="App Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="rateScore" label="Rate Score">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="headline" label="Headline">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MezonApps;
