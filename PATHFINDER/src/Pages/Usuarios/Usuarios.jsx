import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './usuarios.css';
import Header from '../../Components/Header/Header';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await api.get('/usuario');
                setUsuarios(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Erro ao buscar usuários');
                console.error(err);
            }
        };
        fetchUsuarios();
    }, []);

    return (
        <div className="usuarios-page">
            <Header />
            <div className="usuarios-container">
                <h1>Usuários</h1>
                {error && <p className="error-msg">{error}</p>}
                <div className="table-card">
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
        </div>
    );
};

export default Usuarios;
