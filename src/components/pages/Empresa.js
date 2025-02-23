import React from "react";
import styles from "./Empresa.module.css"; 

function Empresa() {
  return (
    <div className={styles.empresa}>
      {/* Seção de Cabeçalho */}
      <header className={styles.header}>
        <h1>Sobre Nossa Empresa</h1>
        <p>Conheça mais sobre quem somos e o que fazemos.</p>
      </header>

      {/* Seção de Informações */}
      <section className={styles.informacoes}>
        <h2>Nossa História</h2>
        <p>
          Fundada em 2010, nossa empresa começou com a missão de transformar
          ideias em soluções inovadoras. Ao longo dos anos, crescemos e nos
          tornamos referência no mercado.
        </p>
      </section>

      {/* Seção de Equipe */}
      <section className={styles.equipe}>
        <h2>Nossa Equipe</h2>
        <div className={styles.membros}>
          <div className={styles.membro}>
            <img src="./membros/member1.jpeg" alt="Membro 1" />
            <h3>Adelson Saguate</h3>
            <p>Engenheiro de Software</p>
          </div>
          {/* <div className={styles.membro}>
            <img src="logo512.png" alt="Membro 2" />
            <h3>Maria Souza</h3>
            <p>Diretora de Operações</p>
          </div> */}
        </div>
      </section>

      {/* Seção de Estatísticas */}
      <section className={styles.estatisticas}>
        <h2>Nossos Números</h2>
        <div className={styles.numeros}>
          <div className={styles.numero}>
            <h3>+8</h3>
            <p>Projetos Concluídos</p>
          </div>
          <div className={styles.numero}>
            <h3>+5</h3>
            <p>Clientes Satisfeitos</p>
          </div>
          <div className={styles.numero}>
            <h3>3 Anos</h3>
            <p>No Mercado</p>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className={styles.depoimentos}>
        <h2>O Que Dizem Sobre Nós</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <p>
              "A empresa superou todas as nossas expectativas. Profissionais
              altamente qualificados e comprometidos!"
            </p>
            <h4>Cliente A</h4>
          </div>
          <div className={styles.card}>
            <p>
              "Trabalhar com eles foi uma experiência incrível. Recomendo a
              todos!"
            </p>
            <h4>Cliente B</h4>
          </div>
          {/* Adicione mais depoimentos aqui */}
        </div>
      </section>
    </div>
  );
}

export default Empresa;
