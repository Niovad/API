let crypto = require('crypto');
let sendResponse = require('./sendResponse');

module.exports = function() {
  // token: login
  let tokens = {};
  // login: {token, id, permissions}
  let users = {};

  this.getId = function(t) {
    return users[tokens[t]].id;
  }

  this.authenticate = function(res, id, login, permissions) {
    login = login.trim();
    if (users[login]
	&& users[login].token)
      sendResponse(res, 200, {status: "OK", token: users[login].token});
    else {
      let t = crypto.randomBytes(32).toString('hex');
      users[login] = {token: t, id: parseInt(id), permissions: permissions}
      tokens[t] = login;
      sendResponse(res, 200, {status: "OK", token: t});
    }
  }

  this.checkAuthentication = function(req, res, next) {
    if (req.headers.token === undefined)
      sendResponse(res, 401, {status: "Error", message: "You need to be logged to do it"});
    else if (tokens[req.headers.token] === undefined)
      sendResponse(res, 401, {status: "Error", message: "Invalid token"});
    else {
      req.headers.login = tokens[req.headers.token].login;
      req.body.token = req.headers.token;
      next(req, res);
    }
  }
}
