import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Typography,
  Card,
  Space,
  Row,
  Col,
  message,
} from "antd";
import {
  CalendarOutlined,
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  EditOutlined, DeleteOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;

const GerenciarProgramacao = () => {
  const [programacoes, setProgramacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchDate, setSearchDate] = useState(null);
  const [mostrarTabela, setMostrarTabela] = useState(false);
  const [count, setCount] = useState(0);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [programacaoSelecionada, setProgramacaoSelecionada] = useState(null);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/datas/count");
      const data = await response.json();
      setCount(data.count);
    } catch (err) {
      console.error(err);
      message.error("Erro ao contar programações");
    }
  };

  const fetchProgramacoes = async (data = null) => {
    setLoading(true);
    try {
      let url = "http://localhost:3000/api/datas";
      if (data) {
        url += `?data=${data}`;
      }

      const response = await fetch(url);
      const json = await response.json();

      if (Array.isArray(json)) {
        setProgramacoes(json);
      } else {
        message.error("Erro ao buscar programações");
      }
    } catch (err) {
      console.error(err);
      message.error("Erro ao buscar programações");
    }
    setLoading(false);
  };

  const handleCadastrar = async (values) => {
    const dataFormatada = values.data.format("YYYY-MM-DD");
    const payload = { data: dataFormatada, evento: values.evento };

    try {
      if (modoEdicao && programacaoSelecionada) {
        await fetch(
          `http://localhost:3000/api/datas/${programacaoSelecionada.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        message.success("Programação atualizada com sucesso");
      } else {
        await fetch("http://localhost:3000/api/datas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        message.success("Programação cadastrada com sucesso");
      }

      setModalVisible(false);
      setModoEdicao(false);
      setProgramacaoSelecionada(null);
      fetchProgramacoes();
      fetchCount();
    } catch (err) {
      console.error(err);
      message.error("Erro ao salvar programação");
    }
  };

  const handleEditar = (registro) => {
    setModoEdicao(true);
    setProgramacaoSelecionada(registro);
    form.setFieldsValue({
      data: dayjs(registro.data),
      evento: registro.evento,
    });
    setModalVisible(true);
  };

  const handleExcluir = async (id) => {
    Modal.confirm({
      title: "Tem certeza que deseja excluir esta programação?",
      okText: "Sim",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          await fetch(`http://localhost:3000/api/datas/${id}`, {
            method: "DELETE",
          });
          message.success("Programação excluída com sucesso");
          fetchProgramacoes();
          fetchCount();
        } catch (err) {
          console.error(err);
          message.error("Erro ao excluir programação");
        }
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Data",
      dataIndex: "data",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Evento",
      dataIndex: "evento",
    },
    {
      title: "Ações",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditar(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleExcluir(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card style={{ textAlign: "center" }}>
            <Title level={2}>
              <CalendarOutlined /> {count}
            </Title>
            <p style={{ fontSize: 16 }}>Total de Programações</p>
          </Card>
        </Col>

        <Col span={16} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Button
            type="primary"
            icon={<UnorderedListOutlined />}
            onClick={() => {
              fetchProgramacoes();
              setMostrarTabela(true);
            }}
          >
            Listar Programações
          </Button>

          <DatePicker
            format="DD-MM-YYYY"
            placeholder="Pesquisar por data"
            onChange={(date) => setSearchDate(date)}
          />
          <Button
            icon={<SearchOutlined />}
            onClick={() => {
              if (searchDate) {
                const formatted = searchDate.format("DD-MM-YYYY");
                fetchProgramacoes(formatted);
              } else {
                message.warning("Selecione uma data");
              }
            }}
          >
            Buscar
          </Button>

          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              form.resetFields();
              setModoEdicao(false);
              setProgramacaoSelecionada(null);
              setModalVisible(true);
            }}
          >
            Nova Programação
          </Button>
        </Col>
      </Row>

      {mostrarTabela && (
        <div style={{ marginTop: 32 }}>
          <Table
            columns={columns}
            dataSource={programacoes}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}

      <Modal
        title={modoEdicao ? "Editar Programação" : "Cadastrar Nova Programação"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setModoEdicao(false);
          setProgramacaoSelecionada(null);
        }}
        onOk={() => form.submit()}
        okText={modoEdicao ? "Salvar Alterações" : "Cadastrar"}
      >
        <Form form={form} layout="vertical" onFinish={handleCadastrar}>
          <Form.Item
            label="Data"
            name="data"
            rules={[{ required: true, message: "Selecione a data" }]}
          >
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>

          <Form.Item
            label="Evento"
            name="evento"
            rules={[{ required: true, message: "Digite o evento" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GerenciarProgramacao;
