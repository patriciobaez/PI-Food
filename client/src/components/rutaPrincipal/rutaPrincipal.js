import React, { useEffect, useState } from "react";
import {getRecipes, getDiets, filteredByDiet, orderRecipe} from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import styles from './rutaPrincipal.module.css'
import { Link } from "react-router-dom"
import NavBar from "../navBar/navBar.js";
import Card from '../cards/cards.js'
import Paginacion from '../paginacion/paginacion.js'
import SearchBar from '../searchBar/searchBar.js'



const RutaPrincipal = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    let recipes = useSelector((state) => state.recipes)
    let diets = useSelector((state) => state.diets)

    const[pagina, setPagina] = useState(1)
    const[porPagina, setPorPagina] = useState(9)

    const maximo =  Math.ceil(recipes.length / porPagina);


    function handleFilteredDiets(e){
        e.preventDefault()
        dispatch(filteredByDiet(e.target.value))
        setPagina(1)
    }

    function handleOrder(event) {
        event.preventDefault();
        dispatch(orderRecipe(event.target.value));
    }

    return (
        <div>
            <SearchBar></SearchBar>
            <div className={styles.filtersContainer} >
                <select className={styles.select} onChange={e => handleFilteredDiets(e)}>
                    <option value="">Select a diet</option>
                    {diets?.map(diet => {
                        return (<option value={diet.name}>{diet.name}</option>)
                        })
                    }
                </select>

                <select className={styles.select} defaultValue="asc" onChange={(event) => handleOrder(event)}>
                    <option value="nameDes">By name A-Z</option>
                    <option value="nameAsc">By name Z-A</option>
                    <option value="scoreAsc">Ascending health score</option>
                    <option value="scoreDes">Descending health score</option>
                </select>
            </div>
            <div className={styles.searchbar} >
                <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} recipesLength={recipes.length} />
            </div>
            <div className={styles.card}>
                {recipes
                .slice(
                    (pagina - 1) * porPagina,
                    (pagina - 1) * porPagina + porPagina
                )?.map((recipe) => (
                    <Link className={styles.link} to={`/recipes/${recipe.id}`}>
                        <Card image={recipe.image} title={recipe.title} diets={recipe.diets.map(d => d.name).join(', ')} healthScore={recipe.healthScore}></Card>
                    </Link>
                ))}
            </div>
            <div className={styles.searchbar} >
                <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} recipesLength={recipes.length}/>
            </div>
        </div>
    )
}



export default RutaPrincipal;