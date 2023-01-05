import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Videogame.module.css'

export function Videogame({ id, name, genres, image }) {
  return (
    <div className={styles.card} key={id}>
      <span className={styles.imgContainer}>
        {/* <img className={styles.img} src={image} alt={'videogame-image'} /> */}
        <img className={styles.img} src={image}/>
      </span>

      <div className={styles.textContainer}>
        <Link className={styles.link} to={`/videogame/${id}`}>
          <h3 className={styles.videogame}>{name}</h3>
        </Link>
        {/* <h4 className={styles.genre}>{genres}</h4> */}
        <h4 className={styles.genre}>
        <ul>
         <li>{genres&&genres.map((c) => `${c.name} | `)}</li>
        </ul>
        
        </h4>

      </div>
    </div>
  )
}
