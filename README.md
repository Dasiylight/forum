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
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `uid` bigint(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
  |-- api  //api文件夹为与数据库的各个表连接接口
    |-- userApi.js
    |-- messageApi.js
  |-- src  //储存了网页的源码
    |-- components //留言板，登录，注册界面
      |-- forum.vue
      |-- logIn.vue
      |-- Register.vue
    |-- router //路由配置
      |--index.js
    |-- App.vue
    |-- main.js
  |-- db.js //配置数据库连接
  |-- index.js //定义与监听后端服务器
  |-- sqlMap.js  //保存实现对MySQL进行操作的语句
  |-- vue.config.js  //设置了跨域代理

```
### 内容参考
Vue: <https://cn.vuejs.org/v2/guide/>  
Element UI: <https://element.eleme.cn/>  

