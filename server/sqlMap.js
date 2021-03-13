//sqlMap.js
var sqlMap = {
  // 用户
  userinfo: {
    add: 'insert into userinfo(username,password) values(?, ?)',
    search: 'select * from userinfo where username = ?',
  },
  message: {
    show: 'select * from ??',
    add: 'insert into message(username,title,content,time) values(?, ?, ?, ?)',
  }
//   reader: {
//     add: 'insert into reader(name) values (?)',
//     delete: 'delete from reader where name = ?',
//     search: 'select * from reader where name = ?', //查找读者信息
//     borrowBook: 'update reader set lendBook1 = ? where name = ?'//更新用户表中的已借阅书籍
//   },
//   book: {
//     add: 'insert into book(name, author, stock) values (?, ?, ?)',
//     search: 'select * from book where name = ?',
//     borrowBook: 'update book set stock = ? , lendNum = ? where name = ?'//更新书籍表中的库存
//   }
}
module.exports = sqlMap;
