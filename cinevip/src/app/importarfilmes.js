const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function loadMovies() {
  const genre = await prisma.genre.create({ data: { name: 'Drama' } });
  
  for (let i = 1; i <= 10; i++) {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=YOUR_API_KEY&s=movie&type=movie&page=${i}`);
    const movies = response.data.Search;

    for (const movie of movies) {
      const { Title, Year, Released, Director } = movie;
      await prisma.movie.create({
        data: {
          title: Title,
          year: parseInt(Year),
          releaseDate: Released || 'N/A',
          director: Director || 'N/A',
          genreId: genre.id
        }
      });
    }
  }

  console.log('Movies loaded');
}

loadMovies();
