import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'; 
import './editarLocal.css'

const EditarLocal = () => {
  const { register, handleSubmit, setValue } = useForm(); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { local_id } = useParams(); 

  useEffect(() => {
    const fetchLocalData = async () => {
      const token = localStorage.getItem('token');
      const usuarioId = localStorage.getItem('usuario_Id');

      if (!token || !usuarioId) {
        alert('Você precisa estar logado para editar um local.');
        navigate('/login');
        return;
      }

      if (!local_id) {
        alert('ID do local não encontrado.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:9000/local/${local_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            usuario_Id: usuarioId
          }
        });

        const { nome, descricao, cep } = response.data;
        setValue('nome', nome);
        setValue('descricao', descricao);
        setValue('cep', cep);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar os dados:', err);
        setLoading(false);
      }
    };

    fetchLocalData();
  }, [local_id, navigate, setValue]);

  const onSubmit = async (data) => {
    const { nome, descricao, cep } = data;
    const token = localStorage.getItem('token');
    const usuarioId = localStorage.getItem('usuario_Id');

    if (!token || !usuarioId) {
      alert('Você não está autorizado a editar este local.');
      navigate('/login');
      return;
    }

    if (!local_id) {
      alert('ID do local não encontrado.');
      return;
    }

    try {
      await axios.put(`http://localhost:9000/local/${local_id}`, {
        nome,
        descricao,
        cep
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          usuario_Id: usuarioId
        }
      });

      alert('Local atualizado com sucesso!');
      navigate('/');
    } catch (err) {
      console.error('Erro ao atualizar o local:', err);
      alert('Erro ao atualizar o local. Verifique se você tem permissão para editar.');
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Local</h1>
     
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            {...register('nome', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            {...register('descricao', { required: true })} 
          />
        </div>
        <div>
          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            id="cep"
            {...register('cep', { required: true })} 
          />
        </div>
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default EditarLocal;






