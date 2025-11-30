import React, { useState } from 'react';
import { Button, Card, Form, Input, Tooltip, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
};

const AuthPage: React.FC<{ onAuth?: () => void }> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm<AuthFormValues>();

  const onFinishLogin = async (values: AuthFormValues) => {
    const res = await signIn(values.email, values.password);
    if (res.success) {
      message.success('Вход выполнен');
      onAuth?.();
      navigate('/dashboard');
    } else {
      message.error('Неверные данные');
    }
  };

  const onFinishRegister = async (values: AuthFormValues) => {
    const res = await signUp(values.name ?? '', values.email, values.password);
    if (res.success) {
      message.success('Регистрация прошла успешно! Теперь войдите.');
      setIsLogin(true);

      // оставляем email/password, очищаем только имя
      form.setFieldsValue({ name: '' });
    } else {
      message.error('Ошибка регистрации');
    }
  };

  const toggleMode = () => {
    setIsLogin(prev => {
      const next = !prev;

      // если переключаемся на логин — name не нужен, очищаем его
      if (next === true) {
        form.setFieldsValue({ name: '' });
      }

      return next;
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f5f5f5',
      }}
    >
      <Card title={isLogin ? 'Авторизация' : 'Регистрация'} style={{ width: 400 }}>
        <Form<AuthFormValues>
          form={form}
          layout="vertical"
          onFinish={isLogin ? onFinishLogin : onFinishRegister}
          validateTrigger={['onBlur', 'onChange']}
        >
          {!isLogin && (
            <Form.Item
              label="Имя"
              name="name"
              rules={[
                { required: true, message: 'Введите имя' },
                { whitespace: true, message: 'Имя не может быть пустым' },
              ]}
            >
              <Input placeholder="Например, Иван Петров" />
            </Form.Item>
          )}

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>

          <Form.Item
            label={
              <span>
                Пароль{' '}
                <Tooltip title="Минимум 6 символов">
                  <InfoCircleOutlined style={{ marginLeft: 6, color: '#8c8c8c' }} />
                </Tooltip>
              </span>
            }
            name="password"
            rules={[
              { required: true, message: 'Введите пароль' },
              { min: 6, message: 'Минимум 6 символов' },
            ]}
          >
            <Input.Password placeholder="Минимум 6 символов" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Form.Item>
        </Form>

        <Button type="link" onClick={toggleMode} block>
          {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </Button>
      </Card>
    </div>
  );
};

export default AuthPage;
