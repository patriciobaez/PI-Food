import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, createRecipe } from "../../redux/actions";
import NavBar from "../navBar/navBar";
import styles from './createRecipe.module.css'





const CreateRecipe = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDiets())
    },[dispatch])

    const diets = useSelector((state) => state.diets)

    const [post, setPost] = useState({title: '', healthScore: 50, summary: '', instructions: '', image: '', diets: []});
    const [errors, setErrors] = useState({})

    function validate(e){
        let errors = {}
        let letters = /^[A-Za-z]+$/
        if(!post.title){
            errors.title = "Recipe needs a name."
        } else if(post.title.length > 40){
            errors.title = "Your recipe's name is too long"
        }
        else if(!post.title.match(letters)){
            errors.title = 'Recipe name can not contain numbers or special characters.'
        }
        if(!post.healthScore){
            errors.healthScore = "Recipe needs a health score."
        }
        if(!post.summary){
            errors.summary = "Recipe needs a summary."
        }
        if(!post.instructions){
            errors.instructions = "Recipe needs instructions."
        }
        if(!post.diets.length){
            errors.diets = "Recipe needs at least 1 diet."
        }
        return errors
    }

    function handleChange(e){
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...post,
            [e.target.name]: e.target.value
        }))
    }

    function handleRemoveDiet(id) {
        setPost({
            ...post, 
            diets: post.diets.filter(diet => diet.id !== id)
        })
    }

    function handleAddDiet(obj) {
        const index = post.diets.map( diet => diet.id ).indexOf(obj.id);
        if(index < 0) {
            setPost({
                ...post,
                diets: [...post.diets, obj]
            })
        }
    }

    function handleDietsChange(e) {
        const id = parseInt(e.target.value)
        const obj = diets.find(diet => diet.id === id);
        
        handleAddDiet(obj)
    }

    function handleOnSubmit(e){
        e.preventDefault()
        if(errors.title) {
            return errors.title
        }
        if (!post.image) {
            post.image = "https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_960_720.jpg"
        }
        if(errors === {}){
            dispatch(createRecipe(post))
            // alert("Recipe sucessfully created!") mostrar en pantalla sin alert!
            setPost({
                title: "",
                healthScore: 50,
                summary: "",
                instructions: "",
                image: "",
                diets: []
            })
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <h1 className={styles.title} >Add a new recipe:</h1>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className={styles.inputConainer} >
                    <label>Name </label>
                     <input className={styles.input} name='title' type='text' value={post.title} id='title' onChange={(e) => handleChange(e)} placeholder='Enter a name' ></input>
                     {errors.title ? <p>{errors.title}</p> : null}
                </div>
                <div>
                    <label>Health score </label>
                    <input className={styles.input} name='healthScore' type='number' value={post.healthScore} id='healthScore' onChange={(e) => handleChange(e)} placeholder='Enter a health score' ></input>
                    {errors.healthScore ? <p>{errors.healthScore}</p> : null}
                </div>
                <div>
                    <label>Summary </label>
                    <input className={styles.textarea} name='summary' type='text' value={post.summary} id='summary' onChange={(e) => handleChange(e)} placeholder='Write a summary' ></input>
                    {errors.summary ? <p>{errors.summary}</p> : null}
                </div>
                <div>
                    <label>Instructions </label>
                    <input className={styles.textarea} name='instructions' type='text' value={post.instructions} id='instructions' onChange={(e) => handleChange(e)} placeholder='Write the instructions' ></input>
                    {errors.instructions ? <p>{errors.instructions}</p> : null}
                </div>
                <div>
                    <label>Image </label>
                    <input className={styles.input} name='image' type='text' value={post.image} id='image' onChange={(e) => handleChange(e)} placeholder='Enter a image url' ></input>
                </div>
                <div>
                    <select name="diets" id="diets" defaultValue='default' onChange={(e) => handleDietsChange(e)}>
                        <option value='default' disabled>Diet Types</option>
                        {
                            diets.length > 0 ? diets.map(diet => (<option key={diet.id} value={diet.id}>{diet.name}</option>)) : <option>Loading....</option>
                        }
                    </select>
                </div>
                <div>
                    <ul>
                        {
                            post.diets.map(diet => (
                                <li key={diet.id}>
                                    <span>{diet.name}</span>
                                    <button onClick={() => handleRemoveDiet(diet.id)}>X</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <input className={styles.button} type="submit" value="Add new recipe!" />
            </form>
        </div>
    )
}
export default CreateRecipe;