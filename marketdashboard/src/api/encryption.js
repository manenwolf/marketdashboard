var crypto = require('crypto');

export function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

export function hashPwd(salt, pwd) {
    salt ="fK2C1q6lANOdJKLoXTrar4XZ6iO2jh1oRW3oU+v0voKxaDIfchuN/BwTd5U9ClpLj9aLmvRBY+g63JUB0H9dsEYTg6EOt9Kg++I0bUTvQtAQhdr9VgiMaNhKjC948M23yk4jlTBydrNk6yyRZBEK4d4+sKp2PSjUowsKDt4DM/c="

  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}
