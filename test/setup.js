var proxyquire = require('proxyquire').noCallThru(),
  application, ditchMock, authMock, validateApiMock;
var assert = require('assert');

exports.setUp = function(finish) {
  require('./fixtures/env.js');
  ditchMock = require('./fixtures/db');
  authMock = require('./fixtures/authcall.js');
  validateApiMock = require('./fixtures/validate_key_call.js');
  application = proxyquire('./fixtures/application.js', {
    'main.js': require('./fixtures/main.js'),
    'fh-mbaas-api': require('../test/fixtures/mockAPI.js')
  });
  finish();
};

exports.tearDown = function(finish) {
  application.close();
  // Note: can't run the accept tests individually if these checks are enabled (as they nock endpoints are not hit in every test)
  //ditchMock.done();
  //authMock.done();
  finish();
};