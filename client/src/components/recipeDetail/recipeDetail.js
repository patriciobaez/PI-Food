import React, { useEffect} from "react";
import { useParams} from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import {getDetail} from '../../redux/actions/index.js'
import styles from './recipeDetail.module.css'
import NavBar from "../navBar/navBar.js";

const RecipeDetail = () => {
    const dispatch = useDispatch()

    const recipeId = useParams()

    useEffect(() => {
        dispatch(getDetail(recipeId.id))
    },[dispatch])

    const recipeDetail = useSelector((state) => state.recipe_detail)

    return (
        <div className={styles.box} >
            {
                (recipeDetail.length === 0) ? 
                    <div>
                        <p>Loading ...</p>
                    </div> 
                :
                    <div className={styles.card} >
                        <img className={styles.imagen} src={recipeDetail.image} alt='' />
                        <h1 className={styles.title}>{recipeDetail.title}</h1>
                        <h3 className={styles.subtitle} >Health score {recipeDetail.healthScore}</h3>
                        <h3 className={styles.subtitle} >Summary</h3>                      
                        <p className={styles.text} >{recipeDetail.summary}</p>
                        <h3 className={styles.subtitle} >Instructions</h3>
                        <p className={styles.text} >{recipeDetail.instructions}</p>
                        <h3 className={styles.subtitle} >Diets</h3>
                        <p className={styles.text} >{recipeDetail.diets?.map(diet => (<ul  className={styles.element} >{diet.name} </ul>))}</p>
                        <h3 className={styles.subtitle} >Dish type</h3>
                        <p className={styles.text} >{recipeDetail.dishTypes?.map(dish => (<ul className={styles.element} >{dish.name}</ul>))}</p>
                    </div>
            }
        </div>
    )
}

export default RecipeDetail;