import React, { useState, useEffect } from 'react';
import styles from './Contacto.module.css';

function Contacto() {
  const [coordenadas, setCoordenadas] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    // Verifica se o navegador suporta a API de Geolocalização
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Atualiza o estado com as coordenadas obtidas
          setCoordenadas({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    } else {
      console.error('Geolocalização não suportada pelo navegador.');
    }
  }, []);

  return (
    <div className={styles.contacto}>
      {/* Seção de Cabeçalho */}
      <header className={styles.header}>
        <h1>Contacte-Nos</h1>
        <p>Estamos aqui para ajudar. Entre em contacto connosco!</p>
      </header>

      {/* Seção de Informações de Contacto */}
      <section className={styles.informacoes}>
        <h2>Informações de Contacto</h2>
        <div className={styles.detalhes}>
          <div className={styles.item}>
            <h3>Telefone</h3>
            <p>+351 123 456 789</p>
          </div>
          <div className={styles.item}>
            <h3>E-mail</h3>
            <p>contacto@empresa.com</p>
          </div>
          <div className={styles.item}>
            <h3>Endereço</h3>
            <p>Rua da Empresa, 123, Lisboa, Portugal</p>
          </div>
        </div>
      </section>

      {/* Seção de Formulário de Contacto */}
      <section className={styles.formulario}>
        <h2>Envie-nos uma Mensagem</h2>
        <form>
          <div className={styles.campo}>
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome" required />
          </div>
          <div className={styles.campo}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.campo}>
            <label htmlFor="mensagem">Mensagem</label>
            <textarea id="mensagem" name="mensagem" rows="5" required></textarea>
          </div>
          <button type="submit" className={styles.botao}>
            Enviar Mensagem
          </button>
        </form>
      </section>

      {/* Seção de Mapa */}
      <section className={styles.mapa}>
        <h2>Onde Estamos</h2>
        {coordenadas.latitude && coordenadas.longitude ? (
          <iframe
            title="Mapa da Localização Atual"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.5970!2d${coordenadas.longitude}!3d${coordenadas.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQzJzIxLjAiTiA5wrAwOCczMS4wIlc!5e0!3m2!1spt-BR!2sbr!4v1630000000000!5m2!1spt-BR!2sbr`}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        ) : (
          <p>Carregando mapa...</p>
        )}
      </section>
    </div>
  );
}

export default Contacto;