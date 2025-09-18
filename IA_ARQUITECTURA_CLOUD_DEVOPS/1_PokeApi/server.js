const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener pokemons paginados y filtrar por nombre
app.get('/pokemons', async (req, res) => {
  const { name, page = 1 } = req.query;
  const PAGE_SIZE = 100;
  try {
    // Obtenemos el número total de pokemons
    const countRes = await axios.get('https://pokeapi.co/api/v2/pokemon-species?limit=1');
    const total = countRes.data.count;
    const offset = (parseInt(page) - 1) * PAGE_SIZE;

    let pokemons = [];
    let filtered = false;

    if (name) {
      // Si hay búsqueda, traemos todos y filtramos
      const allRes = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${total}`);
      pokemons = allRes.data.results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );
      filtered = true;
    } else {
      // Si no hay búsqueda, solo la página actual
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
      pokemons = response.data.results;
    }

    // Si hay búsqueda, paginar los resultados filtrados
    let paginatedPokemons = pokemons;
    let totalFiltered = pokemons.length;
    let totalPages = Math.ceil(total / PAGE_SIZE);
    let currentPage = parseInt(page);
    if (filtered) {
      totalPages = Math.ceil(totalFiltered / PAGE_SIZE) || 1;
      currentPage = Math.min(currentPage, totalPages);
      const start = (currentPage - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      paginatedPokemons = pokemons.slice(start, end);
    }

    res.json({
      pokemons: paginatedPokemons,
      total: filtered ? totalFiltered : total,
      page: currentPage,
      pageSize: PAGE_SIZE,
      totalPages
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pokemons' });
  }
});

// Fallback para SPA (opcional, útil si usas rutas en frontend)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
