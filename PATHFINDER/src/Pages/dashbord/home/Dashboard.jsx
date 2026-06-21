import React, { useState, useEffect } from 'react';
import Header from '../../../Components/Header/Header';
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import './dashboard.css';
import api from '../../../api/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [locais, setLocais] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  const loggedUserId = localStorage.getItem('usuarioId');

  const fetchData = async () => {
    try {
      const [usuariosRes, locaisRes] = await Promise.all([
        api.get('/usuario'),
        api.get('/local'),
      ]);
      setUsuarios(usuariosRes.data);
      setLocais(locaisRes.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (localId) => {
    try {
      await api.delete(`/local/${localId}`);
      fetchData();
    } catch (error) {
      alert('Erro ao excluir o local.');
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <h1>Dashboard</h1>

        <div className="cards-container">
          <div className="card">
            <div className="card-content">
              <h2>Usuários</h2>
              <p className="count">{usuarios.length}</p>
              <FaUser className="icon" />
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h2>Locais</h2>
              <p className="count">{locais.length}</p>
              <FaMapMarkerAlt className="icon" />
            </div>
          </div>
        </div>

        <div className="list-container">
          <h2>Locais</h2>
          <p>Listagem de todas as localidades cadastradas</p>
          <table>
            <thead>
              <tr>
                <th>Local</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {locais.map((local) => (
                <tr key={local.id}>
                  <td>{local.nome}</td>
                  <td>
                    {String(local.usuarioId) === String(loggedUserId) && (
                      <div className="acoes-botoes">
                        <button className="btn-editar" onClick={() => navigate(`/editarLocal/${local.id}`)}>Editar</button>
                        <button className="btn-excluir" onClick={() => handleDelete(local.id)}>Excluir</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="list-container" style={{ marginTop: '28px' }}>
          <h2>Usuários</h2>
          <p>Listagem de todos os usuários cadastrados</p>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
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
