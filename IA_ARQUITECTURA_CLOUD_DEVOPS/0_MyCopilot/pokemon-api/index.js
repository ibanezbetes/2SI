const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir index.html como página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para obtener y filtrar pokémon por nombre y tipo
app.get('/pokemons', async (req, res) => {
  try {
    const { name, type } = req.query;
    // Trae los primeros 151 pokémon
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    let pokemons = response.data.results;

    // Si hay filtro por nombre
    if (name) {
      pokemons = pokemons.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    }

    // Si hay filtro por tipo
    if (type) {
      // Obtener detalles de cada pokémon para filtrar por tipo
      const filtered = [];
      for (const poke of pokemons) {
        try {
          const pokeDetails = await axios.get(poke.url);
          const types = pokeDetails.data.types.map(t => t.type.name);
          if (types.includes(type.toLowerCase())) {
            filtered.push(poke);
          }
        } catch (e) {
          // Si falla un fetch, lo ignora
        }
      }
      pokemons = filtered;
    }

    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pokémon' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
