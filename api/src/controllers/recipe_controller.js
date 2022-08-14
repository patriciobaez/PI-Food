const axios = require('axios')
require('dotenv').config()
const {Diet, Recipe} = require('../db')
const {API_KEY} = process.env

const getApiInfo = async () => {
    const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=12`)
    const apiRecipes = apiInfo.data?.results.map(element => {
        return {
            id: element.id,
            title: element.title,
            image: element.image,
            summary: element.summary,
            spoonacularScore: element.spoonacularScore,
            healthScore: element.healthScore,
            diets: element.diets.map(each => ({ name: each })),
            dishTypes: element.dishTypes, 
            steps: element.analyzedInstructions[0]?.steps.map(each => { return each.step })
        }
    })
    return apiRecipes
}

const getDataBaseInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
     })
}

const getAllRecipes = async () => {
    const apiRecipesProm = getApiInfo()
    const dbInfoProm = getDataBaseInfo()

    const [apiRecipes, dbInfo] = await Promise.all([apiRecipesProm, dbInfoProm])

    return [...apiRecipes, ...dbInfo];
}

const detailsByIdApi = async (id) => {
    try {
        const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        const detail = recipe.data
        return {
            id: detail.id,
            title: detail.title,
            image: detail.image,
            summary: detail.summary.replace(/<[^>]*>?/g, ''),
            spoonacularScore: detail.spoonacularScore,
            healthScore: detail.healthScore,
            diets: detail.diets.map(each => ({ name: each })),
            instructions: detail.analyzedInstructions[0]?.steps.map(e => e.step).join(" "),
            dishTypes: detail.dishTypes?.map(dish => ({ name: dish }))
        }
    } catch (error) {
        return undefined
    }
}

const detailsByIdDB = async (id) => {
    try {
        const recipe = await Recipe.findByPk(id, {
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
         })
        return recipe
    } catch {
        return undefined;
    }
}

const searchById = async(id)=>{
    const apiRecipeProm = detailsByIdApi(id)
    const dbRecipeProm = detailsByIdDB(id)

    const [apiRecipe, dbRecipe] = await Promise.all([apiRecipeProm, dbRecipeProm])

    return apiRecipe || dbRecipe
}

module.exports = {
    getAllRecipes,
    searchById
}