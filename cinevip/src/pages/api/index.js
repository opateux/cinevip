import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    case 'GET':
      return handleGet(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Função para lidar com criação de filmes
async function handlePost(req, res) {
  const { title, year, releaseDate, genre, director } = req.body;

  // Validações básicas
  if (!title || !year || !releaseDate || !genre || !director) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        year: parseInt(year),
        releaseDate: new Date(releaseDate),
        genre,
        director,
      },
    });
    return res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar o filme.' });
  }
}

// Função para lidar com a listagem de filmes
async function handleGet(req, res) {
  try {
    const movies = await prisma.movie.findMany();
    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar filmes.' });
  }
}

// Função para lidar com atualização de filmes
async function handlePut(req, res) {
  const { id, title, year, releaseDate, genre, director } = req.body;

  // Verificar se todos os dados necessários foram enviados
  if (!id || !title || !year || !releaseDate || !genre || !director) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const movie = await prisma.movie.update({
      where: { id: parseInt(id) },
      data: {
        title,
        year: parseInt(year),
        releaseDate: new Date(releaseDate),
        genre,
        director,
      },
    });
    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar o filme.' });
  }
}

// Função para lidar com exclusão de filmes
async function handleDelete(req, res) {
  const { id } = req.body;

  // Verificar se o ID foi enviado
  if (!id) {
    return res.status(400).json({ error: 'ID é obrigatório para exclusão.' });
  }

  try {
    await prisma.movie.delete({
      where: { id: parseInt(id) },
    });
    return res.status(204).end(); // Resposta sem conteúdo, indicando sucesso
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir o filme.' });
  }
}
