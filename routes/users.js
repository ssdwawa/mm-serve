var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/dbconfig');
var userSQL = require('../db/dbUserDe');
// 使用dbconfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
  var params = [
    req.body.userName,
    req.body.userPwd
  ]
  console.log(`user:${params}`)

  pool.getConnection((err, connection) => {
    connection.query(userSQL.login, params, (err, doc) => {
      connection.release()
      console.log(doc[0])
      if (err) {
        res.json({
          status: 0,
          result: err.message
        })
      }
      else if (doc[0]) {
        console.log(doc)
        res.cookie('userId', doc[0].userId, {

          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie('userName', doc[0].userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.json({
          status: 1,
          result: {
            userName: doc[0].userName
          }
        })
      }
      else {
        res.json({
          status: 2,
          result: '账号密码错误'
        })
      }
    })
  })
})

router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  });
  res.cookie('userName', '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: 1
  })
})
router.post('/reg', (req, res, next) => {
  var userName = req.body.userName;
  var userPwd = req.body.userPwd;
  pool.getConnection((err, connection) => {
    connection.query(userSQL.addUser, [userName, userPwd], function (err, result) {
      connection.release()
      if (err) {
        res.json(
          {
            status: 0,
            msg: err.message
          }
        )
      }
      else {
        res.json({
          status: 1,
          result: '注册成功'
        })
      }
    })
  })

})
//检测是否还在登陆
router.get('/checkLogin', (req, res, next) => {
  if (req.cookies.userId) {
    res.json({
      status: 1,
      result: req.cookies.userName
    })
  }
  else {
    res.json({
      status: 0,
      result: `没有登陆`
    })
  }
})
//添加购物车
router.post('/addCart', (req, res, next) => {
  var params = [
    req.body.userId,
    req.body.productId,
    req.body.productName,
    req.body.salePrice,
    req.body.productImage,
    req.body.productNum,
    req.body.isChecked
  ]
  console.log(params);
  pool.getConnection((err, connection) => {
    connection.query(userSQL.queryGoods, [params[1], params[0]], (err, result) => {
      console.log(`is?${result}`)
      if (result != '') {
        connection.query(userSQL.productNumAdd, [params[1], params[0]], (err, doc) => {
          connection.release()
          if (err) {
            res.json({
              status: 0,
              result: err.message
            })
          }
          else if (doc) {
            console.log(`de1:${doc}`)
            res.json({
              status: 1,
              result: '添加成功'
            })
          }
        })
      } else {
        connection.query(userSQL.addCart, params, (err, doc) => {
          connection.release()
          if (err) {
            res.json({
              status: 0,
              result: err.message
            })
          }
          else if (doc) {
            console.log(`de2:${doc}`)
            res.json({
              status: 1,
              result: '添加成功'
            })
          }

        })
      }
    })

  })
})
//得到购物车数量
router.post('/getCart', (req, res, next) => {
  var userId = req.body.userId
  pool.getConnection((err1, connection) => {
    connection.query(userSQL.getCart, [userId], (err2, doc) => {
      connection.release()
      if (err2) {
        res.json({
          status: 0,
          result: err.message
        })
      }
      else if (doc) {
        console.log(doc)
        res.json({
          status: 1,
          result: doc.length,
          msg: doc
        })
      }
      else {
        res.json({
          status: 1,
          result: '购物车为空',

        })
      }
    })
  })

})
//删除商品
router.post('/deleteProduct',(req,res,next)=>{
  var params = [
    req.body.userId,
    req.body.productId
  ]
  pool.getConnection((err1,connection)=>{
    connection.query(userSQL.delete,params,(err3,doc)=>{
      if(doc){
        res.json({
          status:1,
          result:'删除成功'
        })
      }
    })
  })
})
router.post('/submit',(req,res,next)=>{
  var params = req.body.comProduct;
  console.log(params)
  var arr=[];
  var brr=[];
  for (var i=0;i<params.length;i++){
    brr.push(params[i].userId);
    brr.push(params[i].productName);
    brr.push(params[i].productImage);
    brr.push(params[i].productNum*params[i].salePrice);
    arr.push(brr)
    brr=[]
  }
  console.log(arr[0][1])
  pool.getConnection((err,connection)=>{
      connection.query(userSQL.submit,[arr],(err1,doc)=>{
        console.log(doc);
        if(doc){
          res.json({
            status:1,
            result:'添加成功'
          })
        }
        if(err1){
          console.log(err1)
        }
      });
      connection.query(userSQL.delete,[params[0].userId],(err2,doc2)=>{
        connection.release()
        if(doc2){
          console.log(doc2)
        }
      })
  })
})
//添加新的地址
router.post('/addAddress',(req,res,next)=>{
  var params = 
  [
    req.body.userId,
    req.body.addressprov,
    req.body.addressshi,
    req.body.addressaccute,
    req.body.phone
  ]
  pool.getConnection((err1,connection)=>{
      if(connection){
          connection.query(userSQL.addAddress,params,(err2,doc1)=>{
            if(doc1){
              res.json({
                status:1,
                msg:'添加成功'
              })
            }
            if(err2){
              console.log(`err is ${err2}`)
            }
          })
      }
  })
})
//删除的地址
router.post('/deleteAddress',(req,res,next)=>{
  var params = 
  [
    req.body.addressId,
    req.body.userId,
  ]
  console.log(params)
  pool.getConnection((err1,connection)=>{
      if(connection){
          connection.query(userSQL.deleteAddress,params,(err2,doc1)=>{
            if(doc1){
              res.json({
                status:1,
                msg:'删除成功'
              })
            }
            if(err2){
              console.log(`err is ${err2}`)
            }
          })
      }
  })
})
//加载购物地址
router.post('/loadAddress',(req,res,next)=>{
  var userId = req.body.userId
  pool.getConnection((err1,connection)=>{
    if(connection){
      connection.query(userSQL.loadAddress,[userId],(err2,doc)=>{
        if(doc){
          res.json({
            status:1,
            result:doc

          })
        }
      })
    }
  })
})
//加载购物车列表
// router.get('/checkCart', (req, res, next) => {
//   var UserId = req.cookies.userId;
//   // Users.count({ userId:UserId}, (err, count) => {
//   // Users.find({ userId: UserId }, (err, doc) => {
//   //   if (err) {
//   //     res.json({
//   //       status: 0,
//   //       msg: '',
//   //       result: ''
//   //     })
//   //   } else if (doc) {
//   //     res.json(
//   //       {
//   //         status: 1,
//   //         Count: doc[0].cartList.length,
//   //         result: doc[0].cartList,
//   //       }
//   //     )
//   //   }
//   // })
//   // })
//   pool.getConnection((err2, connection) => {
//     connection.query(userSQL.getCart, [UserId], (err3, doc) => {
//       if (err) {
//         res.json({
//           status: 0,
//           msg: '',
//           result: ''
//         })
//       }
//       else if(doc){

//       }
//     })

//   })
// })
module.exports = router;
