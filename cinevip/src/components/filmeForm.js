import { useState, useEffect } from 'react';
import axios from 'axios';

const MovieForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [director, setDirector] = useState('');
  const [genreId, setGenreId] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await axios.get('http://localhost:8080/genres');
      setGenres(res.data);
    };
    fetchGenres();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !year || !releaseDate || !director || !genreId) return;

    try {
      await axios.post('http://localhost:8080/movies', {
        title,
        year: parseInt(year),
        releaseDate,
        genreId: parseInt(genreId),
        director,
      });
      setTitle('');
      setYear('');
      setReleaseDate('');
      setDirector('');
      setGenreId('');
      onSuccess(); // Chama a função para atualizar a lista de filmes
    } catch (error) {
      console.error('Erro ao cadastrar filme:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar Filme</h3>
      <input
        type="text"
        placeholder="Título do filme"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Ano"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Data de lançamento"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Diretor"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
        required
      />
      <select
        value={genreId}
        onChange={(e) => setGenreId(e.target.value)}
        required
      >
        <option value="">Selecione um gênero</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default MovieForm;
