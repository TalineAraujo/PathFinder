import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';
import api from '../../api/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await api.post('/login', { email, senha });
            const { token, usuarioId } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('usuarioId', usuarioId);
            navigate('/');
        } catch (error) {
            console.log('Acesso negado:', error.response?.data?.message);
            alert('Email ou senha incorreto!');
        }
    }

    return (
        <div className="login-container">

            <div className="login-imagem">
                <img src="/src/assets/pathfinder.png" alt="Natureza" />
                <div className="login-imagem-overlay">
                    <h3>Desbrave e compartilhe as belezas do Brasil</h3>
                    <p>Encontre trilhas, locais e experiências únicas na natureza.</p>
                </div>
            </div>

            <div className="login-form">
                <div className="login-form-inner">
                    <h2>Bem-vindo</h2>
                    <p className="login-subtitle">Acesse sua conta para continuar explorando.</p>
                    <hr className="login-divider" />

                    <form onSubmit={handleSubmit}>
                        <div className="login-field">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="login-input"
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="senha">Senha</label>
                            <input
                                id="senha"
                                type="password"
                                placeholder="••••••••"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="login-input"
                            />
                        </div>

                        <button type="submit" className="login-btn login-btn--primary">
                            Entrar
                        </button>
                        <button type="button" className="login-btn login-btn--outline" onClick={() => navigate('/cadastro')}>
                            Criar conta
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Login;
