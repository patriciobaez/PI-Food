import React from "react";
import styles from './cards.module.css'

const Card = (props) => {
    return(
        <div className={styles.card}>
            <img className={styles.imagen} src={props.image} alt="" ></img>
            <h3>{props.title}</h3>
            <h4>Diets:</h4>
            <p>{props.diets}</p>
            <p className={styles.healthScoreText} >Health Score: {props.healthScore}</p>
            
        </div>
    )
}

export default Card;