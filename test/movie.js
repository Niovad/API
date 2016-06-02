let crypto = require('crypto');
let hash = crypto.randomBytes(4).toString('hex');

exports.add = {
  unlogged: function(test) {
    request('/movie/add', {
      "title": "foobar" + hash,
      "release_date": "1999-03-31",
      "production_year": 1998
    }, function(res) {
      test.equal(res.statusCode, 401);
      test.done();
    });
  },

  valid: function(test) {
    request('/movie/add', global.token, {
      "title": "foobar" + hash,
      "release_date": "1999-03-31",
      "production_year": 1998
    }, function(res) {
      test.equal(res.statusCode, 201);
      test.done();
    });
  },

  duplicate: function(test) {
    request('/movie/add', global.token, {
      "title": "foobar" + hash,
      "release_date": "1999-03-31",
      "production_year": 1998
    }, function(res) {
      test.equal(res.statusCode, 400);
      test.done();
    });
  }
};

//This assume that the movie with id 1 exists. We must retrieve the last movie inserted
exports.get = {
  unlogged: function(test) {
    request('/movie/get/1', function(res) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },

  logged: function(test) {
    request('/movie/get/1', global.token, undefined, function(res) {
      test.equal(res.statusCode, 200);
      test.done();
    });
  },

  notExisting: function(test) {
    request('/movie/get/toto', global.token, undefined, function(res) {
      test.equal(res.statusCode, 404);
      test.done();
    });
  }
};