//userApi.js
var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 增加用户接口
//发送req，返回res
router.post('/addUser', (req, res) => {
  var sql = $sql.userinfo.add;
  var sql_name = $sql.userinfo.search
  var params = req.body;
  console.log(params);
  conn.query(sql_name,params.username,function(err,result) {
    if (err) {
      console.log(err);
    }
    //无重复用户名时，添加用户名，注册成功
    if (result[0] == undefined) {
      conn.query(sql, [params.username, params.password], function (err, result) {
        if (err) {
          console.log(err);
        }
        if (result) {
          jsonWrite(res, result);
        }
      })
    }else {
      res.send('-1')  //存在用户名时，返回-1值，注册不成功
    }
  })
});


router.post('/searchUser', (req, res) => {
  var sql = $sql.userinfo.search
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.username, params.password], function (err, result) {
    if (err) {
      console.log(err)
    }
    //未找到用户名时
    else if (result[0] == undefined){
      res.send('-1');
    }
    else {
      console.log(result)
      jsonWrite(res, result)
    }
  })
});
//
// router.post('/readerBorrow', (req, res) => {
//   var sql = $sql.reader.borrowBook
//   var params = req.body
//   console.log(params)
//   conn.query(sql, [params.readerName, params.bookName], function (err, result) {
//     if (err) {
//       console.log(err)
//     }
//     if (result) {
//       jsonWrite(res, result)
//     }
//   })
// })

module.exports = router
