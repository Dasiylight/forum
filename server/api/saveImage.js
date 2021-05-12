const fs = require('fs');
const path = require('path');
const formatTime = require('silly-datetime');
const formidable = require('formidable');
const express = require('express');
const router = express.Router();

router.post('/upload', (req,res) => {
  let image = new formidable.IncomingForm();
  image.encoding = 'base64';
  image.uploadDir = path.join(__dirname, '../../img');
  image.keepExtensions = true;
  //图片最大为2M
  image.maxFieldsSize = 2 * 1024 *1024;
  //将数据格式化
  image.parse(req, (err, fields, files) => {
    let file = files.file;
    console.log(file.name)
    /* 如果出错，则拦截 */
    if(err) {
      return res.send({'status': 500, msg: '服务器内部错误', result: ''});
    }

    if(file.size > image.maxFieldsSize) {
      fs.unlink(image.path,(err) => {
        if (err) throw err;
        console.log('文件已被删除');
      });
      return res.send({'status': -1, 'msg': '图片不能超过2M', result: ''});
    }
    let extName = '';
    //判断图片的格式 只能为png和jpg
    switch (file.type) {
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
      case 'image/jpg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
    }
    if(extName.length === 0) {
      return res.send({'status': -1, 'msg': '只支持jpg和png格式图片', result: ''});
    }
    let time = formatTime.format(new Date(), 'YYYYMMDDHHmmss');
    let num = Math.floor(Math.random() * 8999 + 10000);
    //重命名文件
    let imageName = `${time}_${num}.${extName}`;
    let newPath = image.uploadDir + '/' + imageName;
    fs.rename(file.path, newPath, (err) => {
      if(err) {
        return res.send({'status': -1, 'msg': '图片上传失败', result: ''});
      } else {
        // return res.send({'status': 200, 'msg': '图片上传成功', result: {url: `http://localhost:3000/img/${imageName}`}});
        return res.send({'status': 200, 'msg': '图片上传成功', result: {url: `../img/${imageName}`}});
      }
    })
  })
});

module.exports = router;

