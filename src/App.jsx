import React, { useState } from "react";
import Demo from "./Demo.jsx";
import { model, guide } from "./content.js";
import logo from "../assets/lofrano.svg";

export default function App() {
  const [revision, setRevision] = useState(0);
  return (
    <>
      <a className="project-skip" href="#demo-top">
        Pular para a demonstração
      </a>
      <header className="project-bar">
        <a
          className="project-brand"
          href="https://lofranotecnologia.com.br"
          aria-label="LOFRANO TECNOLOGIA — site oficial"
        >
          <img src={logo} alt="LOFRANO TECNOLOGIA" width="164" height="32" />
        </a>
        <nav aria-label="Projeto aberto">
          <a href={model.reference}>Referência publicada</a>
          <a href={model.github}>Código no GitHub</a>
          <button
            type="button"
            onClick={() => setRevision((value) => value + 1)}
          >
            Reiniciar demonstração
          </button>
        </nav>
      </header>
      <p className="project-notice">
        <strong>
          {model.name} · {model.sector}.
        </strong>{" "}
        Conceito fictício com dados de exemplo. Interações locais; nenhuma
        compra, inscrição ou reserva real.
      </p>
      <main aria-label={model.name + " — demonstração"}>
        <Demo key={revision} />
      </main>
      <section className="project-guide" aria-labelledby="guide-heading">
        <h2 id="guide-heading">Conheça a experiência.</h2>
        <p>{guide.intro}</p>
        <h3>Como explorar</h3>
        <ol>
          {guide.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <h3>Para o seu projeto</h3>
        <p>{guide.planning}</p>
        <h3>Use este código como ponto de partida</h3>
        <p>
          O projeto tem licença MIT, fontes legíveis e testes dos fluxos
          demonstrativos. Consulte o README para instalar, personalizar e
          conhecer os limites. <a href={model.github}>Explorar o repositório</a>
          .
        </p>
      </section>
      <footer className="project-footer">
        <span>© 2026 LOFRANO TECNOLOGIA · Modelo open source</span>
        <a href="./THIRD_PARTY_NOTICES.md">Licenças e atribuições</a>
        <a href="https://lofranotecnologia.com.br/criar-projeto">
          Conversar sobre meu projeto
        </a>
      </footer>
    </>
  );
}
