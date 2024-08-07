import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importando axios
import './cadastro.css';  // Importando o arquivo CSS

const Cadastro = () => {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [endereco, setEndereco] = useState('');
    //const [numero, setNumero] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [confirmacaoSenha, setconfirmacaoSenha] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (senha !== confirmacaoSenha) {
            alert('As senhas estão incorretas');
            return;
        }

        try {
            const response = await axios.post('http://localhost:9000/usuarios', {
                nome,
                email,
                cpf,
                sexo,
                senha,
                data_nascimento,
                endereco
            });

            console.log('Usuário cadastrado com sucesso:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Ocorreu um erro ao cadastrar. Por favor, tente novamente.');
        }
    };

    return (
        <div className="cadastro-container">
            <div className="cadastro-form-container">
                <h2>Cadastre-se</h2>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />  
                    </div>
                    <div className="form-group">
                        <label>Data de nascimento:</label>
                        <input type="date" value={data_nascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>CPF:</label>
                        <input type="number" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Sexo:</label>
                        <select value={sexo} onChange={(e) => setSexo(e.target.value)} required>
                        <option value="">Selecione</option>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                        <option value="nao_informar">Prefiro não responder</option>
                        </select>
                     </div>

                    <div className="form-group">
                        <label>Endereço:</label>
                        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                    </div>
                    {/* <div className="form-group">
                        <label>Numero:</label>
                        <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} required />
                    </div> */}
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />  
                    </div>
                    <div className="form-group">
                        <label>Senha:</label>
                        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required /> 
                    </div>
                    <div className="form-group">
                        <label>Confirme a senha:</label>
                        <input type="password" value={confirmacaoSenha} onChange={(e) => setconfirmacaoSenha(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-cadastrar">Cadastrar</button>
                </form>
            </div>
            <div className="cadastro-imagem">
                <img src="/src/assets/pathfinder.png" alt="Imagem de fundo" />
            </div>
        </div>
    );
};

export default Cadastro;


