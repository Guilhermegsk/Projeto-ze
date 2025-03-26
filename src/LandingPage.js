import { useState} from "react";
import "./styles.css";
import logo from "./assets/images/logo.png"; // Importa a imagem do logo

export default function LandingPage() {

  const getDataAtual = () => {
    const hoje = new Date();
    const mesAtual = hoje.getMonth(); // 0 = Janeiro, 1 = Fevereiro, ...
    const anoAtual = hoje.getFullYear();
    const diaAtual = hoje.getDate();
    return { mesAtual, anoAtual, diaAtual };
  };

  // Estado para armazenar o mês, ano e o dia selecionado
  const { mesAtual, anoAtual, diaAtual } = getDataAtual();
  const [mes, setMes] = useState(mesAtual);
  const [ano, setAno] = useState(anoAtual);
  const [diaSelecionado, setDiaSelecionado] = useState(`${anoAtual}-${String(mesAtual + 1).padStart(2, "0")}-${String(diaAtual).padStart(2, "0")}`);

  // Dados estáticos de programação
  const programacao = {
    "2025-03-30": "Evento especial: Workshop de React!",
    "2025-03-31": "Palestra sobre UI/UX às 14h.",
    "2025-04-01": "Hackathon de programação - das 9h às 18h."
  };

  // Função para gerar os dias do mês
  const gerarDiasDoMes = (mes, ano) => {
    const data = new Date(ano, mes + 1, 0); // Último dia do mês
    const totalDias = data.getDate(); // Quantidade de dias no mês
    const dias = [];
    for (let i = 1; i <= totalDias; i++) {
      dias.push(`${ano}-${String(mes + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`);
    }
    return dias;
  };

  // Função para selecionar o dia clicado
  const selecionarDia = (data) => {
    setDiaSelecionado(data);
  };

  // Função para navegar entre os meses
  const navegarMes = (incremento) => {
    let novoMes = mes + incremento;
    let novoAno = ano;

    if (novoMes > 11) {
      novoMes = 0;
      novoAno += 1;
    } else if (novoMes < 0) {
      novoMes = 11;
      novoAno -= 1;
    }

    setMes(novoMes);
    setAno(novoAno);
  };

  const diasDoMes = gerarDiasDoMes(mes, ano);

  function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); // Alterna a classe 'active'
  }

  return (
    <div>
      {/* Navbar */}
      <nav>
        <img src={logo} alt="Minha Marca" className="logo" />
        <ul className="nav-links">
          <li><a href="#inicio">Início</a></li>
          <li><a href="#sobre-nos">Sobre Nós</a></li>
          <li><a href="#eventos">Eventos</a></li>
          <li><a href="#contato">Contato</a></li>
          <li><a href="#programacao">Programação</a></li>
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>

      {/* Seções */}
      <section id="inicio">
        <h2>Bem-vindo à Nossa Landing Page</h2>
      </section>

      <section id="sobre">
        <h2>Sobre Nós</h2>
      </section>

      <section id="eventos">
        <h2>Eventos</h2>
      </section>

      <section id="programacao">
        <h2>Programação</h2>

        {/* Navegação entre os meses */}
        <div className="navegacao-calendario">
          <button onClick={() => navegarMes(-1)} className="seta-nav">{'<'}</button>
          <h3>{`${mes + 1}/${ano}`}</h3>
          <button onClick={() => navegarMes(1)} className="seta-nav">{'>'}</button>
        </div>

        {/* Calendário */}
        <div className="calendario">
          {diasDoMes.map((data) => (
            <div key={data} className="dia-container">
              <button
                onClick={() => selecionarDia(data)}
                className={`dia ${programacao[data] ? "com-evento" : ""}`}
              >
                {data.split("-")[2]} {/* Exibe apenas o dia */}
              </button>
              {/* Bolinha abaixo dos dias com eventos */}
              {programacao[data] && <div className="evento-bolinha"></div>}
            </div>
          ))}
        </div>

        {/* Caixa de informações do evento */}
        {diaSelecionado && (
          <div className="info-box">
            <h3>Programação do Dia {diaSelecionado.split("-").reverse().join("/")}</h3>
            <p>{programacao[diaSelecionado] || "Nada programado para este dia."}</p>
          </div>
        )}
      </section>

      <section id="contato">
        <h2>Contato</h2>
      </section>
    </div>
  );
}