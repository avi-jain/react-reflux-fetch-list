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
        if(!this.ingredients){
            this.ingredients = [];          // to prevent errors
        }
        var ingredient = {
            "text" : text,
            "id" :   Math.floor(Date.now()/1000) + text
        };
        this.ingredients.push(ingredient);
        this.fireUpdate();
        HttpService.post('/ingredients')
            .then(function(response){
                this.getIngredients();
            }.bind(this));
        
    },
    fireUpdate  : function(){
        this.trigger('change',this.ingredients);                 //trigger is a inbuilt reflux function for the store. change - event
    }                                       // instead of repeating this line everywhere, make a separate trigger update function
});

module.exports = IngredientsStore;