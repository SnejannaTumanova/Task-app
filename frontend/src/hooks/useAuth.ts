import { useState } from 'react';
import { login as apiLogin, register as apiRegister } from '@/api/api';

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      // сохраняем токен и данные пользователя
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { success: true, data };
    } catch (err) {
      console.error('Ошибка входа:', err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const data = await apiRegister(name, email, password);
      return { success: true, data };
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { signIn, signUp, loading };
}
