const router = require('express').Router()
const {Coffee} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!
router.get('/', async (req,res,next) => {
    try {
        const coffees = await Coffee.findAll();
        res.send(coffees);
    } catch (error) {
        next(error);
    }
})

router.get('/ingredients/:ingredientName', async (req,res,next) => {
    try {
         const coffees = await Coffee.findByIngredient(req.params.ingredientName);
        res.send(coffees);
    } catch (error) {
        next(error);
    }
})

router.get('/:coffeeId', async (req,res,next) => {
    try {
        const id = req.params.coffeeId;
        const coffee = await Coffee.findByPk(id);
        if (coffee === null) {
            res.status(404).send("Coffee doesn't exist; page not found")
        }
        res.send(coffee)
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req,res,next) => {
    try {
        // const newCoffee = await Coffee.create(req.body);
        // wanted to use findOrCreate to be 'safer'
        const [newCoffee, created] = await Coffee.findOrCreate({
                                                where: req.body
                                                });
        res.status(201).send(newCoffee);
    } catch (error) {
        next(error)
    }
})

module.exports = router
