var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http');
var fse = require('fs-extra');
var http = require('http');
var url = require('url');
var XMLHttpRequest = require('xmlhttprequest-ssl').XMLHttpRequest;

// User Define module....
var socketcomm = require('../javascripts/socket_comm');
var initapi = require('../javascripts/initiativemgr');

/* GET users listing. */
router.get('/', function(req, res, next) {
  socketcomm.socket_communication();
  res.writeHead(200, { 'Content-Type': 'text/html' }); // header 설정
  fs.readFile(__dirname + '/../views/initiative.html', (err, data) => { // 파일 읽는 메소드
      if (err) {
          return console.error(err); // 에러 발생시 에러 기록하고 종료
      }
      res.end(data, 'utf-8'); // 브라우저로 전송   
  });
});

/* GET users listing. */
router.get('/list', function(req, res, next) {
  socketcomm.socket_communication();
  // Use Callback
  initapi.get_InitiativeList(req, res, next);
});


/* GET users listing. */
router.get('/listP', function(req, res, next) {
  socketcomm.socket_communication();
  // Use Promise Object
  initapi.get_InitiativeListfromJira().then(function (data)
    {
      console.log("Initiative List gathering ok - Promise");
      console.log(data);
      res.send('Initiative List gathering ok - Promise');
    }).catch(function (err)
    {
      console.log("Initiative List gathering NG - Promise");
      console.log(err);
      res.send('Initiative List gathering NG - Promise');
    });
});

module.exports = router;

