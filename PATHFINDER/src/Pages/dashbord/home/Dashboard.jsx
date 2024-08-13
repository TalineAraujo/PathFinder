import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Header/Header'; // Ajuste o caminho conforme necessário
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import './dashboard.css';
import axios from '../../../api/api'; // Certifique-se de que o caminho está correto

const Dashboard = () => {
  const [usuarioCard, setUsuarioCard] = useState(0);
  const [locaisCard, setLocaisCard] = useState(0);
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching usuários
        const usuariosResponse = await axios.get('/usuarios');
        const usuarios = usuariosResponse.data;

        // Fetching locais
        const locaisResponse = await axios.get('/local');
        const locais = locaisResponse.data;

        // Atualizando o estado
        setUsuarioCard(usuarios.length);
        setLocaisCard(locais.length);
        setLocais(locais);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div className="cards">
          <div className="card">
            <div className="card-content">
              <h2>Usuários</h2>
              <p className="count">{usuarioCard}</p>
              <FaUser className="icon" />
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h2>Locais</h2>
              <p className="count">{locaisCard}</p>
              <FaMapMarkerAlt className="icon" />
            </div>
          </div>
        </div>
        <div className="locations-list">
          <h2>Locais</h2>
          <p>Listagem dos localidade cadastrados</p>
          <table>
            <thead>
              <tr>
                <th>Local</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody>
              {locais.map((local, index) => (
                <tr key={index}>
                  <td>{local.nome}</td> 
                  <td>{local.usuario}</td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
