import React from "react";
import styles from './Paginado.module.css'


export default function Paginado({ amountPerPage, totalAmount, pageNumber }) {
        const pageNumbers = []
      
        for (let i = 1; i <= Math.ceil(totalAmount / amountPerPage); i++) {
          pageNumbers.push(i)
        }
      
        return (
          <nav className={styles.numBar}>
            <div className={styles.numContainer}>
              {pageNumbers &&
                pageNumbers.map((num) => {
                  return (
                    <a 
                      href="#"
                      key={num}
                      className={styles.number}
                      onClick={() => pageNumber(num)}
                    >
                      {num}
                    </a>
                  //   <button  
                  //   key={num}
                  //   className={styles.number}
                  //   onClick={() => pageNumber(num)}
                  // >
                  //   {num}
                  // </button>
                  )
                })}
            </div>
          </nav>
        )
      }