import { Form, Modal, Input, Button } from "antd";
import { useState, forwardRef, useImperativeHandle } from "react";
import { useMezonAppControllerUpdateMezonAppMutation } from "@app/services/api/mezonApp/mezonApp";
import { toast } from "react-toastify";

interface EditModalProps {
  onUpdateSuccess: () => void; // Callback function for handling updates
}
const EditModal = forwardRef(({onUpdateSuccess}: EditModalProps, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [form] = Form.useForm();
  const [updateMezonApp, { isLoading }] = useMezonAppControllerUpdateMezonAppMutation();

  // Expose openModal function to the parent
  useImperativeHandle(ref, () => ({
    openModal: (app: any) => {
      setSelectedApp(app);
      form.setFieldsValue(app);
      setIsModalVisible(true);
    },
  }));

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await updateMezonApp({ updateMezonAppRequest: { ...values, id: selectedApp.id } }).unwrap();
      toast.success("App updated successfully");
      setIsModalVisible(false);
      onUpdateSuccess();
    } catch (error: any) {
      toast.error(`${error ? error?.data?.message : 'Failed to update app'}`);
      console.error("Update error:", error);
    }
  };

  return (
    <Modal
      title="Edit App"
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsModalVisible(false)}>Cancel</Button>,
        <Button key="save" type="primary" loading={isLoading} onClick={handleSave}>Save</Button>,
      ]}
    >
      <Form form={form} layout="horizontal">
        <Form.Item name="name" label="App Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="headline" label="Headline">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default EditModal;


