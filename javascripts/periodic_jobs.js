var tmr = require('./mytimer');
var initapi = require('./initapi');
var mysql = require('mysql');

//res.send('Save Initiative List to mysql DB');
var connection = mysql.createConnection({
  host     : '10.186.115.57',
  user     : 'initiative',
  password : 'initiativemgr',
  port     : 3306,
  database : 'initiative'
});

/*
connection.connect(function(err) 
{
  if (err) 
  {
      console.error('mysql connection error');
      console.error(err);
      throw err;
  }
  console.log("mysql connected OK...")
});


let result = connection.query('SELECT * from webos50', function(err, rows, fields) 
{
  if (!err)
  {
    console.log('The solution is: ', rows);
    res.send(JSON.stringify(rows)); // send json format
    console.log("print result =" + result);
    //console.log(result);
  }
  else
  {
    console.log('Error while performing Query.', err);
  }

  connection.query("INSERT INTO webos50(id, jiraid, summary) VALUES (?, ?, ?)", [index, 'TVPLAT-'+index.toString(), "Test Initiative.."], function(){ });
  index++;
*/

function getInitiativeList(filterID)
{
  // Use Promise Object
  initapi.get_InitiativeListfromJira(filterID).then(function (jsondata)
  {
    for (i = 0; i < jsondata.total; i++) {
      initapi.jira_initiative_keylist.push(jsondata["issues"][i]["key"]);
    }     
    console.log("Initiative List gathering ok - Promise");
    console.log(datjsondataa);
    console.log(initapi.jira_initiative_keylist);
  }).catch(function (err)
  {
    console.log("Initiative List gathering NG - Promise");
    console.log(err);
  });
}  


module.exports = { };
