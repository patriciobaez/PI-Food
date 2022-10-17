import React from "react";
import styles from './cards.module.css'

const Card = (props) => {
    return(
        <div className={styles.card}>
            <img className={styles.imagen} src={props.image} alt="" ></img>
            <h3>{props.title}</h3>
            <div className={styles.dietsContainer} >
                <h4 className={styles.dietTitle}>Diets:</h4>
                <p>{props.diets}</p>
            </div>
            <div className={styles.healthScoreContainer} >
                <h4 className={styles.dietTitle}>Health Score:</h4>
                <p>{props.healthScore}</p>
            </div>
        </div>
    )
}

export default Card;