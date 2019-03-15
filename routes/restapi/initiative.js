var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http');
var fse = require('fs-extra');
var http = require('http');
var url = require('url');
var XMLHttpRequest = require('xmlhttprequest-ssl').XMLHttpRequest;

// User Define module....
var socketcomm = require('../../javascripts/socket_comm');
var initiativemgr = require('../../javascripts/initiativemgr');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8"); // header 설정
  //res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // header 설정
  var filename = "initiative_DB_46093_Latest.json";
  switch(req.params.id)
  {
    case "webOS4.5_Initial" :
      console.log("req.params.id == webOS4.0_Initial");
      filename = "initiative_DB_39490_Latest.json"
      break;
    case "webOS4.5_MR_Minor" :
      console.log("req.params.id == webOS4.5_MR_Minor");
      filename = "initiative_DB_46093_Latest.json"
      break;
    case "webOS4.5_MR_Major" :
      console.log("req.params.id == webOS4.5_MR_Major");
      filename = "initiative_DB_46117_Latest.json"
      break;
    case "webOS5.0_Initial" :
      console.log("req.params.id == webOS5.0_Initial");
      filename = "initiative_DB_45402_Latest.json"
      break;
    case "SEETV" :
      console.log("req.params.id == SEETV");
      filename = "initiative_DB_45938_Latest.json"
      break;
    case "webOS5.0_Initial(SEETV)" :
      console.log("req.params.id == webOS5.0_Initial(SEETV)");
      filename = "initiative_DB_45400_Latest.json"
      break;
    case "developers" :
      console.log("req.params.id == developers");
      filename = "developers.json"
      break;
    default:
      res.send({"err msg" : "Can't find your request data"}); // 브라우저로 전송  
      filename = null;
      break;
  }

  if(filename !== null)
  {
    fs.readFile(__dirname + "/../../public/json/" + filename, (err, data) => { // 파일 읽는 메소드
        if (err) {
          res.send({"err msg" : "Can't find raw data = " + filename}); // 브라우저로 전송   
          return console.error(err); // 에러 발생시 에러 기록하고 종료
        }
        //res.end(data, 'utf-8'); // 브라우저로 전송   
        res.send(data); // 브라우저로 전송   
    });
  }
});

/* GET users listing. */
router.get('/update/:id', function(req, res, next) {
  let filterID = 0;
  let msg = "None"
  switch(req.params.id)
  {
    case "webOS4.5_Initial" :
      console.log("req.params.id == webOS4.0_Initial");
      filterID = 39490;
      break;
    case "webOS4.5_MR_Minor" :
      console.log("req.params.id == webOS4.5_MR_Minor");
      filterID = 46093;
      break;
    case "webOS4.5_MR_Major" :
      console.log("req.params.id == webOS4.5_MR_Major");
      filterID = 46117;
      break;
    case "webOS5.0_Initial" :
      console.log("req.params.id == webOS5.0_Initial");
      filterID = 45402;
      break;
    case "SEETV" :
      console.log("req.params.id == SEETV");
      filterID = 45938;
      break;
    case "webOS5.0_Initial(SEETV)" :
      console.log("req.params.id == webOS5.0_Initial(SEETV)");
      filterID = 45400;
      break;
  }
  //initiativemgr.makeSnapshot_InitiativeListfromJira("keyID", "TVPLAT-16376");   // webOS4.5 MR minor airplay
  initiativemgr.makeSnapshot_InitiativeListfromJira("filterID_KeyListOnly", filterID);   
  res.header("Content-Type", "text/html; charset=utf-8"); // header 설정
  msg = "Trigger OK!!! " + "[Platform] = " + req.params.id + " FIlter ID = " + String(filterID) +" http://hlm.lge.com/issue/issues/?filter="+String(filterID)
  res.send(msg); // 브라우저로 전송   
});

/* GET param parsing test */
router.get('/getparam/:id', function(req, res, next) {
  console.log("params(path) = ", req.params);
  console.log("query = ", req.query);
  data = "params = " + JSON.stringify(req.params);
  data = data + " query = " + JSON.stringify(req.query);
  console.log("data = ", data);
  res.header("Content-Type", "text/html; charset=utf-8"); // header 설정
  res.send(data); // 브라우저로 전송   
});

/* POST param parsing test */
router.post('/postparam/:id', function(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'}); // header 설정
  data = "FEEDBACK ID = " + String(req.params.id);
  console.log("data = ", data);
  console.log("[default] query = ", req.query);
  res.end(data, 'utf-8'); // 브라우저로 전송   
});

/* PUT param parsing test */
router.put('/putparam/:id', function(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'}); // header 설정
  data = "FEEDBACK ID = " + String(req.params.id);
  console.log("data = ", data);
  console.log("params = ", req.params);
  res.end(data, 'utf-8'); // 브라우저로 전송   
});



module.exports = router;

