export const GET_RECIPES = 'GET_RECIPES'
export const GET_DIETS = 'GET_DIETS'
export const SEARCH_RECIPE = 'SEARCH_RECIPE'
export const FILTERED_BY_DIET = "FILTERED_BY_DIET"
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const GET_DETAIL = 'GET_DETAIL'

const axios = require('axios')

export function getRecipes() {
    return async function (dispatch) {
        await axios.get("http://localhost:3001/recipes")
        .then(response => {dispatch({ type: GET_RECIPES, payload: response.data})})
    }
}

export function getDiets() {
    return async function (dispatch) {
        await axios.get("http://localhost:3001/diet")
        .then(response => {dispatch({ type: GET_DIETS, payload: response.data})})
    }
}

export function searchRecipe(name) {
    return async function (dispatch) {
        await axios.get("http://localhost:3001/recipes?name=" + name)
        .then(response => {dispatch({ type: SEARCH_RECIPE, payload: response.data})})
    }
}

export function filteredByDiet(payload) {
    return {type: FILTERED_BY_DIET, payload: payload}
}

export function orderRecipe(payload) {
    return {type: ORDER_BY_NAME, payload: payload}
}

export function getDetail(payload){
    return async function (dispatch) {
        await axios.get("http://localhost:3001/recipes/" + payload)
        .then(response => {dispatch({ type: GET_DETAIL, payload: response.data})})
    }
}

export function createRecipe(payload){
    return async function () {
        var json = await axios.post('http://localhost:3001/recipes', payload)
        return json
    }
}