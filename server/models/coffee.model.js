const Sequelize = require('sequelize')
const db = require('./database')
const Op = Sequelize.Op;

const Coffee = db.define('coffee', {
  // your code here
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

Coffee.prototype.getIngredients = function() {
  const arr = this.ingredients;
  return arr.join(', ');
}

Coffee.findByIngredient = async function(ingredient) {
  const coffees = await Coffee.findAll({
    where: {
      ingredients: {
        [Op.contains]: [ingredient]
      }
    }
  })
  return coffees;
}

//HOOKS
Coffee.afterCreate(async(coffee) => {
  if (!coffee.ingredients.includes('love')) {
    const newArr = coffee.ingredients;
    newArr.push('love');
    coffee.ingredients = newArr;
    await coffee.save();
  }
})
Coffee.afterUpdate(async(coffee) => {
  if (!coffee.ingredients.includes('love')) {
    const newArr = coffee.ingredients;
    newArr.push('love');
    coffee.ingredients = newArr;
    await coffee.save();
  }
})

module.exports = Coffee
