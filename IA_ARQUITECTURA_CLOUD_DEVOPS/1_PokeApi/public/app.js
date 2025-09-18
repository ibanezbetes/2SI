document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const nameInput = document.getElementById('nameInput');
  const pokemonList = document.getElementById('pokemonList');
  const modal = document.getElementById('pokemonModal');
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.getElementById('closeModal');
  const pagination = document.getElementById('pagination');
  const pikachuCard = document.getElementById('pikachuCard');

  let currentPage = 1;
  let lastQuery = '';

  function showPokedexMain() {
    pikachuCard.style.display = 'flex';
    pokemonList.style.display = 'none';
    pagination.style.display = 'none';
  }

  function showPokemonList() {
    pikachuCard.style.display = 'none';
    pokemonList.style.display = 'grid';
    pagination.style.display = 'flex';
  }

  async function fetchPokemons(name = '', page = 1) {
    let url = `/pokemons?page=${page}`;
    if (name) {
      url += `&name=${encodeURIComponent(name)}`;
    }
    pokemonList.innerHTML = '<p>Cargando...</p>';
    pagination.innerHTML = '';
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.pokemons || data.pokemons.length === 0) {
        pokemonList.innerHTML = '<p>No se encontraron pokémons.</p>';
        return;
      }
      pokemonList.innerHTML = data.pokemons.map(pokemon => {
        const imgUrl = getPokemonAnimatedSprite(pokemon.url);
        return `
          <div class="pokemon-card" data-url="${pokemon.url}">
            <img src="${imgUrl}" alt="${pokemon.name}">
            <strong>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</strong>
          </div>
        `;
      }).join('');
      renderPagination(data.page, data.totalPages, name);
      showPokemonList();
    } catch (err) {
      pokemonList.innerHTML = '<p>Error al cargar los pokémons.</p>';
    }
  }

  function renderPagination(current, total, name) {
    let html = '';
    if (total <= 1) return;
    let start = Math.max(1, current - 3);
    let end = Math.min(total, current + 3);
    if (current <= 4) end = Math.min(7, total);
    if (current > total - 4) start = Math.max(1, total - 6);
    if (current > 1) {
      html += `<button data-page="${current - 1}">&laquo;</button>`;
    }
    for (let i = start; i <= end; i++) {
      html += `<button data-page="${i}"${i === current ? ' class="active"' : ''}>${i}</button>`;
    }
    if (current < total) {
      html += `<button data-page="${current + 1}">&raquo;</button>`;
    }
    pagination.innerHTML = html;
  }

  pagination.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      const page = parseInt(e.target.getAttribute('data-page'));
      if (!isNaN(page)) {
        currentPage = page;
        fetchPokemons(lastQuery, currentPage);
      }
    }
  });

  // Modal: mostrar datos atractivos
  async function showPokemonModal(url) {
    modal.style.display = 'flex';
    modalContent.innerHTML = '<p>Cargando datos...</p>';
    try {
      const res = await fetch(url);
      const data = await res.json();
      const imgUrl = data.sprites?.other?.['official-artwork']?.front_default || '';
      modalContent.innerHTML = `
        <img src="${imgUrl}" alt="${data.name}">
        <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Altura:</strong> ${data.height / 10} m</p>
        <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
        <p><strong>Tipos:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Habilidades:</strong> ${data.abilities.map(a => a.ability.name).join(', ')}</p>
        <a href="https://pokeapi.co/api/v2/pokemon/${data.id}/" target="_blank" style="color:#ffcb05;">Ver en PokéAPI</a>
      `;
    } catch (err) {
      modalContent.innerHTML = '<p>Error al cargar los datos del Pokémon.</p>';
    }
  }

  // Mostrar modal para Pikachu
  pikachuCard.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
      const url = 'https://pokeapi.co/api/v2/pokemon/25/';
      showPokemonModal(url);
    }
  });

  pokemonList.addEventListener('click', e => {
    const card = e.target.closest('.pokemon-card');
    if (card && e.target.tagName === 'IMG') {
      const url = card.getAttribute('data-url');
      showPokemonModal(url);
    }
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    lastQuery = nameInput.value.trim();
    currentPage = 1;
    if (lastQuery) {
      fetchPokemons(lastQuery, currentPage);
    } else {
      showPokedexMain();
    }
  });

  // Mostrar solo Pikachu al inicio
  showPokedexMain();
});
