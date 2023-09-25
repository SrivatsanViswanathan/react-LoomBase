const axios = require("axios");

exports.handler = async (event, context) => {
  const genreAPI = process.env.GENRES_API;
  const loomiansAPI = process.env.LOOMIANS_API;
  const movesAPI = process.env.MOVES_API;
  const abilitiesAPI = process.env.ABILITIES_API;
  const itemsAPI = process.env.ITEMS_API;
  const typesAPI = process.env.TYPES_API;

  try {
    const [genres, loomians, moves, abilities, items, types] =
      await Promise.all([
        axios.get(genreAPI),
        axios.get(loomiansAPI),
        axios.get(movesAPI),
        axios.get(abilitiesAPI),
        axios.get(itemsAPI),
        axios.get(typesAPI),
      ]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        genres: genres.data,
        loomians: loomians.data,
        moves: moves.data,
        abilities: abilities.data,
        items: items.data,
        types: types.data,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
