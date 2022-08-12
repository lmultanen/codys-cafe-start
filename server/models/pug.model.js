const Sequelize = require('sequelize')
const db = require('./database')
const Coffee = require('./coffee.model')

const Pug = db.define('pugs', {
  // your code here
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  biography: {
    type: Sequelize.TEXT
  }
})

Pug.prototype.isPuppy = function() {
  return this.age < 1;
}

Pug.prototype.shortBio = function() {
  let sentences = this.biography.split(/[.!?]/g);
  return sentences[0];
}

Pug.findByCoffee = async function(favorite) {
  console.log('LOGGING STUFF HERE')
  const pugs = await Pug.findAll({
    include: {
      model: Coffee,
      as: 'favoriteCoffee',
      where: {
        name: favorite
      }
    }
  })
  return pugs
}

Pug.beforeSave((pug) => {
  pug.name = pug.name.charAt(0).toUpperCase() + pug.name.slice(1);
})

Coffee.hasMany(Pug)
Pug.belongsTo(Coffee, {as: 'favoriteCoffee'})
Pug.belongsToMany(Pug, {through: 'pug_friends', as: 'friends'})

module.exports = Pug
