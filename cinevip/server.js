const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/genres', async (req, res) => {
    const { name } = req.body;
    try {
        const newGenre = await prisma.genre.create({ data: { name } });
        res.json(newGenre);
    } catch (error) {
        res.status(400).json({ error: "Genre creation failed" });
    }
});

app.get('/genres', async (req, res) => {
    const genres = await prisma.genre.findMany();
    res.json(genres);
});

app.post('/movies', async (req, res) => {
    const { title, year, releaseDate, genreId, director } = req.body;
    try {
        const newMovie = await prisma.movie.create({
            data: { title, year, releaseDate, genreId, director }
        });
        res.json(newMovie);
    } catch (error) {
        res.status(400).json({ error: "Movie creation failed" });
    }
});

app.get('/movies', async (req, res) => {
    const movies = await prisma.movie.findMany({ include: { genre: true } });
    res.json(movies);
});

app.get('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await prisma.movie.findUnique({ where: { id: parseInt(id) } });
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
});

app.put('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const { title, year, releaseDate, genreId, director } = req.body;
    try {
        const updatedMovie = await prisma.movie.update({
            where: { id: parseInt(id) },
            data: { title, year, releaseDate, genreId, director }
        });
        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ error: "Movie update failed" });
    }
});

app.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.movie.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Movie deleted" });
    } catch (error) {
        res.status(400).json({ error: "Movie deletion failed" });
    }
});

app.listen(8080, () => console.log("Server running on http://localhost:8080"));
