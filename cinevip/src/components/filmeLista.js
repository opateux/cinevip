const MovieList = ({ movies }) => {
    return (
      <div>
        <h2>Lista de Filmes</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <strong>{movie.title}</strong> ({movie.year}) - {movie.director} - Gênero: {movie.genre.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MovieList;
  