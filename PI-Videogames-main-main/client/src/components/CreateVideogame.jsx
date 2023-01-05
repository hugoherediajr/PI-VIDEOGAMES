import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getAllVideogames, createVideogame, getAllPlatforms } from '../actions'
import styles from './CreateVideogame.module.css'

function Validate(input) {
  let errors = {};
  if (!input.name) {errors.name = "Se requiere un nombre del Videogame";}
   else if (!input.description){
    errors.description="Se requiere una descripción";}
   else if(input.rating < 0 || input.rating > 5  ){
    errors.rating="El rating es válido entre 1 hasta 5";}
   // if (typeof input.name !== "string") errors.name = "debe ser solo letras";
  // else if (input.name.length > 20)
  //   errors.name =
  //     "El nombre de la actividad turística no debe superar de 20 caracteres";
  // else if (!input.difficulty)
  //   errors.difficulty = "Debe seleccionar una grado de dificultad";
  // else if (!input.duration)
  //   errors.duration = "Se requiere agregar duración de actividad turística";
  // else if (input.duration < 1 || input.duration > 48)
  //   errors.duration = "El tiempo de duración es entre 1hs - 48hs";
  // else if (!input.season)
  //   errors.season =
  //     "Se requiere seleccionar la temporada en la que se realiza la actividad turística";
  // else if (!input.description)
  //   errors.description =
  //     "Se requiere agregar descripción de esta actividad turísitica";
  // else if (input.description.length > 100)
  //   errors.description =
  //     "La máxima cantidad de caracteres para escribir la descripción es de 100 caracteres";
  // else if (!input.countries)
  //   errors.countries =
  //     "Se requiere seleccionar el o los países donde se desarrolla esta actividad turística";

  return errors;
}


export default function CreateVideogame() {
  const dispatch = useDispatch()
  const history = useHistory()
//  const videogames = useSelector((state) => state.allVideogames)
  const genres = useSelector((state) => state.genres)
  const platforms = useSelector((state) => state.platforms)
  
  const [errors, setErrors] = useState({});
  
  const [details, setDetails] = useState({
    name: '',
    description: '',
    released: '',
    createdInDb: true,
    rating:'',
    genres: [],
    platforms: []
  })

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllPlatforms());
  }, [dispatch])

//=>{dispatch(getAllPlatforms())}

  function handleChangeName(e) {
  //  released = released.toString()    
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });

    setErrors(
      Validate({
        ...details,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleChangeDescription(e) {
    //  released = released.toString()    
      setDetails({
        ...details,
        [e.target.name]: e.target.value,
      });
  
      setErrors(
        Validate({
          ...details,
          [e.target.name]: e.target.value,
        })
      );
    }
    function handleChange(e) {
      //  released = released.toString()    
        setDetails({
          ...details,
          [e.target.name]: e.target.value,
        });
    
        setErrors(
          Validate({
            ...details,
            [e.target.name]: e.target.value,
          })
        );
      }


  function handleSelectGenres(e) {
    if(
      !details.genres.includes(e.target.value)
    ){
      
      setDetails({
        ...details,
        genres: [...details.genres, e.target.value],
      });
    } else {
      return alert(
        'Usted ya lo seleccionó... Elija otro'
      );
    }



  }
  function handleSelectPlatforms(e) {
    setDetails({
      ...details,
      platforms: [...details.platforms, e.target.value]
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(createVideogame(details))
    setDetails({
      name: '',
      description: '',
      released: '',
      createdInDb: true,
      rating: '',
      genres: [],
      platforms: []

    })
    history.push('./videogame')
    alert('Videogame created!')
  }
  //console.log(genres);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className={styles.title}>Add New Videogame</h1>
          <div className={styles.formSection}>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              className={styles.input}
              onChange={(e) => handleChangeName(e)}
              required
            />
          {errors.name && <p>{errors.name}</p>}  
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='description'>
              Description:
            </label>
            <input
              type='text'
              id='description'
              name='description'
              className={styles.input}
              onChange={(e) => handleChangeDescription(e)}
              required
            />
            {errors.description && <p>{errors.description}</p>}    
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='genres'>
              Genre:
            </label>
            <select
              className={styles.input}
              name='genres'
              onChange={(e) => handleSelectGenres(e)}
              //onChange={(e) => handleChange(e)}
              required
            >
              <option value=''>Genres...</option>
              
               {genres.map((g) => (
                // <option value={c.id}>{c.name}</option>
                <option value={g.id} key={g.id}>{g.name}</option>
          
              ))}
            </select>
          </div>
          <ul>
            <li>{details.genres.map((c) => `${c} | `)}</li>
          </ul>
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='released'>
              Released:
            </label>
            <input
              // type='text' placeholder='aaaa-mm-dd'
              type= 'date'
              id='released'
              name='released'
              min='2000-01-01'
              max='2022-09-28'
              className={styles.input}
              onChange={(e) => handleChange(e)}
            />
          </div>
          
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='rating'>
              Rating:
            </label>
            <input
              type='number' step = "any" 
              id='rating'
              name='rating'
              autoComplete='off'
              className={styles.input}
              onChange={(e) => handleChange(e)}
              required
            />
            {errors.rating && <p>{errors.rating}</p>}
          </div>

          <div className={styles.formSection}>
            <label className={styles.label} htmlFor='platforms'>
              Platforms:
            </label>
            <select
              className={styles.input}
              name='platforms'
              onChange={(e) => handleSelectPlatforms(e)}
              required
            >
              <option value=''>Platforms...</option>
              
               {platforms.map((c) => (
                // <option value={c.id}>{c.name}</option>
                <option value={c.name} key={c.id}>{c.name}</option>

              ))}
            </select>
          </div>
          <ul>
            <li>{details.platforms.map((c) => `${c} | `)}</li>
          </ul>

          <Link to='/videogame'>
            <button className={styles.btnBack}>Go back</button>
          </Link>
          <button className={styles.btn} type='submit'>
            Add Videogame
          </button>
        </form>
      </div>
    </div>
  )
}
