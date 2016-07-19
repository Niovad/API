let crypto = require('crypto');
let hash = crypto.randomBytes(4).toString('hex');

exports.register = {
  valid: function(test) {
    request.post('/register', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(res.statusCode, 201);
      test.equal(typeof res.body.id, 'number');
      test.done();
    });
  },

  alreadyUsed: function(test) {
    request.post('/register', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  }
};

exports.login = {
  erroneousPassword: function(test) {
    request.post('/login', {
      "login": "tmp" + hash,
      "password": "foobar41"
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  },

  noPassword: function(test) {
    request.post('/login', {
      "login": "tmp" + hash
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  },

  invalidLogin: function(test) {
    request.post('/login', {
      "login": crypto.randomBytes(16).toString('hex')
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  },

  valid: {
    stdUser: function(test) {
      request.post('/login', {
	"login": "tmp" + hash,
	"password": "foobar42"
      }, function(res) {
	global.token = res.body.token;
	test.equal(res.statusCode, 200);
	test.done();
      });
    },

    root: function(test) {
      request.post('/login', {
	"login": "root",
	"password": "foobar42"
      }, function(res) {
	global.rootToken = res.body.token;
	test.equal(res.statusCode, 200);
	test.done();
      });
    }
  }
};

exports.token = {
  sameToken: function(test) {
    request.post('/login', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(global.token, res.body.token);
      test.done();
    });
  },

  differentToken: function(test) {
    let hash = crypto.randomBytes(4).toString('hex');
    request.post('/register', {
      "login": "tmp" + hash,
      "password": "foobar42"
    }, function(res) {
      test.equal(res.statusCode, 201);
      request.post('/login', {
	"login": "tmp" + hash,
	"password": "foobar42"
      }, function(res) {
	test.notEqual(global.token, res.body.token);
	test.done();
      });
    });
  }
};

exports.get = {
  valid: function(test) {
    request.get('/user/1', function(res) {
      test.equal(res.statusCode, 200);
      test.equal(res.body.id, 1);
      test.equal(res.body.permissions.length > 0, true);
      test.done();
    });
  },

  invalid: function(test) {
    request.get('/user/-1', function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  },

  default: {
    unlogged: function(test) {
      request.get('/user', function(res) {
	test.equal(res.statusCode, 401);
	test.done();
      });
    },

    logged: function(test) {
      request.get('/user', global.token, function(res) {
	test.equal(res.statusCode, 200);
	test.equal(res.body.permissions.length, 0);
	test.done();
      });
    },

    rootUser: function(test) {
      request.get('/user', global.rootToken, function(res) {
	test.equal(res.body.login, 'root');
	test.equal(res.statusCode, 200);
	test.equal(res.body.permissions.length > 0, true);
	test.done();
      });
    }
  }
};
