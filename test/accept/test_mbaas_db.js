var request = require('request');
var nock = require('nock');
var assert = require('assert');

module.exports = {
  "setUp" : function(finish){

    finish();
  },
  "test DB call with correct api key and user key" : function(finish){
    request.post(process.env.FH_TEST_HOSTNAME + '/mbaas/db/',
    {
      json:{
        "act": "list",
        "type": "myFirstEntityy",
	      "__fh":{"appkey":"testkey","userkey":"akey"}
      },
      headers : {
        'Content-Type' : 'application/json',
        "x-fh-auth-app":"testkey"
      }
    }, function(err, response, data){
      assert.ok(!err);
      assert.ok(data.list);
      assert.ok(typeof data.count === "number");
      finish();
    });
  },
  "test mbaas DB call with incorrect api key" : function(finish){
    request.post(process.env.FH_TEST_HOSTNAME + '/mbaas/db/',
    {
      json:{
        "act": "list",
        "type": "myFirstEntityy"
      },
      headers : {
        'Content-Type' : 'application/json',
        "x-fh-auth-app":"wrongkey"
      }
    }, function(err, response, data){
      assert.ok(response.statusCode === 401);
      //assert.ok(data.message === 'invalid key');
      finish();
    });
  },
  "test mbaas DB call with no user api key" : function(finish){
    request.post(process.env.FH_TEST_HOSTNAME + '/mbaas/db/',
      {
        json:{
          "act": "list",
          "type": "myFirstEntityy",
          "__fh":{"appkey":"testkey"}
        },
        headers : {
          'Content-Type' : 'application/json',
          "x-fh-auth-app":"testkey"
        }
      }, function(err, response, data){
        assert.ok(response.statusCode === 401);
        finish();
      });
  },
  tearDown : function(finish){
    finish();
  }
};