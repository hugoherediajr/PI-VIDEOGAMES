import axios from 'axios'

//cargamos todos los Videogames desde el Backend incluidas 
//las relaciones con Genero

export function getAllVideogames() {
  return async (dispatch) => {
    const videogames = await axios.get('http://localhost:3001/videogame')
    return dispatch({
      type: 'GET_VIDEOGAMES',
      payload: videogames.data,
    })
  }
}


//accedemos por query a la ruta del backend por nombre
// incluyendo la relación con Genero  
export function getVideogameByName(name) {
  return async (dispatch) => {
    try {
      const videogameByName = await axios.get(
        `http://localhost:3001/videogame?name=${name}`
      )
      return dispatch({
        type: 'GET_VIDEOGAME_BY_NAME',
        payload: videogameByName.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// Accedemos por params a la ruta del Backend
// por id incluyendo la relación con Genero
export function getVideogameDetails(id) {
  return async (dispatch) => {
    try {
      const details = await axios.get(`http://localhost:3001/videogame/${id}`)
      return dispatch({
        type: 'GET_VIDEOGAME_DETAILS',
        payload: details.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// Filtro de los Videogames por lugar de Creación

export function filterByCreated(payload) {
  return {
    type: 'FILTER_BY_CREATED',
    payload,
  }
}

// Filtro por género de Videogame accediendo con el nombre

export function filterByGenreName(payload) {
  return {
    type: 'FILTER_BY_GENRE_NAME',
    payload,
  }
}

// Ordenamiento de los Videogames
export function sort(payload) {
  return {
    type: 'SORT',
    payload,
  }
}

// Creamos un nuevo videogame en el BackEnd
export function createVideogame(details) {
  return async function (dispatch) {
    const newVideogame = await axios.post(
      'http://localhost:3001/videogame',
      details
    )
    console.log(newVideogame)
    return newVideogame
  }
}

// Cargamos todos las géneros con esta ruta del Backend
export function getAllGenres() {
  return async (dispatch) => {
    const act = await axios("http://localhost:3001/genres/all");
    return dispatch({ type: "GET_GENRES", payload: act.data });
  };
}

// Cargamos todos las plataformas con esta ruta del Backend
export function getAllPlatforms() {
  return async (dispatch) => {
    const act = await axios("http://localhost:3001/platforms");
    return dispatch({ type: "GET_PLATFORMS", payload: act.data });
  };
}