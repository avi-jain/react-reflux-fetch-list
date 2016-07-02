var Fetch = require('whatwg-fetch');
var baseURL = "http://localhost:6060";

var service = {
    get: function(url){
        return fetch(baseURL + url) //returns a JS promise
        .then(function(response){   //this is the JS promise
           return response.json();  // Will exclude stuff like headers
        });
    },
    post: function(url,ingredient){
        return fetch(baseURL + url,{
            headers: {
                "Accept" : "text/plain",
                "Content-Type" : "application/JSON"
            },
            method : "post",
            body : JSON.stringify(ingredient)
        })                                              //the second param is the options object.
        .then(function(response){
            return response;
        });
    }
};

module.exports = service;