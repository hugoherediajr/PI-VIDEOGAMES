//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const axios = require('axios');
const { conn, Genre, Platform, Videogame } = require('./src/db.js');
const syncOptions = { force: true, alter: false };
// const {API_KEY} = process.env;
const API_KEY='22080b58e0cc4f1db5abb251fef8f126'
//const getInfoAPI = require('./src/routes/index.js');

// Syncing all the models at once.
//conn.sync({ force: true }).then(() => {
conn.sync(syncOptions).then(() => {
  server.listen(3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
//---------->

if (syncOptions.force) {
  let chargeAPIGenres = await axios
    .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then((response) => response.data.results)
    .catch((err) => console.log(err));

  // console.log(chargeAPIGenres);
  
  chargeAPIGenres = chargeAPIGenres.sort((a, b) => {
      return a.name.localeCompare(b.name);
  });

  //console.log(chargeAPIGenres);
  // se crea la DB de Genre...
  chargeAPIGenres.forEach((genre) => {
    Genre.create({
      name: genre.name,
    });
  });
  // cargo toda la API en crudo en videogames
  let videogames = [];
  for (let i = 1; i <= 5; i++) {
    const apiUrl = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
    );
    const listOf100 = await apiUrl.data.results;
    videogames = videogames.concat(listOf100);
    console.log('Videojuegos cargados por página: ' + videogames.length);
  }

 //console.log(videogames)

 // En APIplataforms saco de videogames unicamente las plataformas
  let APIplataforms = videogames.map((videogame) =>
    videogame.platforms.map((platform) => platform.platform.name)
  );
 // En APIplataforms se encuentra en crudo 
 // console.log(APIplataforms);
 // Aplanamos con flat...
 //console.log(APIplataforms.flat())
 // Dejamos 1 de c/u con Set
 //console.log(new Set(APIplataforms.flat()))
// Ordenamos por nombre...
// console.log([...new Set(APIplataforms.flat())].sort())

  APIplataforms = [...new Set(APIplataforms.flat())].sort();

  // Creamos la tabla Platform...
  APIplataforms.forEach((p) => {
    Platform.create({
      name: p,
    });
  });

//  console.log(videogames);
// videogames  es un arrary con toda la API con 100 videogames
// pero está en crudo desde la API
  const VideogameFormat = videogames.map((videogame) => {
    return {
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      image: videogame.background_image,
      released: videogame.released,
      rating: videogame.rating,
      platforms:
        // videogame.genres &&
        videogame.platforms &&
        videogame.platforms
          .map((platform) => platform.platform.name)
          .join(', '),
      genres: videogame.genres && videogame.genres.map((g) => g.name),
    };
  });

// console.log(VideogameFormat);
  
  VideogameFormat.forEach(
    async ({
      id,
      name,
      description,
      image,
      released,
      rating,
      platforms,
      genres,
    }) => {
      const newVideogame = await Videogame.create({
        id,
        name,
        description,
        image,
        released,
        rating,
        platforms,
      });

    // Aquí creo las relaciones de Videogame y Genre 
      genres.forEach(async (genre) => {
        const newGenre = await Genre.findOne({ where: { name: genre } });
        await newVideogame.addGenre(newGenre);
      });
    }
  );
  console.log('Database synced');
}

// Cierre final--->
  });
});

