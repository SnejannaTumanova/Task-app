import { Form, Input, Button, Card, message } from 'antd';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  switchToRegister: () => void;
}

export default function LoginForm({ switchToRegister }: Props) {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await signIn(values.email, values.password);
      if (res.success) {
        message.success('Вход выполнен');
        window.location.href = '/dashboard';
      } else {
        message.error('Неверные данные');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Авторизация" style={{ width: 380 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
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
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => {
            const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
            const { email, password } = form.getFieldsValue();
            const isEmpty = !email || !password;

            return (
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                disabled={hasErrors || isEmpty}
              >
                Войти
              </Button>
            );
          }}
        </Form.Item>

        <Button type="link" style={{ marginTop: 10 }} onClick={switchToRegister}>
          Зарегистрироваться
        </Button>
      </Form>
    </Card>
  );
}
