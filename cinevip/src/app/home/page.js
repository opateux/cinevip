"use client";

import { useState } from 'react';

export default function MovieForm() {
  // Estados para armazenar os valores do formulário
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [genres, setGenres] = useState([
    'Aventura',
    'Ação',
    'Comédia',
    'Terror',
    'Suspense',
    'Drama',
    'Nacional',
    'Infantil'
  ]); // Gêneros iniciais

  // Estados para gerenciamento de filmes
  const [movies, setMovies] = useState([]); // Lista de filmes
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false); // Controle de visibilidade do modal de filmes
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle de visibilidade do modal de gêneros
  const [editingIndex, setEditingIndex] = useState(null); // Índice do filme sendo editado

  // Funções para abrir e fechar modais
  const openGenreModal = () => setIsModalOpen(true);
  const closeGenreModal = () => setIsModalOpen(false);
  const openMovieModal = () => {
    setIsMovieModalOpen(true);
    setEditingIndex(null); // Reseta a edição
  };
  const closeMovieModal = () => setIsMovieModalOpen(false);

  // Funções para gerenciamento de gêneros
  const addGenre = () => {
    const newGenre = prompt("Digite o novo gênero:");
    if (newGenre && !genres.includes(newGenre)) {
      setGenres([...genres, newGenre]);
    } else if (newGenre) {
      alert('Este gênero já existe.');
    }
  };

  const updateGenre = (oldGenre) => {
    const newGenre = prompt(`Editar gênero: ${oldGenre}`, oldGenre);
    if (newGenre && !genres.includes(newGenre)) {
      setGenres(genres.map(g => g === oldGenre ? newGenre : g));
    } else if (newGenre) {
      alert('Este gênero já existe.');
    }
  };

  const deleteGenre = (genreToDelete) => {
    if (window.confirm(`Tem certeza que deseja excluir o gênero "${genreToDelete}"?`)) {
      setGenres(genres.filter(g => g !== genreToDelete));
    }
  };

  // Funções para gerenciamento de filmes
  const addMovie = () => {
    const newMovie = {
      title: prompt("Digite o título do filme:"),
      year: prompt("Digite o ano do filme:"),
      releaseDate: prompt("Digite a data de lançamento do filme:"),
      genre: prompt("Digite o gênero do filme:"),
      director: prompt("Digite o nome do diretor do filme:"),
    };

    if (newMovie.title) {
      setMovies([...movies, newMovie]);
    }
  };

  const startEditingMovie = (index) => {
    setEditingIndex(index);
    const movie = movies[index];
    setTitle(movie.title);
    setYear(movie.year);
    setReleaseDate(movie.releaseDate);
    setGenre(movie.genre);
    setDirector(movie.director);
    openMovieModal();
  };

  const updateMovie = () => {
    if (editingIndex !== null) {
      const updatedMovie = {
        title,
        year,
        releaseDate,
        genre,
        director,
      };

      const updatedMovies = [...movies];
      updatedMovies[editingIndex] = updatedMovie;
      setMovies(updatedMovies);
      
      // Limpa os campos após a edição
      setTitle('');
      setYear('');
      setReleaseDate('');
      setGenre('');
      setDirector('');
      setEditingIndex(null);
      closeMovieModal();
    }
  };

  const deleteMovie = (index) => {
    if (window.confirm(`Tem certeza que deseja excluir o filme "${movies[index].title}"?`)) {
      setMovies(movies.filter((_, i) => i !== index));
    }
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Dados do formulário
    const movieData = { title, year, releaseDate, genre, director };
    
    // Envio dos dados para o backend
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
      });

      if (response.ok) {
        alert('Filme inserido com sucesso!');
        // Limpa os campos após a submissão
        setTitle('');
        setYear('');
        setReleaseDate('');
        setGenre('');
        setDirector('');
      } else {
        alert('Erro ao inserir o filme. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao enviar os dados.');
    }
  };

  // Função para redirecionar para a página de pesquisa de filmes
  const handleSearchMovies = () => {
    // Redirecionar para a página de pesquisa (por exemplo, "/search")
    window.location.href = '/search'; // Altere o caminho conforme necessário
  };

  return (
    <div className="movie-form">
      <h1>Cadastro de Filmes</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ano:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Lançamento:</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Gênero:</label>
          <div className="genre-select">
            <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
              <option value="">Selecione um gênero</option>
              {genres.map((g, index) => (
                <option key={index} value={g}>{g}</option>
              ))}
            </select>
            <button type="button" onClick={addGenre}>+</button>
            <button type="button" onClick={openGenreModal}>Gerenciar Gêneros</button>
            <button type="button" onClick={openMovieModal}>Gerenciar Filmes</button>
          </div>
        </div>
        <div className="form-group">
          <label>Diretor:</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Inserir</button>
          <button type="button" onClick={handleSearchMovies}>Pesquisar Filmes</button>
        </div>
      </form>

      {/* Modal de Gerenciamento de Gêneros */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Gerenciamento de Gêneros</h2>
            <ul>
              {genres.map((g, index) => (
                <li key={index}>
                  {g} 
                  <button type="button" onClick={() => updateGenre(g)}>Editar</button>
                  <button type="button" onClick={() => deleteGenre(g)}>Excluir</button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={addGenre}>Adicionar Novo Gênero</button>
            <button type="button" onClick={closeGenreModal}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal de Gerenciamento de Filmes */}
      {isMovieModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Gerenciamento de Filmes</h2>
            <ul>
              {movies.map((m, index) => (
                <li key={index}>
                  {m.title} - {m.year} 
                  <button type="button" onClick={() => startEditingMovie(index)}>Editar</button>
                  <button type="button" onClick={() => deleteMovie(index)}>Excluir</button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={addMovie}>Adicionar Novo Filme</button>
            <button type="button" onClick={closeMovieModal}>Fechar</button>
          </div>
        </div>
      )}


      {/* CSS do componente */}
      <style jsx>{`
        .movie-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
          border-radius: 1px;
          background-image: url('/path/to/your/background-image.jpg'); /* Imagem de fundo */
          background-size: cover;
          color:white ;
          font-family: 'Roboto', sans-serif;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }

        h1 {
          font-size: 28px;
          margin-bottom: 30px;
          text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.7);
        }

        form {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 500px;
          background-color: rgba(0, 0, 0, 0.7);
          padding: 20px;
          border-radius: 25px;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
        }

        .form-group {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 17px;
          margin-bottom: 5px;
        }

        input,
        select {
          padding: 5px;
          font-size: 15px;
          border: none;
          border-radius: 4px;
          margin-top: 5px;
          background-color: rgba(255, 255, 255, 0.9);
        }

        .genre-select {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .form-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        button {
          padding: 10px 15px;
          font-size: 14px;
          cursor: pointer;
          background-color: #ff5722; /* Cor do botão */
          color: white;
          border: none;
          border-radius: 100px;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #e64a19; /* Cor ao passar o mouse */
        }

        h2 {
          margin-top: 30px;
          font-size: 22px;
          text-align: center;
          color: #ff5722; /* Cor do título do modal */
        }

        ul {
          list-style-type: none;
          padding: 0;
          max-height: 200px;
          overflow-y: auto;
          margin: 10px 0;
        }

        li {
          margin: 10px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        li button {
          padding: 5px 10px;
          font-size: 12px;
          background-color: #2196F3; /* Cor do botão de editar/excluir */
        }

        li button:hover {
          background-color: #1976D2; /* Cor ao passar o mouse */
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: white;
          color: black;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}