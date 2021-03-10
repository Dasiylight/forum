const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

class Jwt {
  constructor (data) {
    this.data = data ;
  }

  //生成token
  generateToken(){
    let data = this.data;
    let created = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(path.join(__dirname, './key/rsa_private_key.pem'));//私钥
    let token = jwt.sign({
      data,
      exp: created + 60 * 30,
    }, cert, {algorithm: 'RS256'});
    return token;
  }

  //校验token
  verifyToken() {
    let token = this.data;
    let cert = fs.readFileSync(path.join(__dirname, './key/rsa_public_key.pem'));//公钥
    let res;
    try {
      let result = jwt.verify(token, cert , {algorithms: ['RS256']}) || {};
      let {exp = 0} = result, current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (e) {
      res = 'err';
    }
    return res;
  }

}

module.exports = Jwt;
