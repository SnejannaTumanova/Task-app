import { useEffect, useState } from 'react';
import { Form, Input, Modal, message } from 'antd';
import type { Task } from '@/types/task';
import { updateTask } from '@/api/tasks';

type Props = {
  task: Task | null;
  open: boolean;
  onCancel: () => void;
  onSaved: () => void;
};

export function EditTaskModal({ task, open, onCancel, onSaved }: Props) {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description ?? '',
      });
    } else {
      form.resetFields();
    }
  }, [task, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!task) return;

      setSaving(true);
      await updateTask(task.id, values);
      message.success('Задача обновлена');
      onSaved();
    } catch (e: any) {
      if (e?.response) {
        message.error(e.response.data.message ?? 'Не удалось обновить задачу');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title="Редактировать задачу"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Сохранить"
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
