// Este archivo contiene funciones auxiliares para el frontend

/**
 * Obtiene la URL del sprite animado de un Pokémon a partir de su URL en la PokéAPI
 * @param {string} url - URL del Pokémon en la PokéAPI
 * @returns {string} - URL del sprite animado
 */
function getPokemonAnimatedSprite(url) {
  // La URL es del tipo https://pokeapi.co/api/v2/pokemon/{id}/
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  if (match) {
    const id = match[1];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
  }
  return '';
}

window.getPokemonAnimatedSprite = getPokemonAnimatedSprite;
