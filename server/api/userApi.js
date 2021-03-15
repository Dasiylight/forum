//userApi.js
const models = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../sqlMap')
// const JwtUtil = require('../jwt')

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
      conn.query(sql, [params.username, params.password, params.pic], function (err, result) {
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
  var password = req.body.password;
  console.log(params);
  conn.query(sql, [params.username, params.password], function (err, result) {
    if (err) {
      console.log(err)
    }
    //未找到用户名时
    else if (result[0] === undefined){
      res.send('-1');
    }
    else {
      console.log(result[0].password);
      // jsonWrite(res, result);
      if (password === result[0].password){
        // 登陆成功，添加token验证
        // let _id = result[0].username.toString();
        // 将用户id传入并生成token
        // let jwt = new JwtUtil(_id);
        // let token = jwt.generateToken();
        res.send({status:200,msg:'登陆成功'});
      }else {
        res.send({status:400,msg:'密码错误'})
      }
    }
  })
});

router.post('/searchAvatar', (req, res) =>{
  let sql = $sql.userinfo.avatar
  var params = req.body;
  conn.query(sql, [params.username], function (err, result) {
    if(err){
      console.log(err)
    }
    if (result[0] === undefined){
      console.log(result)
      res.send('-1')
    }
    // else if (result[0].pic === null){
    //   res.send('1')
    // }
    else{
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
