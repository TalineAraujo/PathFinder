import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';


const Login = () =>{ 
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()
            if(email === 'socorro@deus.com' && senha === 'socorro123'){
                //manda para a home
                navigate ('/dashbord')

            }

            alert('Email e/ou senha incorretos')
    }

    return (
        <div className="login-container">

            <div className="login-imagem">
            <img src="/src/assets/pathfinder.png" alt="imagem de fundo" />
            </div>
        <div className="login-form">
        <form onSubmit={handleSubmit}>

            <h2>LOGIN</h2>
            <p>Entre e desbrave as belezas do nosso Brasil!</p>

            <div className="form-group">
                <label htmlFor="email"> Email </label>
                <input id="email" type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required
                className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="senha"> Senha </label>
                <input id="senha" type="password" placeholder="Senha" value={senha} onChange={(e)=> setSenha(e.target.value)} required
                className="form-control"
                /> 
            </div>

            <button type="submit" className="btn btn-primary">Entrar</button>
            <button type="button" className="btn btn-secondary">Cadastrar-se</button>

        </form>
        </div>
        </div>
    );

}

export default Login