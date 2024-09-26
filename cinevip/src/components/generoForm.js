import { useState } from 'react';
import axios from 'axios';

const GenreForm = ({ onSuccess }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      await axios.post('http://localhost:8080/genres', { name });
      setName('');
      onSuccess(); // Chama a função para atualizar a lista de gêneros
    } catch (error) {
      console.error('Erro ao cadastrar gênero:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar Gênero</h3>
      <input
        type="text"
        placeholder="Nome do gênero"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default GenreForm;
