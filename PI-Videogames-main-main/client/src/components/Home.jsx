import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllVideogames,
  filterByCreated,
  filterByGenreName,
  sort
} from '../actions'
import { Link } from 'react-router-dom';
import { Videogame } from './Videogame';
import Paginado from "./Paginado";
import styles from './Home.module.css';
import Navbar from './Navbar';
import Error from './Error';


export default function Home() {
  const dispatch = useDispatch()
  const videogames = useSelector((state) => state.videogames)

  useEffect(() => {
    dispatch(getAllVideogames())
  }, [dispatch])

  const [order, setOrder] = useState('')

  //uso estados locales para el paginado
  const [currentPage, setCurrentPage] = useState(1) // empiezo en la pag 1
  const pages = (pageNum) => {
    setCurrentPage(pageNum)
  }

const videogamesPerPage = 15

  //filtro por creación de videogame: Api, Database y All
  function handleCreatedFilter(e) {
    dispatch(filterByCreated(e.target.value))
    //setCurrentPage(1)
  }

  // Este es el filtro de los nombres de géneros de videogame
  function handleGenreFilterByName(e) {
    dispatch(filterByGenreName(e.target.value))
    setCurrentPage(1)
    if (order) {
      dispatch(sort(order));
    }
  }

  //ordenar por nombre o rating
  function handleSort(e) {
    e.preventDefault()
    console.log(e.target.value)
    dispatch(sort(e.target.value))
    setOrder(e.target.value)
    setCurrentPage(1)
    
  }
 
  /*
  Lógica: en cada pag, voy tomando del array de videogames (importado del estado global en la constante videogames)
  una slice que vaya desde firstIdx hasta lastIdx, sin incluir este último.
  */
  var lastIdx = currentPage * videogamesPerPage // en la primera página, lastIdx = 1 * 15 = 15
  var firstIdx = lastIdx - videogamesPerPage // en la primera página, firstIdx = 15 - 15 = 0
  var currentVideogames = videogames.slice(firstIdx, lastIdx) // en la primera página, currentVideogames = videogames.slice(0,14)

  function handleClick(e) {
    e.preventDefault()
    dispatch(getAllVideogames())
    setCurrentPage(1)
  }
console.log(currentVideogames);
  return (
    <div className={styles.container}>
      <Navbar
        sort={handleSort}
        createdFilter={handleCreatedFilter}
        genreNameFilter={handleGenreFilterByName}
        setCurrentPage={setCurrentPage}
           />

      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={(e) => handleClick(e)}>
          Reload Videogames
        </button>

        <button className={styles.btn}>
          <Link className={styles.link} to='/createvg'>
            Add Videogame
          </Link>
        </button>
      </div>

      <div className={styles.videogameContainer}>
        {currentVideogames.length ? (
          currentVideogames.map((c) => (
            <Videogame
              name={c.name}
              image={c.image}
              id={c.id}
              key={c.id}
//              genres={c.genres[0].name}
              genres={c.genres}
                          />
          ))
        ) : (
          <Error text={'No videogames found. Please try again'} />
        )}
      </div>

      <Paginado
          amountPerPage={videogamesPerPage}
          totalAmount={videogames.length}
          pageNumber={pages}
      />

    </div>
  )
}
