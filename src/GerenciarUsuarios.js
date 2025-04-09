import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Typography,
  Popconfirm,
  Card,
  Space,
  Row,
  Col,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();
  const [mostrarTabela, setMostrarTabela] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchContador();
  }, []);

  const fetchContador = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/count");
      const data = await response.json();
      setUserCount(data.count);
    } catch (err) {
      console.error(err);
      message.error("Erro ao contar usuários");
    }
  };

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();

      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        console.error("Resposta inesperada da API:", data);
        message.error("Erro ao processar usuários (formato inválido)");
      }
    } catch (error) {
      console.error(error);
      message.error("Erro ao buscar usuários");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });
      message.success("Usuário deletado com sucesso");
      fetchUsuarios();
      fetchContador();
    } catch {
      message.error("Erro ao deletar usuário");
    }
  };

  const openModal = (user = null) => {
    setIsEdit(!!user);
    setCurrentUser(user);
    form.setFieldsValue(user || { nome: "", email: "", password: "", role: "normal" });
    setModalVisible(true);
  };

  const handleFinish = async (values) => {
    try {
      const method = isEdit ? "PUT" : "POST";
      const endpoint = isEdit
        ? `http://localhost:3000/api/users/${currentUser.id}`
        : "http://localhost:3000/api/users";

      await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      message.success(`Usuário ${isEdit ? "atualizado" : "cadastrado"} com sucesso`);
      setModalVisible(false);
      fetchUsuarios();
      fetchContador();
    } catch {
      message.error("Erro ao salvar usuário");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Nome", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Ações",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openModal(record)} />
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const usuariosFiltrados = usuarios.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            style={{ backgroundColor: "#f0f2f5", textAlign: "center" }}
            bordered={false}
          >
            <Title level={2}>
              <TeamOutlined /> {userCount}
            </Title>
            <p style={{ fontSize: 16 }}>Usuários cadastrados</p>
          </Card>
        </Col>
        <Col span={16} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Button
            type="primary"
            icon={<UnorderedListOutlined />}
            onClick={() => {
              setMostrarTabela(true);
              fetchUsuarios();
            }}
          >
            Listar Usuários
          </Button>
          <Button
            type="default"
            icon={<PlusOutlined />}
            onClick={() => openModal()}
          >
            Cadastrar Usuário
          </Button>
        </Col>
      </Row>

      {mostrarTabela && (
        <div style={{ marginTop: 32 }}>
          <Input.Search
            placeholder="Buscar por nome ou email"
            allowClear
            enterButton="Buscar"
            style={{ width: 300, marginBottom: 16 }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Table
            columns={columns}
            dataSource={usuariosFiltrados}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}

      <Modal
        title={isEdit ? "Editar Usuário" : "Cadastrar Novo Usuário"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        okText={isEdit ? "Salvar" : "Cadastrar"}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Digite o nome" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Digite um email válido" }]}
          >
            <Input />
          </Form.Item>
          {!isEdit && (
            <Form.Item
              label="Senha"
              name="password"
              rules={[{ required: true, message: "Digite a senha" }]}
            >
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item
            label="Função"
            name="role"
            rules={[{ required: true, message: "Selecione a role" }]}
          >
            <Select>
              <Option value="normal">Normal</Option>
              <Option value="diretoria">Diretoria</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GerenciarUsuarios;
