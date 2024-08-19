import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Header/Header'; 
import './local.css';

const Local = () => {
    const [locais, setLocais] = useState([]);
    const navigate = useNavigate();
    
    const fetchLocais = async () => {
        try {
            const token = localStorage.getItem('token');
            
            const api = axios.create({
                baseURL: 'http://localhost:9000',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const response = await api.get('/local');
            setLocais(response.data);
        } catch (error) {
            console.error('Erro ao buscar locais:', error);
        }
    };

    useEffect(() => {
        fetchLocais();
    }, []);

    const handleCadastro = () => {
        navigate('/cadastroLocal');
    };

    const handleDelete = async (localId) => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('usuario_Id');
            
            if (!token || !userId) {
                console.log("Token ou usuario_Id não encontrados!");
                return;
            }
    
            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
                params: { usuario_id: userId }
            };
    
            const response = await axios.delete(`http://localhost:9000/local/${localId}`, config);
            alert('Local excluido com sucesso!');
            
            fetchLocais();
        } catch (error) {
            alert('Você não tem permissão para excluir esse local:', error.response ? error.response.data.message : error.message);
        }
    };

    const handleEdit = (id) => {
        navigate(`/editarLocal/${id}`);
    };

    return (
        <div className="container-geral">
            <Header /> 

            <div className="container-locais" style={{ marginLeft: '200px', padding: '20px' }}>
                <h1 className="titulo-locais">Lista de Locais</h1>
                <button className="btn-cadastro" onClick={handleCadastro}>Cadastrar Novo Local</button>
                <ul className="lista-locais">
                    {locais.map(local => (
                        <li key={local.id} className="item-local">
                            {local.nome}
                            <div className="container-botoes">
                                <button className="btn-editar" onClick={() => handleEdit(local.id)}>
                                    <i className="fas fa-edit"></i> Editar
                                </button>
                                <button className="btn-excluir" onClick={() => handleDelete(local.id)}>
                                    <i className="fas fa-trash"></i> Excluir
                                </button>
                                <button className="btn-mapa" onClick={() => {
                                    window.open(`https://www.google.com/maps?q=${local.latitude},${local.longitude}`, '_blank');
                                }}>
                                    <i className="fas fa-map-marker-alt"></i> Ver no Google Maps
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Local;




