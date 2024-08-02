import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () =>{ 
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()
            if(email === 'socorro@deus.com' && senha === 'socorro123'){
                //manda para a home
                navigate ('/')

            }

            alert('Email e/ou senha incorretos')
    }

    return (
        <>

        <from onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
            <input type="password" placeholder="Senha" value={senha} onChange={(e)=> setSenha(e.target.value)} required/>  
            <button type="submit">Entrar</button>

        </from>

        </>
    )

}

export default Login