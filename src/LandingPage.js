import {useState, useEffect} from "react";
import "./styles.css";
import logo from "./assets/images/logo.png";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function LandingPage() {
  
  const [isMenuActive, setIsMenuActive] = useState(false);
  const location = useLocation();  
  
  const toggleMenu = () => {
    setIsMenuActive(prevState => !prevState);  
  };

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0); 
    }
  }, [location]);
  

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

      {/* Seções */}
      <section id="inicio">
        <h2>oi</h2>
      </section>

      <section id="sobre" className="sobre-nos">
        <div className="texto">
          <h2>Sobre Nós</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan, 
            nunc at posuere hendrerit, ligula felis facilisis quam, a dictum risus nunc non nulla. 
            Vestibulum eu sapien libero. Nullam accumsan dui et elit sodales, vel efficitur metus bibendum. 
            Integer nec sapien eget magna dictum luctus at at sapien. Phasellus sed dapibus metus. 
            Sed at lorem augue.
          </p>
        </div>
        <div className="botao-container">
        <Link to="/AboutUs">
          <button className="botao-about">Ver Detalhes</button>
        </Link>
        </div>
      </section>

      <section id="eventos">
        <h2>Eventos</h2>
      </section>

      <section id="programacao">
      <h2>Programação</h2>
      <p>Acompanhe nossa programação</p>
      
      <Link to="/calendario">
        <button className="calendario-btn">Ver Calendário</button>
      </Link>
    </section>
      <section id="contato">
        <h2>Contato</h2>
      </section>
    </div>
  );
}