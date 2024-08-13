import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CadastroLocal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  

  const onSubmit = async (data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:9000/local', data, {
            headers: {
                Authorization: `Bearer ${token}` // Substitua `token` pela sua variável de token
            }
        });
        console.log('Local cadastrado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao cadastrar o local:', error);
    }
};
  return (
    <div>
      <h2>Cadastrar Novo Local</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome do Local:</label>
          <input 
            type="text" 
            {...register('nome', { required: 'O nome é obrigatório' })} 
          />
          {errors.nome && <span>{errors.nome.message}</span>}
        </div>

        <div>
          <label>Descrição:</label>
          <textarea 
            {...register('descricao')} 
          />
        </div>

        <div>
          <label>CEP:</label>
          <input 
            type="text" 
            {...register('cep', { required: 'O CEP é obrigatório' })} 
          />
          {errors.cep && <span>{errors.cep.message}</span>}
        </div>

        <div>
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

