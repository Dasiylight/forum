//sqlMap.js
var sqlMap = {
  // 用户
  userinfo: {
    add: 'insert into userinfo(username,password,pic) values(?, ?, ?)',
    search: 'select * from userinfo where username = ?',
    avatar: 'select pic from userinfo where username = ?'
  },
  message: {
    show: 'select * from ??',
    add: 'insert into message(username,title,content,time) values(?, ?, ?, ?)',
  }
}
module.exports = sqlMap;
