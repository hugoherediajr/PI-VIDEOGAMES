import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideogameDetails } from '../actions'
import { Link } from 'react-router-dom'
import styles from './Details.module.css'

export default function Details({ videogame }) {
  const dispatch = useDispatch()
  const details = useSelector((state) => state.videogameDetail)

  useEffect(() => {
    dispatch(getVideogameDetails(videogame))
    }, [dispatch,videogame])
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imgContainer}>
          <img alt='image' src={details.image} className={styles.img} />
        </div>

        <div className={styles.infoContainer}>
          <h1 className={styles.title}>
            {details.name} ({details.id})
          </h1>
          <h2 className={styles.subtitle}>
            Description:
            {details.description}
            {/* {details.subregion ? ' | ' + details.subregion : null} */}
          </h2>
          <h4>Released: {details.released}</h4>
          <h4>Rating: {details.rating}</h4>
          <h4>Platforms: {details.platforms} </h4>
          <h4 className={styles.genres}>
          <ul>
              {details.genres &&
              <li> Genres: {details.genres.map((c) => `${c.name} | `)}</li>    
             }
          </ul>
          </h4>
          <Link to='/videogame'>
            <button className={styles.btn}>Go back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
