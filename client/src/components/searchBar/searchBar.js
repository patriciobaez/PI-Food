import React from "react"
import {useState} from "react"
import { useDispatch } from "react-redux"
import { searchRecipe } from "../../redux/actions/index.js"
import styles from './searchBar.module.css'



const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(event){
        event.preventDefault()
        setName(event.target.value)
    }
    function handleSubmit(event){
        event.preventDefault()
        dispatch(searchRecipe(name))
    }
    return(
        <div className={styles.container}>
            <input className={styles.searchbar} type='search' placeholder="Enter a recipe name..." value={name} onChange={(event) => handleInputChange(event)}></input>
            <button className={styles.button} type="submit" onClick={(event) => handleSubmit(event)}>Search</button>
        </div>
    )
}

export default SearchBar;