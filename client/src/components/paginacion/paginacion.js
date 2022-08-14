import React, {useState} from "react";
import styles from './paginacion.module.css'

const Paginacion = ({pagina, setPagina, recipesLength}) => {
    const nextPage = () => {
        setPagina (pagina + 1);
    }

    const prevPage = () => {
        if(pagina-1 !== 0){
            setPagina (pagina - 1);
        }
    }
    return (
        <div className={styles.container} >
            {(pagina-1 !== 0) && <button className={styles.button} onClick={prevPage}>Pagina anterior</button>}
            {((recipesLength/pagina) > 9) && <button className={styles.button} onClick={nextPage} >Siguiente pagina</button>}
        </div>
    )
}

export default Paginacion;