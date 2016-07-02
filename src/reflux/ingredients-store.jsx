var Reflux = require('reflux');
var HttpService = require('../services/httpservice.js');
var Actions = require('./actions.jsx');

var IngredientsStore = Reflux.createStore({
    listenables : [Actions],                 //listenables is a predef keyword in Reflux
    
    getIngredients : function(){             // give exact same names as actions
        HttpService.get('/ingredients')
        .then(function(jsondata){
            this.ingredients = jsondata;
            this.fireUpdate();
        }.bind(this)); //IMPORTANT
    },
    postIngredient : function(text){
        
    },
    fireUpdate  : function(){
        this.trigger('change',this.ingredients);                 //trigger is a inbuilt reflux function for the store. change - event
    }                                       // instead of repeating this line everywhere, make a separate trigger update function
});

module.exports = IngredientsStore;