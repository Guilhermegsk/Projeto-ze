import React, { useState } from "react";
import {
  Layout,
  Button,
  Typography,
  Calendar,
  ConfigProvider,
  Card,
  Spin,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ptBR from "antd/lib/locale/pt_BR";
import dayjs from "dayjs";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Calendario = () => {
  const navigate = useNavigate();
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const aoSelecionarData = async (date) => {
    const dataFormatada = date.format("DD-MM-YYYY"); // formato esperado pela API
    setDataSelecionada(date);
    setCarregando(true);
    setEventos([]); // limpa eventos enquanto carrega

    try {
      const response = await fetch(`http://localhost:3000/api/datas?data=${dataFormatada}`);
      const data = await response.json();

      setEventos(data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      setEventos([]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <ConfigProvider locale={ptBR}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            position: "fixed",
            width: "100%",
            zIndex: 1000,
            textAlign: "center",
          }}
        >
          <Title level={3} style={{ color: "white", margin: 0 }}>
            Calendário
          </Title>
        </Header>

        <Content
          style={{
            marginTop: 64,
            padding: "50px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Button
            type="default"
            icon={<LeftOutlined />}
            onClick={() => navigate("/")}
          >
            Voltar
          </Button>

          <div style={{ marginTop: 20, maxWidth: "800px", width: "100%" }}>
            <Calendar
              fullscreen={false}
              style={{ width: "100%" }}
              onSelect={aoSelecionarData}
            />
          </div>

          {dataSelecionada && (
            <Card
              title={`Informações do dia ${dataSelecionada.format("DD/MM/YYYY")}`}
              style={{
                marginTop: 30,
                width: "100%",
                maxWidth: "800px",
                minHeight: 150, // evita bug visual se estiver vazio
              }}
            >
              {carregando ? (
                <div style={{ textAlign: "center", padding: 20 }}>
                  <Spin />
                </div>
              ) : eventos.length > 0 ? (
                eventos.map((evento, index) => (
                  <div key={index} style={{ marginBottom: 12 }}>
                    <Paragraph>
                      <strong>{evento.evento}</strong>
                    </Paragraph>
                  </div>
                ))
              ) : (
                <Paragraph>Nenhum evento encontrado para essa data.</Paragraph>
              )}
            </Card>
          )}
        </Content>

        <Footer style={{ textAlign: "center", marginTop: "auto" }}>
          © 2024 Todos os direitos reservados.
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default Calendario;
