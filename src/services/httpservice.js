var Fetch = require('whatwg-fetch');
var baseURL = "http://localhost:6060";

var service = {
    get: function(url){
        return fetch(baseURL + url) //returns a JS promise
        .then(function(response){   //this is the JS promise
           return response.json();  // Will exclude stuff like headers
        });
    }
    
};

module.exports = service;