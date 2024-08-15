import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './cadastroLocais.css'

const CadastroLocal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:9000/local', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Local cadastrado com sucesso:', response.data);
      navigate('/local');
    } catch (error) {
      alert('Erro ao cadastrar o local, verifique o CEP:', error);
    }
  };

  return (
    <div className="cadastro-container">
      <h2 className="cadastro-titulo">Cadastrar Novo Local</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form">
        <div className="cadastro-div">
          <label>Nome do Local:</label>
          <input 
            type="text" 
            {...register('nome', { required: 'O nome é obrigatório' })} 
          />
          {errors.nome && <span>{errors.nome.message}</span>}
        </div>

        <div className="cadastro-div">
          <label>Descrição:</label>
          <textarea 
            {...register('descricao')} 
          />
        </div>

        <div className="cadastro-div">
          <label>CEP:</label>
          <input 
            type="text" 
            {...register('cep', { required: 'O CEP é obrigatório' })} 
          />
          {errors.cep && <span>{errors.cep.message}</span>}
        </div>

        <div className="cadastro-div">
          <label>Prática Esportiva:</label>
          <input 
            type="text" 
            {...register('pratica_esportiva', { required: 'A prática esportiva é obrigatória' })} 
          />
          {errors.pratica_esportiva && <span>{errors.pratica_esportiva.message}</span>}
        </div>

        <button type="submit">Cadastrar Local</button>
      </form>
    </div>
  );
};

export default CadastroLocal;


