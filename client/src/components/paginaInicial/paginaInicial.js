import React from "react";

import styles from './paginaInicial.modules.css'

const paginaInicial = () => {
    return (
        <div className={styles.container}>
            <form action="http://localhost:3000/home">
                <input type="submit" value="Go to home page" />
            </form>
        </div>
    );
}
export default paginaInicial;