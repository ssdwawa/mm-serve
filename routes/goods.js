var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/dbconfig');
var goodsql = require('../db/dbDerictive');
// 使用dbconfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);


//商品指引和搜索
router.post('/index', (req, res, next) => {
    // mongoose.disconnect();
    var search = req.body.searchValue;
    // var sort = parseInt(req.param("sort"))
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pageSize'));
    let priceLevel = req.param('priceLevel');
    // let sort = req.body.sort
    // reg = new RegExp(search, 'i') //不区分大小写
    var minpr = ''
    var maxpr = ''
    // let params = {};
    let skip = (page - 1) * pageSize;
    // if(search!='') params.productName={$regex:reg};
    if (priceLevel != 'all') {
        console.log(priceLevel);
        switch (priceLevel) {
            case '0': minpr = 0; maxpr = 100; break;
            case '1': minpr = 100; maxpr = 500; break;
            case '2': minpr = 500; maxpr = 1000; break;
            case '3': minpr = 1000; maxpr = 5000; break;
        };
        console.log(` wtf ${minpr}`)
    }
    else {
        minpr = 0; maxpr = 9999999999999;
        console.log(` wtf ${minpr}`)
    }
    // else {
    //     params.productName={$regex:reg}
    //     console.log(`gaga ${params}`)
    //     console.log(params)
    // }
    // goods.count(params, function (err, count) {
    //     console.log(reg)
    //     console.log(`count is:${count}`)
    //     goods.find(params).skip(skip).limit(pageSize)
    //         .sort({ 'salePrice': sort })
    //         .exec(function (err, doc) {
    //             if (err) {
    //                 res.json(
    //                     {
    //                         status: 0,
    //                         msg: err.message
    //                     }
    //                 )
    //             }
    //             else if (doc.length != 0) {
    //                 res.json({
    //                     status: 1,
    //                     result: {
    //                         count: count,
    //                         list: doc
    //                     }
    //                 })
    //             }
    //             else {
    //                 res.json({
    //                     status: 2,
    //                     result: '你要的不存在'
    //                 })
    //             }
    //         })
    // })
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err)
        }
        else {
            connection.query(goodsql.Count, ['%' + search + '%', minpr, maxpr, skip, pageSize], function (err1, result1) {
                connection.query(goodsql.queryByProductName, ['%' + search + '%', minpr, maxpr, skip, pageSize], function (err2, result2) {
                    // console.log(result2)
                    // 释放连接
                    connection.release();
                    if (err2) {
                        res.json(
                            {
                                status: 0,
                                msg: err2.message
                            }
                        )
                    }
                    else if (result2.length != 0) {
                        res.json({
                            status: 1,
                            result: {
                                count: result1[0].cnt,
                                list: result2
                            }
                        })
                    }
                    else {
                        res.json({
                            status: 2,
                            result2: '你要的不存在'
                        })
                    }

                });
            })

        }

    })
})

//加入购物车
router.post('/addCart', (req, res, next) => {
    var UserId = '100000077',
        productId = req.body.productId,
        User = require('../modules/user');
    User.findOne({ userId: '100000077' }, function (err, userDoc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        }
        else {
            console.log(`userDoc:${userDoc}`);
            if (userDoc) {
                //验证是否已经购买，如果购买了那就加1
                let productItem = '';
                userDoc.cartList.forEach(function (item) {
                    if (item.productId == productId) {
                        productItem = item;
                        item.productNum++;
                    }
                });
                if (productItem) {
                    userDoc.save((err1, doc1) => {
                        if (err1) {
                            res.json({
                                status: '0',
                                msg: err1.message
                            })
                        }
                        else {
                            res.json({
                                status: '1',
                                msg: 'suc'
                            })
                        }
                    })
                }
                else {
                    goods.findOne({ productId: productId }, (err2, doc2) => {
                        if (err2) {
                            res.json({
                                status: '0',
                                msg: err2.message
                            })
                        }
                        else {
                            if (doc2) {
                                doc2.productNum = 1;
                                doc2.checked = 1;
                                userDoc.cartList.push(doc2);
                                userDoc.save((err3, doc3) => {
                                    if (err3) {
                                        res.json({
                                            status: '0',
                                            msg: err3.message
                                        })
                                    }
                                    else {
                                        res.json({
                                            status: '1',
                                            msg: 'suc'
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }
    })

})


module.exports = router