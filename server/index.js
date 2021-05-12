const userApi = require("./api/userApi")
const messageApi = require("./api/messageApi")
const saveImage = require("./api/saveImage")
const readImage = require("./api/readImage")
const fs = require('fs')
const path = require('path')
const bodyParser =require("body-parser")
const express =require("express")
var cookieParser = require('cookie-parser');


const app = express()

// 把POST请求正文中的JSON数据解析为req.body属性
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
// 可以从请求读取cookie并在响应中设置cookie
app.use(cookieParser())

// 后端api路由
app.use('/api/user', userApi)
app.use('/api/message', messageApi)
app.use('/api/saveImage', saveImage)
app.use('/api/readImage', readImage)


// 监听端口
app.listen(3000);
console.log('success listen at port:3000......')
