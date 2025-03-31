import React, { useState } from "react";
import { Layout, Menu, Button, Typography, Card, Image, Carousel, Row, Col, Drawer } from "antd";
import {HomeOutlined, CalendarOutlined, InfoCircleOutlined, PhoneOutlined, MenuOutlined } from "@ant-design/icons";
import { FaSignInAlt, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Importação de imagens locais
import evento1 from "./assets/images/carrossel1.jpg";
import evento2 from "./assets/images/carrossel2.jpg";
import evento3 from "./assets/images/carrossel3.jpg";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);


  return (
    <Layout>
      {/* Navbar */}
      <Header style={{ position: "fixed", width: "100%", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Image src="https://via.placeholder.com/150x50" alt="Logo" preview={false} />
        <Button type="text" icon={<MenuOutlined />} onClick={() => setMenuVisible(true)} style={{ fontSize: "24px", color: "white" }} />
      </Header>
      
      {/* Drawer para Menu Mobile */}
      <Drawer
        placement="right"
        onClose={() => setMenuVisible(false)}
        open={menuVisible}
        width={250}
      >
        <Menu mode="vertical" theme="light">
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => navigate("/")}>Início</Menu.Item>
          <Menu.Item key="2" icon={<InfoCircleOutlined />} onClick={() => navigate("/sobre")}>Sobre Nós</Menu.Item>
          <Menu.Item key="3" icon={<CalendarOutlined />} onClick={() => navigate("/eventos")}>Eventos</Menu.Item>
          <Menu.Item key="4" icon={<PhoneOutlined />} onClick={() => navigate("/contato")}>Contato</Menu.Item>
          <Menu.Item key="5" icon={<FaSignInAlt />} onClick={() => navigate("/login")}>Login</Menu.Item>
        </Menu>
      </Drawer>

      <Content style={{ marginTop: 64, padding: "50px 20px" }}>
        {/* Seção Introdução */}
        <div style={{ textAlign: "center", padding: "100px 0", maxWidth: "600px", margin: "0 auto" }}>
          <Title>Bem-vindo à Nossa Landing Page</Title>
          <Paragraph>Conheça nossos eventos e programação.</Paragraph>
          <Button type="primary" size="large">Saiba Mais</Button>
        </div>

        {/* Seção Sobre Nós */}
        <div style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}>
          <Card title="Sobre Nós" style={{ marginBottom: 50 }}>
            <Paragraph>Somos uma equipe dedicada a proporcionar os melhores eventos para você!</Paragraph>
          </Card>
        </div>

        {/* Seção Eventos (Ajustada) */}
        <div style={{
          maxWidth: "1100px",
          margin: "50px auto",  // Aumento da margem para maior separação
          padding: "50px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          position: "relative"
        }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>Próximos Eventos</Title>
          
          <Carousel 
            autoplay 
            autoplaySpeed={7000}
            arrows
            prevArrow={<CustomPrevArrow />} 
            nextArrow={<CustomNextArrow />}
          >
             {[evento1, evento2, evento3].map((evento, index) => (
              <div key={index}>
                <Row gutter={24} align="middle">
                  <Col xs={24} md={12}>
                  <Image 
    src={evento} 
    alt={`Evento ${index + 1}`} 
    preview={false} 
    width="100%" 
    height="auto"  // Mantém a proporção da imagem
    style={{ 
      objectFit: "contain",  // Ajusta a imagem para que não seja cortada
      borderRadius: "10px" 
    }} 
  />
                  </Col>
                  <Col xs={24} md={12}>
                    <div style={{ padding: "30px" }}>
                      <Title level={2}>{`Evento ${index + 1}`}</Title>
                      <Paragraph style={{ fontSize: "18px", lineHeight: "1.6" }}>
                        Um evento incrível para você! Conheça as novidades, faça networking e participe de experiências únicas.
                      </Paragraph>
                      <Button type="primary" size="large">Saiba Mais</Button>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Carousel>
        </div>

        <div style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}>
          <Card title="Programação" style={{ marginBottom: 50 }}>
            <Paragraph>Veja todos os horários e datas dos próximos eventos!</Paragraph>
            <Button type="primary" onClick={() => navigate("/calendario")}>Ver Calendário</Button>
          </Card>
        </div>

        {/* Seção Contato */}
        <div style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}>
          <Card title="Contato" style={{ marginBottom: 50 }}>
            <Paragraph>Email: contato@evento.com</Paragraph>
            <Paragraph>Telefone: (11) 1234-5678</Paragraph>
          </Card>
        </div>

      </Content>

      <Footer style={{
  backgroundColor: "#001f3d", 
  height: "120px", 
  display: "flex",
  justifyContent: "flex-end", 
  alignItems: "center",
  paddingRight: "50px",
}}>
  <div style={{ display: "flex", gap: "20px" }}>
    <Button
      type="primary"
      shape="circle"
      icon={<FaInstagram size={24} />}
      size="large"
      style={{ backgroundColor: "#E4405F", border: "none" }}
      href="https://instagram.com/seu_perfil"
      target="_blank"
    />

    <Button
      type="primary"
      shape="circle"
      icon={<FaWhatsapp size={24} />}
      size="large"
      style={{ backgroundColor: "#25D366", border: "none" }}
      href="https://wa.me/seunumero"
      target="_blank"
    />
  </div>
</Footer>
    </Layout>
  );
};

// Setas personalizadas
const arrowStyle = {
  fontSize: "550px", 
  //background: "black", 
  borderRadius: "50%", 
  padding: "10px", 
  cursor: "pointer",
  color: "black",
  //boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)"
};

const CustomPrevArrow = (props) => (
  <LeftOutlined 
    {...props} 
    style={{ 
      ...arrowStyle, 
      position: "absolute", 
      left: "-70px", 
      top: "50%", 
      transform: "translateY(-50%)", 
      zIndex: 2 
    }} 
  />
);

const CustomNextArrow = (props) => (
  <RightOutlined 
    {...props} 
    style={{ 
      ...arrowStyle, 
      position: "absolute", 
      right: "-70px", 
      top: "50%", 
      transform: "translateY(-50%)", 
      zIndex: 2 
    }} 
  />
);

export default LandingPage;
