import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { FaArrowLeft } from 'react-icons/fa';
import './cadastroLocais.css';

const CadastroLocal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post('/local', data);
      alert('Local cadastrado com sucesso!');
      navigate('/local');
    } catch (error) {
      const msg = error.response?.data?.message || 'Verifique o CEP e tente novamente.';
      alert(`Erro ao cadastrar o local: ${msg}`);
    }
  };

  return (
    <div className="cadastrolocal-page">
      <Header />
      <div className="cadastrolocal-content">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar
        </button>

        <div className="cadastrolocal-card">
          <h2>Cadastrar Novo Local</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="cadastro-form">
            <div className="cadastro-div">
              <label>Nome do Local</label>
              <input
                type="text"
                placeholder="Ex: Trilha da Serra"
                {...register('nome', { required: 'O nome é obrigatório' })}
              />
              {errors.nome && <span>{errors.nome.message}</span>}
            </div>

            <div className="cadastro-div">
              <label>Descrição</label>
              <textarea
                placeholder="Descreva o local..."
                {...register('descricao')}
              />
            </div>

            <div className="cadastro-div">
              <label>CEP</label>
              <input
                type="text"
                placeholder="Somente números"
                maxLength={8}
                {...register('cep', { required: 'O CEP é obrigatório' })}
              />
              {errors.cep && <span>{errors.cep.message}</span>}
            </div>

            <button type="submit">Cadastrar Local</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroLocal;
