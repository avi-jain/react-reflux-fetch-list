var React = require("react");
var ListItem = require("./ListItem.jsx");
var Reflux = require('reflux');
var Actions = require('../reflux/actions.jsx');
var IngredientsStore = require('../reflux/ingredients-store.jsx');

var List = React.createClass({
    mixins : [Reflux.listenTo(IngredientsStore, 'onChangeIngStore')],
    
    getInitialState : function(){
        return {input: "",ingredients : []};
    },
    componentWillMount : function(){
        Actions.getIngredients();
    },
    onChangeIngStore : function(event,ingredients){   // pass the same params as to trigger function
        this.setState({ingredients : ingredients});
    },
    onInputChange : function(e){
        this.setState({input: e.target.value}); 
    },
    onClick : function(e){
        if(this.state.input){
            Actions.postIngredient(this.state.input);
        }
        this.setState({input:""})
    },
    render: function(){
        var listItems = this.state.ingredients.map(function(item){
            return <ListItem key = {item.id} ingredient = {item.text} />;
        });
        return(
            <div>
                <input type="text" placeholder="Enter Item" value={this.state.input} onChange={this.onInputChange} />
                <button onClick={this.onClick} >Add Item</button>
                <ul>{listItems}</ul>
            </div>
        );
    }
});

module.exports = List;