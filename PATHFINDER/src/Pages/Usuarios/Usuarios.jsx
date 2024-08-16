import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './usuarios.css'; 
import Header from '../../Components/Header/Header'; // Certifique-se de que o caminho esteja correto

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const token = localStorage.getItem('token');
                
                const response = await axios.get('http://localhost:9000/usuarios', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUsuarios(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Erro ao buscar usuários');
                console.error(err);
            }
        };

        fetchUsuarios();
    }, []);

    return (
        <div>
            <Header /> {/* Adicionando o Header */}
            <div className="usuarios-container">
                <h1>Lista de Usuários</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            
                            <th>Endereço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                
                                <td>{usuario.endereco}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Usuarios;
