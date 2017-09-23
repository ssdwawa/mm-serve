var mongoose = require('mongoose')

var schema = mongoose.Schema

var productSch = new schema({
    'productId':String,
    'productName':String,
    'salePrice':Number,
    'productImage':String
})

module.exports=mongoose.model('ga',productSch);