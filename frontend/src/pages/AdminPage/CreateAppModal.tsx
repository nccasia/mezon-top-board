import { useMezonAppControllerCreateMezonAppMutation } from "@app/services/api/mezonApp/mezonApp";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateAppModal = ({ onCreateSuccess }: { onCreateSuccess: () => void }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [createMezonApp, { isLoading }] = useMezonAppControllerCreateMezonAppMutation();
  
    const handleOpen = () => {
      form.resetFields();
      setIsModalVisible(true);
    };
  
    const handleSave = async () => {
      try {
        const values = await form.validateFields();
        await createMezonApp({ createMezonAppRequest: values }).unwrap();
        toast.success("App created successfully");
        setIsModalVisible(false);
        onCreateSuccess(); // Refetch data after creation
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create app");
        console.error("Create error:", error);
      }
    };
  
    return (
      <>
        <Button type="primary" onClick={handleOpen}>Create App</Button>
  
        <Modal
          title="Create New App"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>Cancel</Button>,
            <Button key="save" type="primary" loading={isLoading} onClick={handleSave}>Save</Button>,
          ]}
        >
          <Form form={form} layout="horizontal">
            <Form.Item name="name" label="App Name" rules={[{ required: true, message: "App Name is required" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="headline" label="Headline">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item name="installLink" label="Install Link">
              <Input />
            </Form.Item>
            <Form.Item name="ownerId" label="Owner ID" rules={[{ required: true, message: "Owner ID is required" }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
  
export default CreateAppModal