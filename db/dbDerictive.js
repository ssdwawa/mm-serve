// 【客户管理模块用SQL语句】对象
var goodsQL = {
    // 列表展现用
    queryAll: 'SELECT *,(SELECT COUNT(*) FROM goods) as cnt FROM goods LIMIT ?,?',

    // 客户新增用
    insert: 'INSERT INTO goods VALUES(NULL, ?, ?, ?)',

    // 客户修改用
    getCustomerById: 'SELECT * FROM goods WHERE userid = ?',
    update: 'UPDATE goods SET ? WHERE userid = ?',

    // 客户删除用
    delete: 'DELETE FROM goods WHERE userid = ?',

    // 条件查询用
    Count: 'SELECT (SELECT COUNT(*) FROM goods WHERE productName  LIKE ? AND salePrice >=? AND salePrice <=?  LIMIT ?,?) AS cnt ' ,
    queryByProductName: 'SELECT * FROM goods  WHERE productName LIKE ? AND salePrice >=? AND salePrice <=? LIMIT ?,? ',
    queryByEmail: 'SELECT * FROM goods WHERE email LIKE ?',
    queryByMobile: 'SELECT * FROM goods WHERE mobile LIKE ?'
};

// 【客户管理模块用SQL语句】对象模块
module.exports = goodsQL;