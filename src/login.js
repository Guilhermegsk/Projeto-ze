import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = async (values) => {
    setFieldErrors({});
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.status === 200) {
        const { token, user } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", user.role);

        message.success("Login bem-sucedido!");

        // 🔁 Redirecionar de acordo com o role
        if (user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setFieldErrors({
          email: data.message || "Email ou senha inválidos",
          password: " ",
        });
      }
    } catch (error) {
      setFieldErrors({
        email: "Erro ao conectar com o servidor. Tente novamente.",
      });
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5"
    }}>
      <Card
        style={{
          width: 350,
          padding: 20,
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
        }}
      >
        <Title level={3}>Bem-vindo!</Title>
        <Text type="secondary">Faça login para continuar</Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          style={{ marginTop: 20 }}
        >
          <Form.Item
            label="Email"
            name="email"
            validateStatus={fieldErrors.email ? "error" : ""}
            help={fieldErrors.email}
            rules={[{ required: true, message: "Digite seu email!" }]}
          >
            <Input placeholder="Digite seu email" autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            validateStatus={fieldErrors.password ? "error" : ""}
            help={fieldErrors.password}
            rules={[{ required: true, message: "Digite sua senha!" }]}
          >
            <Input.Password placeholder="Digite sua senha" autoComplete="new-password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block icon={<FaSignInAlt />}>
              Entrar
            </Button>
          </Form.Item>
        </Form>

        <Text type="secondary" style={{ cursor: "pointer" }}>
          Esqueceu a senha?
        </Text>

        <Button
          type="link"
          style={{ marginTop: 16 }}
          onClick={() => navigate("/")}
        >
          Voltar para a página inicial
        </Button>
      </Card>
    </div>
  );
};

export default Login;
