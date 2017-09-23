var mongoose = require('mongoose')
var children = new mongoose.Schema({
    
})
var userSchame = new mongoose.Schema({
    'userId':String,
    'userName':String,
    'userPwd':String,
    'orderList':Array,
    cartList:[
        {
            'productId':String,
            'productName':String,
            'salePrice':Number,
            'productImage':String,
            'checked':String,
            'productNum':String
        }
    ],
    'addressList':Array
})

module.exports=mongoose.model('user',userSchame)