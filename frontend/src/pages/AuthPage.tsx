import React, { useState } from 'react';
import { Button, Card, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const AuthPage: React.FC<{ onAuth?: () => void }> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();

  const onFinishLogin = async (values: any) => {
    const res = await signIn(values.email, values.password);
    if (res.success) {
      message.success('Вход выполнен');
      onAuth?.();
      navigate('/dashboard');
    } else {
      message.error('Неверные данные');
    }
  };

  const onFinishRegister = async (values: any) => {
    const res = await signUp(values.name, values.email, values.password);
    if (res.success) {
      message.success('Регистрация прошла успешно! Теперь войдите.');
      setIsLogin(true);
    } else {
      message.error('Ошибка регистрации');
    }
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
        <Form layout="vertical" onFinish={isLogin ? onFinishLogin : onFinishRegister}>
          {!isLogin && (
            <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Введите имя' }]}>
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}
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

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Form.Item>
        </Form>

        <Button type="link" onClick={() => setIsLogin(!isLogin)} block>
          {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </Button>
      </Card>
    </div>
  );
};

export default AuthPage;
