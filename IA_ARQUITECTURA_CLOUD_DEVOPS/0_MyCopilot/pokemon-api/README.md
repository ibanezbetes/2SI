# Pokémon API Express

Este proyecto es una API REST construida con Node.js y Express que obtiene la lista de Pokémon desde la PokéAPI y permite filtrarlos por nombre.

## Instalación

1. Entra a la carpeta del proyecto:
   ```sh
   cd pokemon-api
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```

## Uso

- Inicia el servidor:
  ```sh
  npm start
  ```
- El servidor estará disponible en `http://localhost:3000`.

### Endpoints

- `GET /pokemons` — Devuelve la lista de los primeros 151 Pokémon.
  - Parámetro opcional `name` para filtrar por nombre:
    - Ejemplo: `/pokemons?name=pika`

## Ejemplo de respuesta

```json
[
  { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
  { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }
]
```
