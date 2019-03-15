var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET login */
// http://10.186.115.57:3000/login
router.get('/', function(req, res, next) {
  fs.readFile(__dirname + '/../views/login.html', (err, data) => { // 파일 읽는 메소드
      if (err) {
          return console.error(err); // 에러 발생시 에러 기록하고 종료
      }
      res.header("Content-Type", "text/html; charset=utf-8"); // header 설정
      res.send(data); // 브라우저로 전송   
  });
});


/* POST param parsing test */
// http://10.186.115.57:3000/login?param1=param1test&param2=param2test 
// req.params : /login:id
// req.query : url상의 ?a=b&c=d { a = b, b = c }
// req.body : form상의 key / value 쌍. { userid : "sungbin", password : "aaaaaaaa" }
router.post('/', function(req, res, next) {
  console.log("[POST] params(path) = ", req.params);
  console.log("[POST] query = ", req.query);
  data = "[POST] params = " + JSON.stringify(req.params);
  data = data + " query = " + JSON.stringify(req.query);
  console.log("[POST] = ", data);

  res.header("Content-Type", "text/html; charset=utf-8"); // header 설정
  console.log("req.params = ", JSON.stringify(req.params));
  res.send(req.params.userid); // 브라우저로 전송   

  console.log("userid = ", String(req.body.userid));
  res.send(req.params.userid); // 브라우저로 전송   

  console.log("password = ", req.body.password);
  res.send(req.params.password); // 브라우저로 전송   
});

module.exports = router;
