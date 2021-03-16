# 简易留言版的实现

### 环境依赖
node v14.15.0  
vue.js v3.12.1  
MySQL


### 环境配置
```
npm install
cd server
node index 
```

### 数据库配置
```
CREATE DATABASE db2;
USE db2;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `uid` int(0) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `uid` bigint(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pic` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
```


### 开发编译
```
npm run serve
//npm run build
```

### 登录逻辑
![Image text](https://github.com/Dasiylight/forum/blob/master/img/flow.png)

### 目录结构
```
|-- forum
  |-- server  //服务器后端代码
      |-- App.vue
      |-- db.js //配置数据库连接
      |-- index.js //定义与监听后端服务器
      |-- sqlMap.js  //保存实现对MySQL进行操作的语句
      |-- api  //api文件夹为与数据库的各个表连接接口
        |-- userApi.js
        |-- messageApi.js
  |-- src  //储存了网页的源码
      |-- components //留言板，登录，注册界面
        |-- forum.vue
        |-- logIn.vue
        |-- Register.vue
        |-- router //路由配置
      |-- App.vue
      |-- main.js
      |-- cookies.js //定义cookies功能
  |-- vue.config.js  //设置了跨域代理

```

### 内容更新 
Version1.1:   
1. 增加了留言板显示翻页功能，4条为一页  
2. 增加了Cookie保存用户信息，保存时间为30分钟；增加路由守卫，防止未登录直接进入留言板。
3. 增加了头像上传功能，未上传时显示默认头像。（采用base64编码方式上传至数据库，数据库结构有改变）
4. 增加了显示留言时间功能
5. 下一步改进：采用Session替代Cookies，改进排版等，头像上传可尝试其他方法

### 内容参考
Vue: <https://cn.vuejs.org/v2/guide/>  
Element UI: <https://element.eleme.cn/>  

