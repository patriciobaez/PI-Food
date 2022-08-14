import {GET_RECIPES, GET_DIETS, SEARCH_RECIPE, FILTERED_BY_DIET, ORDER_BY_NAME, GET_DETAIL} from '../actions/index.js';

const initialState = {
    recipes: [],
    recipes_copy: [],
    recipe_detail: [],
    diets: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_RECIPES:
            return ({
                ...state,
                recipes: action.payload,
                recipes_copy: action.payload
            })
        case GET_DIETS:
            return ({
                ...state,
                diets: action.payload
            })
        case SEARCH_RECIPE:
            return ({
                ...state,
                recipes: action.payload
            })
        case FILTERED_BY_DIET:
            const recipes = state.recipes_copy
            const filter = action.payload === "" ? recipes : recipes.filter(recipe => {
              let diet = recipe.diets?.map(d => d.name)
              if (diet?.includes(action.payload)){
                return recipe
              }
            })
            return ({
                ...state,
                recipes: filter
            })
        case ORDER_BY_NAME:
            let sorted_recipes = []
            let order = action.payload;
            if(order === 'nameDes'){
                sorted_recipes = state.recipes.sort(function(a, b) {
                    if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
                    if(a.title.toLowerCase() < b.title.toLowerCase()) return -1
                    return 0
                })
            }
            if(order === 'nameAsc'){
                sorted_recipes = state.recipes.sort(function(a, b) {
                    if(a.title.toLowerCase() > b.title.toLowerCase()) return -1
                    if(a.title.toLowerCase() < b.title.toLowerCase()) return 1
                    return 0
                })
            }
            if(order === 'scoreAsc'){
                sorted_recipes = state.recipes.sort(function(a, b) {
                    if(a.healthScore > b.healthScore) return 1
                    if(a.healthScore < b.healthScore) return -1
                    return 0
                })
            }
            if(order === 'scoreDes'){
                sorted_recipes = state.recipes.sort(function(a, b) {
                    if(a.healthScore > b.healthScore) return -1
                    if(a.healthScore < b.healthScore) return 1
                    return 0
                })
            }
            return({
                ...state,
                recipes: [...sorted_recipes]
            })
        case GET_DETAIL:
            return ({
                ...state,
                recipe_detail: action.payload
            })
        default:
            return({...state})
    }
}

export default rootReducer;