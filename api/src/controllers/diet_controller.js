const axios = require('axios')
require('dotenv').config()
const {Diet} = require('../db')
const {API_KEY} = process.env

const getAllDiets = async () => {
    const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=12`)
    const apiDiets = apiInfo.data?.results.map(element => element.diets)
    const repeatedDiets = apiDiets.flat()
    const finalListOfDiets = [...new Set(repeatedDiets)] 
    
    finalListOfDiets.forEach(async diet => {
        await Diet.findOrCreate({
            where: {
                name: diet
            }
        })
    })
}


module.exports = {getAllDiets}