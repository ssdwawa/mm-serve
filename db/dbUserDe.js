//注册登陆用命令集
var usersSQL={
    // 客户新增用
    addUser: 'INSERT INTO userInfo VALUES(NULL, ?, ?)',
    //登陆
    login:'SELECT * FROM userInfo WHERE userName = ? AND userPwd =?',
    //加入购物车
    addCart:'INSERT INTO cart VALUES(Null,?,?,?,?,?,?,?)',
    //查询是否已在购物车中
    queryGoods:'SELECT * FROM cart WHERE productId = ? AND userId =?',
    //如果在就加一
    productNumAdd:'UPDATE cart set productNum=productNum+1 WHERE productId=? AND userId=? ',
    //当前购物车
    getCart:'SELECT * FROM cart WHERE userId = ?',
    //删除商品
    delete: 'DELETE FROM cart WHERE userId = ? AND productId = ?',
    //删除全部
    delete: 'DELETE FROM cart WHERE userId = ? ',
    //确认购买
    submit:'INSERT INTO confrimList(userId,productName,productImage,productPrice) VALUES ?',
    //添加地址
    addAddress:'INSERT INTO address VALUES(Null,?,?,?,?,?,0)',
    //加载购物地址
    loadAddress:'SELECT * FROM address WHERE userId =? ',
    //deleteAddress
    deleteAddress:'DELETE FROM address WHERE addressId = ?  AND userId = ?'
}
module.exports=usersSQL