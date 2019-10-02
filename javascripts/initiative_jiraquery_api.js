var fs = require('fs');
var http = require('http');
var fse = require('fs-extra');
var http = require('http');
var url = require('url');
var XMLHttpRequest = require('xmlhttprequest-ssl').XMLHttpRequest;
var initparse = require('./parsejirafields');
var ldap = require('./lgeldap.js')
var moment = require('moment-timezone');
const secret = require('./configuration');

// Javascript 비동기 및 callback function.
// https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/
// Use Promise Object
/*
  get_InitiativeListfromJira : Initiative List 정보를 얻어 온다.
  querymode : (filterID_KeyListOnly) filterID로 검색된 Initiative List를 얻어 온다. (field항목 최소화)
              (filterID) filterID로 검색된 Initiative List를 얻어 온다. (field항목 상세정보)
              (KeyID) Initiative Key 기반으로 검색된 Initiative 정보를 얻어온다. (field항목 상세정보)
  jql       : (filterID_KeyListOnly) filterID 값 46093
              (filterID) filterID 값 46093
              (KeyID) Initiative Key 값 'TVPLAT-XXXX'
  withChglog: (true) Initiative List 정보에 Changelog 정보까지 가져온다.
              (false) Initiative List 정보에 Changelog 정보까지 가져오지 않는다.
*/
function get_InitiativeListfromJira(querymode, jql, withChglog)
{
    return new Promise(function (resolve, reject){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4)
        {
          if (xhttp.status === 200)
          {
            var resultJSON = JSON.parse(xhttp.responseText);
            Save_JSON_file(resultJSON, "./public/json/Initiative_list.json");
            resolve(resultJSON);
          }
          else
          {
            console.log("get_InitiativeListfromJira -- xhttp.status Error = ", xhttp.status)
            reject(xhttp.status);
          }        
      }
    }

    if(querymode == "filterID" || querymode == 'filterID_KeyListOnly')
    { // search by filterID
      filterID = "filter="+jql.toString();
    }
    else
    { // search by key...
      filterID = "type = Initiative and key="+jql.toString();
    }

    let searchURL = null;
    if(withChglog === true) { searchURL = 'http://hlm.lge.com/issue/rest/api/2/search/?expand=changelog'; }
    else { searchURL = 'http://hlm.lge.com/issue/rest/api/2/search/'; }
    console.log("get_InitiativeListfromJira : filterID = ", filterID);
    console.log("get_InitiativeListfromJira : searchURL = ", searchURL);

    let fielddata = ["summary", "key", "assignee" ];
    let param = {};
    //var param = '{ "jql" : "filter=Initiative_webOS4.5_Initial_Dev","maxResults" : 1000, "startAt": 0,"fields" : ["summary", "key", "assignee", "due", "status", "labels"] };';
    //var param = { "jql" : filterID, "maxResults" : 1000, "startAt": 0,"fields" : [ ] };
    if(querymode == 'filterID_KeyListOnly')
    {
      fielddata = ["summary", "key", "assignee" ];
    }
    else
    {
      fielddata = ["summary", "key", "assignee", "due", "status", "labels", "issuelinks", "resolution", "components", "issuetype", "customfield_15926",
                    "customfield_15710", "customfield_15711", "customfield_16988", "customfield_16984", "customfield_16983", "customfield_15228", 
                    "customfield_16986", "created", "updated", "duedate", "resolutiondate", "labels", "description", "fixVersions", "customfield_15104", 
                    "reporter", "assignee", "customfield_10105", "customfield_16985", "customfield_16987",];
    }

    if(withChglog === true)
    {
      param = { "jql" : filterID, "maxResults" : 1000, "startAt": 0, "expand" : ["changelog"], "fields" : fielddata, };
    }
    else
    {
      param = { "jql" : filterID, "maxResults" : 1000, "startAt": 0, "fields" : fielddata, };
    }

    //console.log("param=", JSON.stringify(param));
    xhttp.open("POST", searchURL, true);
    xhttp.setRequestHeader("Authorization", secret.Authtoken);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify(param));  
  });
}

/*
  get_ChangeLogfromJira : JIRA Key를 전달받아 Change Log 정보를 얻어 온다.
*/
function get_ChangeLogfromJira(querymode, filtervalue)
{
    return new Promise(function (resolve, reject){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4)
        {
          if (xhttp.status === 200)
          {
            var resultJSON = JSON.parse(xhttp.responseText);
            Save_JSON_file(resultJSON, "./public/json/Changlog.json");
            resolve(resultJSON);
          }
          else
          {
            console.log("get_ChangeLogfromJira -- xhttp.status Error = ", xhttp.status)
            reject(xhttp.status);
          }        
      }
    }

    // search by key...
    var filterjql = 0; 
    if(querymode == "filterID" || querymode == 'filterID_KeyListOnly')
    { // search by filterID
      filterjql = "filter="+filtervalue.toString();
    }
    else
    { // search by key...
      filterjql = "key="+filtervalue.toString();
    }

    var searchURL = 'http://hlm.lge.com/issue/rest/api/2/search/?expand=changelog';
    var param = { "jql" : filterjql, "maxResults" : 1000, "startAt": 0,
                  "expand" : ["changelog"], 
                  "fields" : ["summary", "key", "assignee", "due", "status", "labels", "resolution", "components", "issuetype",  "created", "updated", 
                              "duedate", "resolutiondate", "labels", "reporter"] };

    //console.log("param=", JSON.stringify(param));
    xhttp.open("POST", searchURL, true);
    xhttp.setRequestHeader("Authorization", secret.Authtoken);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify(param));  
  });
}



/*
  getEpicListfromJira : Initiative Key를 전달받아 하위에 연결된 Epic List를 얻어 온다.
*/
function getEpicListfromJira(initiativeKey)
{
  return new Promise(function (resolve, reject){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4)
      {
        if (xhttp.status === 200)
        {
          var resultJSON = epic_FilterResult = JSON.parse(xhttp.responseText);
          var json = JSON.stringify(resultJSON);
          resolve(resultJSON);
        }
        else
        {
          console.log("getEpicListfromJira -- xhttp.status Error = ", xhttp.status)
          reject(xhttp.status);
        }        
      }
    }

    let filterjql = '(issuetype = epic) AND issuefunction in linkedissuesOf(\"key=' + initiativeKey + '\"' + ')';
    //let filterjql = "(issuetype = epic) AND issue in linkedissues(" + initiativeKey + ")";
    // console.log("filterjql = ", filterjql);
    var searchURL = 'http://hlm.lge.com/issue/rest/api/2/search/';

    //var param = { "jql" : filterjql, "maxResults" : 1000, "startAt": 0,"fields" : [ ] };
    var param = { "jql" : filterjql, "maxResults" : 1000, "startAt": 0,
                  "fields" : ["summary", "key", "assignee", "due", "status", "labels", "resolution", "components", "issuetype",  "created", "updated", 
                              "duedate", "resolutiondate", "labels", "reporter"] 
                };
    //console.log("param=", JSON.stringify(param));
    xhttp.open("POST", searchURL, true);
    xhttp.setRequestHeader("Authorization", secret.Authtoken);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify(param));  
  });    
}  



/*
  getStoryListfromJira : Epic Key를 전달받아 하위에 연결된 Story List를 얻어 온다.
*/
function getStoryListfromJira(epicKey)
{
  return new Promise(function (resolve, reject){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4)
      {
        if (xhttp.status === 200)
        {
          var resultJSON = JSON.parse(xhttp.responseText);
          var json = JSON.stringify(resultJSON);
          resolve(resultJSON);
        }
        else
        {
          console.log("getStoryListfromJira -- xhttp.status Error = ", xhttp.status)
          reject(xhttp.status);
        }        
      }
    }

    //let filterjql = '(issuetype = story or issuetype = task) AND issuefunction in linkedissuesOf(\"key=' + epicKey + '\"' + ')';
    let filterjql = '(issuetype = story or issuetype = task or issuetype = "Initiative Demo") AND issuefunction in linkedissuesOf(\"key=' + epicKey + '\"' + ')';
    //let filterjql = 'issuefunction in linkedissuesOf(\"key=' + epicKey + '\"' + ')';
    console.log("filterjql = ", filterjql);
    var searchURL = 'http://hlm.lge.com/issue/rest/api/2/search/';
    //var param = { "jql" : filterjql, "maxResults" : 1000, "startAt": 0,"fields" : [ ] };
    var param = { "jql" : filterjql, "maxResults" : 1000, "startAt": 0,
                  "fields" : ["summary", "key", "assignee", "due", "status", "labels", "resolution", "components", "issuetype",  "created", "updated", 
                  "duedate", "resolutiondate", "labels", "reporter"] };

    //console.log("param=", JSON.stringify(param));
    xhttp.open("POST", searchURL, true);
    xhttp.setRequestHeader("Authorization", secret.Authtoken);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify(param));  
  });    
}  

/*
  getZephyerListfromJira : Epic or Story Key를 전달받아 하위에 연결된 Zephyr List를 얻어 온다.
*/
function getZephyerListfromJira(KeyID)
{
  return new Promise(function (resolve, reject){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4)
      {
        if (xhttp.status === 200)
        {
          var resultJSON = JSON.parse(xhttp.responseText);
          var json = JSON.stringify(resultJSON);
          resolve(resultJSON);
        }
        else
        {
          console.log("getZephyerListfromJira -- xhttp.status Error = ", xhttp.status)
          reject(xhttp.status);
        }        
      }
    }

  
  let filterjql = "type = test AND issueFunction in linkedIssuesOfRecursiveLimited(" + "\'issueKey = " + KeyID + "\', 1)";

  //console.log("Zephyr filterjql = ", filterjql);
  var searchURL = 'http://hlm.lge.com/issue/rest/api/2/search/';
  var param = { "jql" : filterjql, "maxResults" : 1000, "startAt": 0,"fields" : ["id", "summary", "key", "assignee", "status", "labels" ] };

  xhttp.open("POST", searchURL, true);
  xhttp.setRequestHeader("Authorization", secret.Authtoken);
  xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhttp.send(JSON.stringify(param));  
  });    
}  


/*
  getZephyerExecutionfromJira : Zephyr Issue ID를 전달받아 TC의 실행정보를 얻어 온다.
*/
function getZephyerExecutionfromJira(IssueID)
{
  return new Promise(function (resolve, reject){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4)
      {
        if (xhttp.status === 200)
        {
          var resultJSON = epic_FilterResult = JSON.parse(xhttp.responseText);
          var json = JSON.stringify(resultJSON);
          //console.log("Executions", json);
          resolve(resultJSON);
        }
        else
        {
          console.log("getZephyerExecutionfromJira -- xhttp.status Error = ", xhttp.status)
          reject(xhttp.status);
        }        
      }
    }

  var searchURL = 'http://hlm.lge.com/issue/rest/zapi/latest/execution?issueId=' + IssueID;
  var param = { 'issueId' : IssueID, "fields" : [ "id", "executionStatus", "executedBy", "cycleId", "cycleName", 'executedOn' ] };
  xhttp.open("GET", searchURL);
  xhttp.setRequestHeader("Authorization", secret.Authtoken);
  xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhttp.send(null);  
  });    
}  

/*
  (사용안함) get_InitiativeList : Initiative List 정보를 얻어온다. Callback방식
*/
function get_InitiativeList(res, res, next)
{
	var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function()
    {
      if (xhttp.readyState === 4)
      {
        if (xhttp.status === 200)
        {
			  	var resultJSON = JSON.parse(xhttp.responseText);
			  	var json = JSON.stringify(resultJSON);
			  	fse.outputFileSync("./public/json/initiative_list", json, 'utf-8', function(e){
			  		if(e){
			  			console.log(e);
			  		}else{
			  			console.log("Download is done!");	
			  		}
			  	});
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
  xhttp.setRequestHeader("Authorization", secret.Authtoken);
  xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhttp.send(param);
} 

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
  module.exports : 외부 함수 open (extern)
*/
module.exports = { 
  get_InitiativeListfromJira,
  get_ChangeLogfromJira,
  getEpicListfromJira,
  getStoryListfromJira,
  getZephyerListfromJira,
  getZephyerExecutionfromJira,
  //get_InitiativeList,
 };

