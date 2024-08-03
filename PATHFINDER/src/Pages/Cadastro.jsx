import { useState } from "react";
import { useNavigate} from 'react-router-dom';
// import axios from 'axios'; 

const Cadastro = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacaoSenha, setconfirmacaoSenha] = useState('');
    const navigate = usenavigate();


    const handleSignup = (e) => {
        e.preventDefault ();
        if (senha !== confirmacaoSenha){
            alert('As senhas estão incorreta');
            return;
        }

        console.log('Usuario cadastrado com sucesso:', {email, senha});

        navigate('/login');
        
     };

    return (
        <div>

            <h2>Cadastro</h2>
            <form onSubmit={handleSignup}>

                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />  
                </div>

                <div>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required /> 
                </div>

                <div>
                    <label>Confirme a senha:</label>
                    <input type="password" value={confirmacaoSenha} onChange={(e) => setconfirmacaoSenha(e.target.value)} required />
                </div>

                <button type="submit">Cadastrar</button>

            </form>

                 </div>
    )

}
export default Cadastro;

