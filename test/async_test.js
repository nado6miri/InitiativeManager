var fs = require('fs');
var initapi = require('./javascripts/initapi');
var lgldap = require('../javascripts/lgeldap');
var moment = require('moment-timezone')
var ldap = require('../javascripts/lgeldap.js')
var initparse = require('../javascripts/parsejirafields');

moment.tz.setDefault("Asiz/Seoul");


var developerslist = {};

/*
  Save_JSON_file : 전달된 JSON객체를 filename(Path정보 포함)으로 저장한다.
*/
function Save_JSON_file(jsonObject, filename)
{
  var json = JSON.stringify(jsonObject);
  fse.outputFileSync(filename, json, 'utf-8', function(e){
    if(e){
      console.log(e);
    }else{
      console.log("Download is done!");	
    }
  });
}

/*
  load_DevelopersDB : filename(Path정보 포함)을 읽어 developerlist 객체(JSON)으로 Loading한다.
*/
function load_DevelopersDB(filename)
{
  return new Promise(function (resolve, reject) {
    fs.exists(filename, (exist) => {
      if(exist)
      {
        console.log("file is exist");
        let data = fs.readFileSync(filename, 'utf8');
        developerslist = JSON.parse(data); 
      }
      else
      {
        console.log('file Not Found! = ', filename);
        developerslist = {};   
      }
      resolve(developerslist);
    });      
  });
}


/*
  get_InitiativeList : Initiative List 정보를 얻어온다. Callback방식
*/
function get_InitiativeList()
{
  var xhttp = new XMLHttpRequest();
  // Callback
  xhttp.onreadystatechange = function()
  {
    if (xhttp.readyState === 4)
    {
      if (xhttp.status === 200)
      {
        var resultJSON = JSON.parse(xhttp.responseText);
        var json = JSON.stringify(resultJSON);
        console.log("Initiative List gathering ok");
        res.send('Initiative List gathering ok');
      }
      else
      {
        console.log("AJAX Error...............");
      }
    }
  };

  var searchURL = 'http://hlm.lge.com/issue/rest/api/2/search/';
  var param = '{ "jql" : "filter=Initiative_webOS4.5_Initial_Dev","maxResults" : 1000, "startAt": 0,"fields" : ["summary", "key", "assignee", "due", "status", "labels"] };';
  xhttp.open("POST", searchURL, true);
  xhttp.setRequestHeader("Authorization", "Basic c3VuZ2Jpbi5uYTpTdW5nYmluQDE5MDE=");
  xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhttp.send(param);
} 


function make_developerlist(username)
{
  if((username in developerslist) == false)
  {
    ldap.getLDAP_Info(username).then((result) => { 
      initparse.getPersonalInfo(result['displayName'], result['DepartmentCode'])
      .then((result) => { developerslist[username] = result; return result; }); 
    })
    .catch((error) => { console.log("[ERR] ldap.getLDAP_Info = ", error)});
  }
  else
  {
    return developerslist[username];
  }  
}

async function make_delayeddeveloperlist(username)
{
  console.log("[make_delayeddeveloperlist-enter]");
  await sleep(2000);
  console.log("[make_delayeddeveloperlist-exit]");
 
  return developerslist[username];
}

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}


function PromiseChaining1()
{
  console.log("[Enter] PromiseChaining 1");
  // return vs no return
  //return new Promise((resolve, reject) => {
  new Promise((resolve, reject) => {
      setTimeout(()=>{ resolve(1); }, 2000);
  })
  .then((result) => {
    console.log("result1 = ", result);
    result += 10;
    return result;
  })
  .then((result) => {
    console.log("result2 = ", result);
    result += 20;
    return result;
  })
  .then((result) => { 
    console.log("result3 = ", result);
    result += 30;
    return result;
  });
  console.log("[Exit] PromiseChaining 1");
}

/*
[참고자료]
https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EC%99%80-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%98-%EB%B6%80%EC%83%81-async-await%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BD%94%EB%94%A9-%ED%8C%81-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-df65ffb4e7e
https://programmingsummaries.tistory.com/325

비동기 처리의 경우 Callback 지옥(중첩) 및 코드 가독성에 문제가 발생하여 해결하고자 하는 방법

1. 비동기 방식 - response는 값일 가지고 있지 않다.
var response = ajax('https://example.com/api');
console.log(response); // `response` won't have the response 

2. Callback 방식으로 비동기 구현
ajax('https://example.com/api', function(response) {
    console.log(response); // `response` is now available
});


3. 비동기 통신에서 Callback 지옥 해결방법
  1). Callback 함수를 각각의 함수로 분리하여 생성 및 사용
  2). ES6 - Promise 사용 (three State : Pending, Fulfill, Reject)
     - Promise를 사용하면 callback 함수를 promisefunction.then((result)=>{}).catch((error)=>{}); 형태로 정리가능함.

        // case 0 : 바로 Promise 사용
        new Promise((resolve, reject) => {}).then((result) => {}).catch((error) => {});

        // case 1 : Promise 생성하여 변수에 담아 사용
        var promise_func = function(param) { return new Promise((resolve, reject) => {})}
        promise_func(param).then().catch();

        // case 2 : 다중 Promise 완료 후 실행방법 
        // Promise 객체일 경우에는 Promise.all([promise_func1, promise_func2]) 처럼 사용함.
        var promise_func1 = new Promise((resolve, reject)=> {});
        var promise_func2 = new Promise((resolve, reject)=> {});
        Promise.all([promise_func1, promise_func2]).then((result)=>{ console.log("모두 완료"); }).catch((error) => { console.log("error"); })

        // return을 통해 Promise 객체를 return할 경우에는 Promise.all([promise_func1(), promise_func2()]) 처럼 사용함.
        var promise_func1 = function() { return new Promise((resolve, reject)=> {}); }
        var promise_func2 = function() { return new Promise((resolve, reject)=> {}); }
        Promise.all([promise_func1(), promise_func2()]).then((result)=>{ console.log("모두 완료"); }).catch((error) => { console.log("error"); })

        // case 3 : Promise 다중연결 (Promise Chaining)
        function getData() { return new Promise({ }); }
        function parseValue() { return new Promise({ }); }
        function auth() { return new Promise({ }); }
        function diaplay() { return new Promise({ }); }
        getData(userInfo).then(parseValue).then(auth).then(diaplay).catch();

  3). async 사용
    async를 사용하면 암묵적으로 Promise를 생성하는 것과 같은 역할 ?
    await를 통해 코드의 가독성
    (Clean Code)
    async/await을 이용하면 훨씬 더 적은 코드만을 작성해도 됩니다. 다른 방식을 사용할 때 마다 해야 하는 불필요한 몇 가지 일을 하지 않아도 되기 때문입니다. 
    .then 을 붙이고 응답을 처리하기 위한 익명함수를 생성하고 또 그 콜백에서 응답을 받아오는 등의 일들이 그것입니다.
    (개선전)
    function loadData() {
        try { // Catches synchronous errors.
            getJSON().then(function(response) {
                var parsed = JSON.parse(response);
                console.log(parsed);
            }).catch(function(e) { // Catches asynchronous errors
                console.log(e); 
            });
        } 
        catch(e) { console.log(e); }
    }
    (개선후)
    async function loadData() {
        try {
            var data = JSON.parse(await getJSON());
            console.log(data);
        }
        catch(e) { console.log(e); }
    }

4. Event Loop
 시간의 흐름에 따라 코드의 수행을 처리하며 그때마다 JS Engine(V8, On-Demand환경)을 동작시킴. - Event Loop에 추가된 Callback 코드 실행
 이벤트루프는 하나의 단순한 임무만 갖고 있습니다. 콜스택과 콜백큐를 감시하는 것입니다. 만약 콜스택이 비어있으면 이벤트루프는 큐에서 
 첫 번째 이벤트를 가져다가 콜스태에 밀어 넣을 것이며 결과적으로는 해당 이벤트가 실행됩니다.
*/

function PromiseChaining2()
{
  console.log("[Enter] PromiseChaining 2");
  new Promise((resolve, reject) => {
      setTimeout(()=>{ resolve(1); }, 2000);
  })
  .then((result) => {
    console.log("result1 = ", result);
    result += 10;
    return result;
  })
  .then((result) => {
    console.log("result2 = ", result);
    result += 20;
    return result;
  })
  .then((result) => { 
    console.log("result3 = ", result);
    result += 30;
    return result;
  });
  console.log("[Exit] PromiseChaining 2");
}


async function Test_Function()
{
  console.log("[1] process.argv = ", process.argv);

  console.log("[2] read developers.json");
  await load_DevelopersDB('./public/json/developers.json').then((result) => {
    console.log("[2-TEST] Read developers DB = ", JSON.stringify(developerslist));
  });

  console.log("[3] make_delayeddeveloperlist");
  var info = make_delayeddeveloperlist("inmoon.kim");

  console.log("[4] make_developerlist");
  var orginfo = make_developerlist("inmoon.kim");
  
  console.log("[5] orginfo = ", orginfo);

  PromiseChaining1();
}  

Test_Function();
