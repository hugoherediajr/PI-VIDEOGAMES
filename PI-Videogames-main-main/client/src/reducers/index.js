const initialState = {
  videogames: [], //este array se va a ir modificando según los filtros que aplique en el front
  allVideogames: [], //en este array voy a tener siempre TODOS los videogames
  videogameDetail: {}, // en este array voy a alojar el detail de cada videogame clickleado
  genres: [], // array de la BD de Genre
  platforms: [], // array de la BD de Platform

  videogamesBackup:[], //array conjuncion de filtros 
}
//function reducer(state = initialState, { type, payload })
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_VIDEOGAMES':
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
        videogamesBackup: action.payload,
      }
    case 'GET_VIDEOGAME_BY_NAME':
      return {
        ...state,
        videogames: action.payload,
      }

    case 'FILTER_BY_CREATED':
    let filtered = [];
      if (action.payload === "Database"){ 
         filtered=state.allVideogames.filter((videogame) => {
            return videogame.createdInDb === true;
          })
      } else if (action.payload === "Api") {
          filtered=state.allVideogames.filter((videogame) => {
              return videogame.createdInDb === false;
          })
      } else {
          filtered=[...state.allVideogames];
      }
      return {
        ...state, 
        videogames: filtered,
        videogamesBackup: filtered,
               };


    case 'FILTER_BY_GENRE_NAME':
        const allVideogamesGenre = state.videogamesBackup;
        const genreFilter =
          action.payload === "All Activities"
            ? allVideogamesGenre.filter((all) => all.videogames.length > 0)
            : allVideogamesGenre.filter(
                (el) =>
                  el.genres &&
                  el.genres.map((fil) => fil.name).includes(action.payload)
              );
  
        return {
          ...state,
          allVideogames: genreFilter,
          videogames: genreFilter,
        };

      case 'SORT':
      var sorted
      if (action.payload.length === 2) {
        sorted =
          action.payload === 'AZ'
            ? state.videogames.sort((a, b) => {
                if (a.name > b.name) return 1
                if (a.name < b.name) return -1
                return 0
              })
            : state.videogames.sort((a, b) => {
                if (a.name > b.name) return -1
                if (a.name < b.name) return 1
                return 0
              })
      } else {
        sorted =
          action.payload === 'ratingAsc'
            ? state.videogames.sort((a, b) => a.rating - b.rating)
            : state.videogames.sort((a, b) => b.rating - a.rating)
      }
      return {
        ...state,
        videogames: sorted,
      }
    case 'CREATE_VIDEOGAME':
      return {
        ...state,
      }
    case "GET_VIDEOGAME_DETAILS":
      return {
        ...state,
        videogameDetail: action.payload,
      }

    case "GET_GENRES": //ok
    return {
      ...state,
      genres: action.payload,
    };

    case "GET_PLATFORMS": //ok
    return {
      ...state,
      platforms: action.payload,
    };

    
    default:
      return state
  }
}

export default rootReducer
