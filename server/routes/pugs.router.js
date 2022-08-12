const router = require('express').Router()
const {Pug} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/pugs!

router.get('/', async (req,res,next) => {
    try {
        const pugs = await Pug.findAll();
        res.send(pugs)
    } catch (error) {
        next(error)
    }
})

router.get('/favoriteCoffee/:favoriteCoffeeName', async (req,res,next) => {
    try {
        const favorite = req.params.favoriteCoffeeName;
        const pugs = await Pug.findByCoffee(favorite);
        res.send(pugs);
    } catch (error) {
        next(error)
    }
})

router.get('/:pugId', async (req,res,next) => {
    try {
        const pug = await Pug.findByPk(req.params.pugId);
        if (pug === null) {
            res.status(404).send('Pug does not exist; page not found');
        }
        res.send(pug);
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req,res,next) => {
    try {
        const [newPug, created] = await Pug.findOrCreate({
            where: req.body
        })
        res.status(201).send(newPug)
    } catch (error) {
        next(error)
    }
})

module.exports = router
