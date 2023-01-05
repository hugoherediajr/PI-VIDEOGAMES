import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVideogames, getAllGenres } from '../actions'
import styles from './Navbar.module.css'
import Searchbar from './Searchbar'

export default function Navbar({ sort, createdFilter, 
  actFilter, genreNameFilter,setCurrentPage }) {
  
  const dispatch = useDispatch()

  function handleClick(e) {
    e.preventDefault()
    dispatch(getAllVideogames())
    setCurrentPage(1)
  }
const genres = useSelector((state) => state.genres);
  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGenres());
  }, [dispatch])

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <h1 className={styles.country} onClick={(e) => handleClick(e)}>
          Videogames
        </h1>

        <Searchbar 
          setCurrentPage={setCurrentPage}
            />
        <div className={styles.filterContainer}>
          {/* filtro por distinción de Creación */}
          <select className={styles.filter} onChange={(e) => createdFilter(e)}>
            <option value='All'>Created All...</option>
            <option value='Api'>Api</option>
            <option value='Database'>Database</option>
          </select>

          {/* filtro por nombre de género */}
          <select className={styles.filter} onChange={(e) => genreNameFilter(e)}>
            <option value='All'>Filter by genre...</option>
            {genres &&
            genres.map((el) => (
              <option value={el.name} key={el.name}>
                {el.name}
              </option>
            ))}
          </select>
          
          {/* orden por nombre o poblacion */}
          <select className={styles.filter} onChange={(e) => sort(e)}>
            <option value='AZ'>Sort by...</option>
            <option value='AZ'>Name (A-Z)</option>
            <option value='ZA'>Name (Z-A)</option>
            <option value='ratingAsc'>Rating (asc)</option>
            <option value='ratingDesc'>Rating (desc)</option>
          </select>
        </div>
      </div>
    </div>
  )
}
