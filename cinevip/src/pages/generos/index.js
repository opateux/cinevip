import { useEffect, useState } from 'react';
import axios from 'axios';
import GenreForm from '../../components/GenreForm';

const GenrePage = () => {
  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    const res = await axios.get('http://localhost:8080/genres');
    setGenres(res.data);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div>
      <h1>Cadastro de Gêneros</h1>
      <GenreForm onSuccess={fetchGenres} />
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenrePage;
