const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const iconv = require('iconv-lite')
const http = require('http')

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

router.post('/read',(req,res) => {
  console.log(req.body.addr)
  let imagePath = req.body.addr
  fs.readFile(imagePath ,'binary', function (err, file) {
    if (err) {
      console.log(err)
      return
    } else {
      // console.log(file)
      console.log('输出文件')
      let decodeFile = iconv.decode(file, 'base64')
      console.log(decodeFile)
      // res.writeHead(200, { 'Content-Type': 'image/jpeg' })
      // res.write(decodeFile, 'binary')
      // res.end()
      jsonWrite(res,decodeFile)
    }
  });
})

module.exports = router;
