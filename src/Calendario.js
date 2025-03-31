import React from "react";
import { Layout, Button, Typography, Calendar, ConfigProvider } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ptBR from "antd/lib/locale/pt_BR";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Calendario = () => {
  const navigate = useNavigate();

  return (
    <ConfigProvider locale={ptBR}>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Navbar */}
        <Header style={{ position: "fixed", width: "100%", zIndex: 1000, textAlign: "center" }}>
          <Title level={3} style={{ color: "white", margin: 0 }}>Calendário</Title>
        </Header>

        <Content style={{ marginTop: 64, padding: "50px 20px", display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          <Button type="default" icon={<LeftOutlined />} onClick={() => navigate("/")}>
            Voltar
          </Button>
          <div style={{ marginTop: 20, maxWidth: "800px", width: "100%" }}>
            <Calendar fullscreen={false} style={{ width: "100%" }} />
          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center", marginTop: "auto" }}>© 2024 Todos os direitos reservados.</Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default Calendario;