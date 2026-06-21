import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import './editarLocal.css';

const EditarLocal = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { local_id } = useParams();

  useEffect(() => {
    const fetchLocalData = async () => {
      if (!local_id) {
        alert('ID do local não encontrado.');
        setLoading(false);
        return;
      }
      try {
        const response = await api.get(`/local/${local_id}`);
        const { nome, descricao, cep, pratica_esportiva } = response.data;
        setValue('nome', nome);
        setValue('descricao', descricao);
        setValue('cep', cep);
        setValue('pratica_esportiva', pratica_esportiva);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar os dados:', err);
        setLoading(false);
      }
    };
    fetchLocalData();
  }, [local_id, navigate, setValue]);

  const onSubmit = async (data) => {
    const { nome, descricao, cep, pratica_esportiva } = data;
    if (!local_id) {
      alert('ID do local não encontrado.');
      return;
    }
    try {
      await api.put(`/local/${local_id}`, { nome, descricao, cep, pratica_esportiva });
      alert('Local atualizado com sucesso!');
      navigate('/local');
    } catch (err) {
      console.error('Erro ao atualizar o local:', err);
      alert('Erro ao atualizar o local. Verifique se você tem permissão para editar.');
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: 'var(--green-primary)', fontSize: '1rem' }}>
      Carregando...
    </div>
  );

  return (
    <div className="editar-local-page">
      <button className="btn-back btn-back--standalone" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Voltar
      </button>
      <div className="editar-local">
        <h1>Editar Local</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" {...register('nome', { required: true })} />
          </div>
          <div>
            <label htmlFor="descricao">Descrição</label>
            <input type="text" id="descricao" {...register('descricao', { required: true })} />
          </div>
          <div>
            <label htmlFor="cep">CEP</label>
            <input type="text" id="cep" {...register('cep', { required: true })} maxLength={8} />
          </div>
          <div>
            <label htmlFor="pratica_esportiva">Prática Esportiva</label>
            <input type="text" id="pratica_esportiva" {...register('pratica_esportiva', { required: true })} />
          </div>
          <button type="submit">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
};

export default EditarLocal;
