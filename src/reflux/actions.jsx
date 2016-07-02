var Reflux = require('reflux');

var Actions = Reflux.createActions([
    "getIngredients",
    "postIngredient"
]); // is an Array, not an object

module.exports = Actions;