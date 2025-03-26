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

      <section id="sobre">
        <h2>Sobre Nós</h2>
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