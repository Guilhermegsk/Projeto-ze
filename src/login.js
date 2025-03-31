import React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Login info:", values);
    // Simulação de login bem-sucedido
    navigate("/"); // Redireciona para a página inicial
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      height: "100vh", backgroundColor: "#f0f2f5"
    }}>
      <Card style={{ width: 350, padding: 20, textAlign: "center", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
        <Title level={3}>Bem-vindo!</Title>
        <Text type="secondary">Faça login para continuar</Text>
        <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 20 }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Digite seu email!" }]}
          >
            <Input type="email" placeholder="Digite seu email" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: "Digite sua senha!" }]}
          >
            <Input.Password placeholder="Digite sua senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block icon={<FaSignInAlt />}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
        <Text type="secondary" style={{ cursor: "pointer" }}>Esqueceu a senha?</Text>
      </Card>
    </div>
  );
};

export default Login;
