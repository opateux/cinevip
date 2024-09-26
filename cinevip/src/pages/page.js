import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import MovieForm from '../components/MovieForm';

export default function Home() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const res = await axios.get('http://localhost:8080/movies');
    setMovies(res.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Cadastro de Filmes</h1>
      <MovieForm onSuccess={fetchMovies} />
      <MovieList movies={movies} />
    </div>
  );
}
