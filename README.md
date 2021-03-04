# 简易留言版的实现

### 环境依赖
node v14.15.0  
vue.js v3.12.1  
MySQL


### 环境配置
```
npm install
node index //在根目录下运行
```

### 数据库配置说明
数据库采用本地数据库，db.js文件配置连接mysql数据库，数据表已事先在本地创建。  
数据库名：db2 (可在db.js处修改)  
表名：userinfo, message;  
message变量名：username, title, content;  
userinfo变量名：uid, username, password;


### 开发编译
```
npm run serve
//npm run build
```

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

