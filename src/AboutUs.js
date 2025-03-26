import React from 'react';
import { useEffect, useState} from "react";
import logo from "./assets/images/logo.png";
import { Link } from 'react-router-dom';


function AboutUs(){
    window.scrollTo(0, 0);

    const [isMenuActive, setIsMenuActive] = useState(false);  
          
    const toggleMenu = () => {
    setIsMenuActive(prevState => !prevState);  
    };

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
                <li><Link to="/#inicio">Início</Link></li>
                <li><Link to="/#sobre-nos">Sobre Nós</Link></li>
                <li><Link to="/#eventos">Eventos</Link></li>
                <li><Link to="/#programacao">Programação</Link></li>
                <li><Link to="/#contato">Contato</Link></li>
            </ul>
        </nav>
        <section id="linha-do-tempo">
            <Link to="/#sobre-nos">
                        <button className="voltar-btn">Voltar ao início</button>
                      </Link>
  <h2>Histórico</h2>
  <div className="container">
    <div className="timeline">
      <ul>
        <li>
          <div className="node"></div>
          <div className="content">
            <h3>Pastor: Nelson</h3>
            <p>Cônjuge: Celina</p>
            <p>Filhos: </p>
            <p>Período: xxxx - yyyy</p>
          </div>
        </li>
        <li>
          <div className="node"></div>
          <div className="content">
            <h3>Pastor: Eliézero</h3>
            <p>Cônjuge: Maria</p>
            <p>Filhos: </p>
            <p>Período: 2021 - 2023</p>
          </div>
        </li>
        <li>
          <div className="node"></div>
          <div className="content">
            <h3>Pastor: Marcos </h3>
            <p>Cônjuge: Gicely</p>
            <p>Filhos: </p>
            <p>Período: 2023 - Atual</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>



    </div>
      );

}

export default AboutUs;