const {Router} = require('express')
const router = Router()
const {Recipe} = require('../db')
const {getAllRecipes, searchById} = require('../controllers/recipe_controller.js')

router.get("/", async (req,res,next) =>{
    try {
        const name = req.query.name
        const apiInfo = await getAllRecipes()
        if(name){
             let recipe = apiInfo.filter(recipe => recipe.title?.toLowerCase().includes(name.toString().toLowerCase()))
            if(recipe.length){
                res.status(200).send(recipe)
            } else {
                res.status(404).send("Recipe doesn´t exist")  
            }
        }
        else{
            res.status(200).send(apiInfo)
        }
    }
    catch (error) {
        next(error)
    }
})

router.get('/:id', async (req,res,next) => {
    try {
        const id = req.params.id
        const detailById = await searchById(id)
        if (!detailById){ 
            return res.status(404).send("Recipe by Id doesn´t exist")
        }
        res.status(200).send(detailById)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req,res,next) => {
    try {
        const {title, summary, healthScore, instructions, image, diets} = req.body

        const recipeCreate = await Recipe.create({
            title,
            summary,
            healthScore,
            instructions,
            image
        })

        const proms = diets.map(diet => recipeCreate.addDiet(diet.id));
        await Promise.all(proms)

        res.status(200).send({ msg: "Recipe successfully created" })

    } catch (error) {
        next(error)
    }
})

/* post de prueba

{"title": "Cauliflower, Brown Rice, and Vegetable Fried Rice",
"summary": "Cauliflower, Brown Rice, and Vegetable Fried Rice might be a good recipe to expand your side dish recipe box. Watching your figure? This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe has <b>192 calories</b>, <b>7g of protein</b>, and <b>6g of fat</b> per serving. For <b>$1.12 per serving</b>, this recipe <b>covers 19%</b> of your daily requirements of vitamins and minerals. This recipe serves 8. This recipe from fullbellysisters.blogspot.com has 3689 fans. This recipe is typical of Chinese cuisine. From preparation to the plate, this recipe takes about <b>30 minutes</b>. Head to the store and pick up peas, broccoli, salt, and a few other things to make it today. Overall, this recipe earns an <b>awesome spoonacular score of 100%</b>. Users who liked this recipe also liked <a href=\"https://spoonacular.com/recipes/vegetable-fried-brown-rice-36199\">Vegetable Fried Brown Rice</a>, <a href=\"https://spoonacular.com/recipes/vegetable-fried-cauliflower-rice-933261\">Vegetable Fried Cauliflower Rice</a>, and <a href=\"https://spoonacular.com/recipes/easy-vegetable-fried-brown-rice-with-egg-802042\">Easy Vegetable Fried Brown Rice with Egg</a>.",
"spoonacularScore": 30,
"healthScore": 40,
"instructions": [
    "Remove the cauliflower's tough stem and reserve for another use. Using a food processor, pulse cauliflower florets until they resemble rice or couscous. You should end up with around four cups of \"cauliflower rice.\"",
    "Heat 1T butter and 1T oil in a large skillet over medium heat.",
    "Add garlic and the white and light green pieces of scallion. Sauté about a minute.",
    "Add the cauliflower to the pan. Stir to coat with oil, then spread out in pan and let sit; you want it cook a bit and to caramelize (get a bit brown), which will bring out the sweetness. After a couple of minutes, stir and spread out again.",
    "Add cold rice (it separates easily, so it won't clump up during cooking), plus the additional grapeseed and coconut oil or butter. Raise heat to medium-high. Toss everything together and, again, spread the mixture out over the whole pan and press a bit into the bottom.",
    "Let it sit for about two minutes—so the rice can get toasted and a little crispy.",
    "Add the peas and broccoli and stir again.",
    "Drizzle soy sauce and toasted sesame oil over rice.Cook for another minute or so and turn off heat.",
    "Add chopped scallion tops and toss.I like to toast some sesame seeds in a dry pan; I sprinkle these and some more raw, chopped scallion over the top of the rice for added flavor and crunch.Season to taste with salt and, if you'd like, more soy sauce. Keep in mind that if you're serving this with something salty and saucy (ie. teriyaki chicken) you may want to hold off on adding too much salt to the fried rice."
    ],
"image": "https://spoonacular.com/recipeImages/715594-312x231.jpg"}

post de prueba */

module.exports = router;