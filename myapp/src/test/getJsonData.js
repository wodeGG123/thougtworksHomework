module.exports = function(type){
    var data = {}
    switch(type){
        case 0: data = require('../data/all.json');break;
        case 1: data = require('../data/physical.json');break;
        case 2: data = require('../data/virtual.json');break;
        default:break;
    }        
    if(data){         
       return data
    }
}