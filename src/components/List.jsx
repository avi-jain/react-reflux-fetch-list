var React = require("react");
var ListItem = require("./ListItem.jsx");
var Reflux = require('reflux');
var Actions = require('../reflux/actions.jsx');
var IngredientsStore = require('../reflux/ingredients-store.jsx');

var List = React.createClass({
    mixins : [Reflux.listenTo(IngredientsStore, 'onChangeIngStore')],
    
    getInitialState : function(){
        return {ingredients : []};
    },
    componentWillMount : function(){
        Actions.getIngredients();
    },
    onChangeIngStore : function(event,ingredients){   // pass the same params as to trigger function
        this.setState({ingredients : ingredients});
    },
    render: function(){
        var listItems = this.state.ingredients.map(function(item){
            return <ListItem key = {item.id} ingredient = {item.text} />;
        });
        return(
            <ul>{listItems}</ul>
        );
    }
});

module.exports = List;