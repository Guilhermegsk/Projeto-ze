import React, { useState, useEffect , useRef } from "react";
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
const eventos = [evento1, evento2, evento3];



const LandingPage = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const scrollAmount = () => {
    const container = scrollRef.current;
    return container ? container.offsetWidth * 0.7 : 300;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    const interval = setInterval(() => {
      if (!container) return;

      const scrollAmount = container.offsetWidth;
      const maxScroll = container.scrollWidth - container.offsetWidth;

      if (Math.ceil(container.scrollLeft) >= maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 7000); // 7 segundos

    return () => clearInterval(interval);
  }, []);


  return (
    <Layout>
      {/* Navbar */}
      <Header style={{ position: "fixed", width: "100%", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Image src="https://via.placeholder.com/150x50" alt="Logo" preview={false} />
        
        {isMobile ? (
          <Button type="text" icon={<MenuOutlined />} onClick={() => setMenuVisible(true)} style={{ fontSize: "24px", color: "white" }} />
        ) : (
          <Menu mode="horizontal" theme="dark" style={{ flex: 1, justifyContent: "flex-end" }}>
            <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => navigate("/")}>Início</Menu.Item>
            <Menu.Item key="2" icon={<InfoCircleOutlined />} onClick={() => navigate("/sobre")}>Sobre Nós</Menu.Item>
            <Menu.Item key="3" icon={<CalendarOutlined />} onClick={() => navigate("/eventos")}>Eventos</Menu.Item>
            <Menu.Item key="4" icon={<PhoneOutlined />} onClick={() => navigate("/contato")}>Contato</Menu.Item>
            <Menu.Item key="5" icon={<FaSignInAlt />} onClick={() => navigate("/login")}>Login</Menu.Item>
          </Menu>
        )}
      </Header>

      <Drawer placement="right" onClose={() => setMenuVisible(false)} open={menuVisible} width={250}>
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
        <div style={{ margin: "60px 0", position: "relative" }}>
  <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
    Próximos Eventos
  </Title>

  {/* Setas manuais */}
  <Button
    icon={<LeftOutlined />}
    onClick={() => scrollRef.current.scrollBy({ left: -scrollAmount(), behavior: "smooth" })}
    style={{
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      borderRadius: "50%",
    }}
  />
  <Button
    icon={<RightOutlined />}
    onClick={() => scrollRef.current.scrollBy({ left: scrollAmount(), behavior: "smooth" })}
    style={{
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      borderRadius: "50%",
    }}
  />

  <div
    ref={scrollRef}
    style={{
      display: "flex",
      overflowX: "auto",
      scrollSnapType: "x mandatory",
      scrollBehavior: "smooth",
      gap: "24px",
      padding: "20px 40px",
      WebkitOverflowScrolling: "touch",
      scrollbarWidth: "thin",
    }}
  >
    {eventos.map((evento, index) => (
      <div
        key={index}
        style={{
          flex: "0 0 80%",
          scrollSnapAlign: "start",
          borderRadius: "10px",
          background: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          minWidth: "80%",
        }}
      >
        <Row gutter={24} align="middle" wrap>
          <Col xs={24} md={12}>
            <Image
              src={evento}
              alt={`Evento ${index + 1}`}
              preview={false}
              width="100%"
              height="auto"
              style={{
                objectFit: "cover",
                borderRadius: "10px 0 0 10px",
              }}
            />
          </Col>
          <Col xs={24} md={12}>
            <div style={{ padding: "30px" }}>
              <Title level={3}>{`Evento ${index + 1}`}</Title>
              <Paragraph style={{ fontSize: "16px", lineHeight: "1.6" }}>
                Um evento incrível para você! Conheça as novidades, faça networking e participe de experiências únicas.
              </Paragraph>
              <Button type="primary" size="large">Saiba Mais</Button>
            </div>
          </Col>
        </Row>
      </div>
    ))}
  </div>
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
      href="https://www.instagram.com/jeffbezos/"
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
