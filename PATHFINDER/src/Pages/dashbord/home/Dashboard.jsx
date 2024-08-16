import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Header/Header'; 
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import './dashboard.css';
import axios from 'axios'; 



const Dashboard = () => {
  const [usuarioCard, setUsuarioCard] = useState(0);
  const [locaisCard, setLocaisCard] = useState(0);
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    // Função para obter o token do localStorage
    const getToken = () => {
      const token = localStorage.getItem('token');
      console.log("Token obtido:", token); // Verifique se o token está sendo retornado
      return token;
    };

    // Função para buscar os dados
    const fetchData = async () => {
      try {
        // Configuração do Axios para o backend
        const api = axios.create({
          baseURL: 'http://localhost:9000', // URL base do seu backend
          timeout: 10000, // Tempo máximo de espera por uma resposta
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`, // Adiciona o token ao cabeçalho
          },
        });

        // Fetching usuários
        const usuariosResponse = await api.get('/usuarios');
        const usuarios = usuariosResponse.data;

        // Fetching todos os locais
        const locaisResponse = await api.get('/local'); 
        const locais = locaisResponse.data;

        
        setUsuarioCard(usuarios.length);
        setLocaisCard(locais.length); 
        setLocais(locais); 

      } catch (error) {
        console.error('Erro ao buscar dados:', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="dashboard-container">
    <Header />
    <div className="dashboard-content">
  
      <h1>Dashboard</h1>
  
     
      <div className="cards-container">
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
  
    
      <div className="list-container">
        <h2>Locais</h2>
        <p>Listagem das localidades cadastradas</p>
        <table>
          <thead>
            <tr>
              <th>Local</th>
            </tr>
          </thead>
          <tbody>
            {locais.map((local, index) => (
              <tr key={index}>
                <td>{local.nome}</td> {/* Exibe apenas o nome do local */}
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



