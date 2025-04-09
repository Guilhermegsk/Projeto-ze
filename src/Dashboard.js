import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BookOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import GerenciarUsuarios from './GerenciarUsuarios';
import GerenciarProgramacao from './GerenciarProgramacao';

const { Sider, Content, Header } = Layout;

const Dashboard = () => {
  const [selectedKey, setSelectedKey] = useState('usuarios');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ou o que estiver usando para autenticação
    navigate('/login');
  };

  const renderContent = () => {
    switch (selectedKey) {
      case 'usuarios':
        return <GerenciarUsuarios />;
      case 'programacao':
        return <GerenciarProgramacao />;
      case 'eventos':
        return <div><h2>Gerenciar Eventos</h2><p>Em breve...</p></div>;
      case 'atas':
        return <div><h2>Gerenciar Atas</h2><p>Em breve...</p></div>;
      default:
        return <div>Selecione uma opção no menu</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '32px',
            fontWeight: 'bold',
          }}
        >
          Painel Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
        >
          <Menu.Item key="usuarios" icon={<UserOutlined />}>
            Gerenciar Usuários
          </Menu.Item>
          <Menu.Item key="programacao" icon={<CalendarOutlined />}>
            Gerenciar Programação
          </Menu.Item>
          <Menu.Item key="eventos" icon={<FileTextOutlined />}>
            Gerenciar Eventos
          </Menu.Item>
          <Menu.Item key="atas" icon={<BookOutlined />}>
            Gerenciar Atas
          </Menu.Item>
        </Menu>
        <div style={{ position: 'absolute', bottom: 20, width: '100%', textAlign: 'center' }}>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            danger
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, textAlign: 'center', fontSize: 18 }}>
          Dashboard Administrativo
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
