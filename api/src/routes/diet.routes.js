const {Router} = require('express')
const router = Router()
const {Diet} = require('../db')
const {getAllDiets} = require('../controllers/diet_controller.js')


router.get('/', async(req,res,next) => {
    try {
        await getAllDiets()
        let dietInfo = await Diet.findAll()
        res.json(dietInfo)
    } catch (error) {
        next(error)
    }
})

module.exports = router;