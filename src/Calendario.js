import React from 'react';
import { useEffect, useState} from "react";
import logo from "./assets/images/logo.png";
import { Link } from 'react-router-dom';

function Calendario() {
    window.scrollTo(0, 0);
    const getDataAtual = () => {
        const hoje = new Date();
        return {
          mesAtual: hoje.getMonth(),
          anoAtual: hoje.getFullYear(),
          diaAtual: hoje.getDate(),
        };
      };
    
      
      const [isMenuActive, setIsMenuActive] = useState(false);  
      
      const toggleMenu = () => {
        setIsMenuActive(prevState => !prevState);  
      };
      
    
      const { mesAtual, anoAtual, diaAtual } = getDataAtual();
      const [mes, setMes] = useState(mesAtual);
      const [ano, setAno] = useState(anoAtual);
      const [diaSelecionado, setDiaSelecionado] = useState(
        `${anoAtual}-${String(mesAtual + 1).padStart(2, "0")}-${String(diaAtual).padStart(2, "0")}`
      );
      const [programacao, setProgramacao] = useState({});
    
      useEffect(() => {
        fetch("/programacao.xml")
          .then((response) => response.text())
          .then((str) => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(str, "application/xml");
            const eventos = xml.getElementsByTagName("evento");
      
            const novaProgramacao = {};
            for (let evento of eventos) {
              const data = evento.getElementsByTagName("data")[0].textContent;
              const descricao = evento.getElementsByTagName("descricao")[0].textContent;
              if (!novaProgramacao[data]) {
                novaProgramacao[data] = [];
              }
              novaProgramacao[data].push(descricao);
            }
            setProgramacao(novaProgramacao);
          })
          .catch((err) => console.error("Erro ao carregar XML:", err));
      
      }, []);
    
      const gerarDiasDoMes = (mes, ano) => {
        const totalDias = new Date(ano, mes + 1, 0).getDate();
        return Array.from({ length: totalDias }, (_, i) => 
          `${ano}-${String(mes + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`
        );
      };
    
      const navegarMes = (incremento) => {
        let novoMes = mes + incremento;
        let novoAno = ano;
        if (novoMes > 11) {
          novoMes = 0;
          novoAno++;
        } else if (novoMes < 0) {
          novoMes = 11;
          novoAno--;
        }
        setMes(novoMes);
        setAno(novoAno);
      };
    
      const diasDoMes = gerarDiasDoMes(mes, ano);

    return (
        <div>
        {/* Navbar */}
        <nav>
          <img src={logo} alt="Minha Marca" className="logo" />
          <div className="hamburger" onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <ul className={`nav-links ${isMenuActive ? 'active' : ''}`}>
            <li><a href="#inicio">Início</a></li>
            <li><a href="#sobre-nos">Sobre Nós</a></li>
            <li><a href="#eventos">Eventos</a></li>
            <li><a href="#programacao">Programação</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
          
          
        </nav>

        <section id="calendario">
        <Link to="/">
            <button className="voltar-btn">Voltar à Programação</button>
          </Link>
          <h2>Calendário</h2>
          <p>Visualize os eventos e datas importantes abaixo:</p>

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
                onClick={() => setDiaSelecionado(data)}
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
            
            {/* Verifica se há múltiplos eventos para o dia */}
            {programacao[diaSelecionado] ? (
              programacao[diaSelecionado].map((descricao, index) => (
                <div key={index} className="card-evento">
                  <p>{descricao}</p>
                </div>
              ))
            ) : (
              <p>Nada programado para este dia.</p>
            )}
          </div>
        )}
        {/* <Link to="/programacao">
            <button className="voltar-btn">Voltar à Programação</button>
          </Link> */}
      </section>
      </div>
    );
  }
  
  export default Calendario;