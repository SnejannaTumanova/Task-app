import { Form, Input, Button, Card, message } from 'antd';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  switchToLogin: () => void;
}

export default function RegisterForm({ switchToLogin }: Props) {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await signUp(values.name, values.email, values.password);
      if (res.success) {
        message.success('Регистрация успешна! Теперь войдите.');
        switchToLogin();
      } else {
        message.error('Ошибка регистрации');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Регистрация" style={{ width: 380 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Введите имя' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Введите email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: 'Введите пароль' },
            { min: 6, message: 'Минимум 6 символов' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => {
            const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
            const { name, email, password } = form.getFieldsValue();
            const isEmpty = !name || !email || !password;

            return (
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                disabled={hasErrors || isEmpty}
              >
                Зарегистрироваться
              </Button>
            );
          }}
        </Form.Item>

        <Button type="link" style={{ marginTop: 10 }} onClick={switchToLogin}>
          Уже есть аккаунт?
        </Button>
      </Form>
    </Card>
  );
}
