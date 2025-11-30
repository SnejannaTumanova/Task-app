import { useState } from 'react';
import { Form, Input, Modal, message } from 'antd';
import { createTask } from '@/api/tasks';

type Props = {
  open: boolean;
  onCancel: () => void;
  onCreated: () => void;
};

export function CreateTaskModal({ open, onCancel, onCreated }: Props) {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      await createTask(values);
      message.success('Задача создана');
      form.resetFields();
      onCreated();
    } catch (e: any) {
      if (e?.response) {
        message.error(e.response.data.message ?? 'Не удалось создать задачу');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Создать задачу"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Создать"
      cancelText="Отмена"
      confirmLoading={saving}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Название"
          name="title"
          rules={[
            { required: true, message: 'Введите название' },
            { min: 3, message: 'Минимум 3 символа' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Описание" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
