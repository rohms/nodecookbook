const express = require('express');
const router = express.Router();
const { recipes } = require('../data');
const { validationResult, body } = require('express-validator');
router.use(express.json());


// Get all recepies
router.get('/', (req, res) => res.json(recipes))



// Get a single recipe
router.get('/:recipetitle', (req, res) => {
    const found = recipes.find(e => e.name === req.params.recipetitle);

    if(found) {
        res.json(found);
    } else {
        res.status(400).json({ msg: `No dish found with the name of ${req.params.recipetitle}`});
    }
});

// POST CREATE A recipe
router.post('/', (req, res) => {
    const newRecipe = {
        name: req.body.name,
        description: req.body.description,
        calories: req.body.calories,
        image: req.body.image,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        category: req.body.category,
    };
    recipes.push(newRecipe);
    res.json("Recipe added")
});

// Updating a recipe
router.put('/:recipetitle', (req, res) => {
     const found = recipes.find(e => e.name === req.params.recipetitle)
     if(!found) return res.status(404).send("Recipe doesn't exist");

     const {error} = validationResult(req);
     if (error) return res.status(400).send(error.details[0].message)
     const {name, description, calories, image, ingredients, steps, category} = req.body;

    if(found) {
                (found.name = req.body.name), 
                (found.ingredients = ingredients),
                (found.steps = steps),
                (found.description = description),
                (found.calories = calories),
                (found.image = image),
                (found.category = category),
                res.json(found);

     }

    }
     
     )

// Deleting a recipe
router.delete('/:recipetitle', (req, res) => {
    const found = recipes.find(e => e.name === req.params.recipetitle);

    if(found) {
        res.json({ msg: "Recipe deleted", recipes: recipes.filter(e => e.name !==req.params.name)});
        } else {
            res.status(400).json({ msg: `No recipe with the recipetitle of ${req.params.recipetitle}`});
        }

        const index = recipes.indexOf(found);
        recipes.splice(index,1);
});

module.exports = router;