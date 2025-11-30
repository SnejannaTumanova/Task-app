import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';

interface HeaderProps {
  user: { name: string };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div
      style={{
        margin: '20px auto',
        width: '90%',
        maxWidth: '1200px',
        background: '#eeebebff',
        padding: '15px 25px',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        fontSize: '18px',
        fontWeight: 500,
      }}
    >
      <div>Привет, {user.name} 👋</div>

      <Button onClick={logout} icon={<AiOutlineLogout size={18} />} type="primary" danger>
        Выйти
      </Button>
    </div>
  );
};

export default Header;
