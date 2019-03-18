var fs = require('fs');
var fse = require('fs-extra');
var mongoose = require('mongoose');
var initiativemgr = require('../javascripts/initiativemgr');
var lgldap = require('../javascripts/lgeldap.js')

async function Test_Function()
{
  //initativemgr.Test();
  console.log(process.argv);

  /*
  process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });
  */

  initiativemgr.makeSnapshot_InitiativeListfromJira("keyID", "TVPLAT-19666", true);   // test KEY

  //lgldap.getLDAP_Info('stan.kim').then((result) => { console.log("Department = ", result)});  
  /*
  lgldap.getLDAP_Info('sungbin.na')
        .then((result) => { 
          console.log(JSON.stringify(result));
        })
        .catch((error) => { console.log("[ERR] ldap.getLDAP_Info = ", error)});
  
  */
  // admin DB에서 DB단위로 USER 관리할 경우
  //mongoose.connect('mongodb://sdet:sdet@127.0.0.1:27017/admin', { dbName: "initiativemgr", useNewUrlParser : true }, function(error) { console.log("mongoose error = ", error)})
  //mongoose.connect('mongodb://initiativemgr:initiativemgr@127.0.0.1:27017/admin', { dbName: "initiativemgr", useNewUrlParser : true }, function(error) { console.log("mongoose error = ", error)})

  // DB단위로 USER 관리할 경우
  //mongoose.connect('mongodb://initiativemgr:initiativemgr@127.0.0.1:27017/initiativemgr', { dbName: "initiativemgr", useNewUrlParser : true }, function(error) { console.log("mongoose error = ", error)})
  /*
  var initiative_DB = {};
  try {
    //initiative_DB = await load_InitiativeDB('./public/json/initiative_DB_46093_Latest.json');
    initiative_DB = await load_InitiativeDB('./public/json/initiative_list.json');
  }
  catch(error) { console.log("file load error = ", error); }

  mongo_connectDB(initiative_DB);
  */
}  

//tmr.Timer_Setting(12, 20, 10, Test_Function);
Test_Function();

var UserSchima = 0; 
var UserModel = 0; 


function mongo_connectDB(initiative_DB)
{
    console.log("initative = ", initiative_DB);

    const databaseUrl = 'mongodb://initiativemgr:initiativemgr@127.0.0.1:27017/admin';
    console.log("DB 연결을 시도합니다.");
    mongoose.Promise = global.Promise; // mongoose의 Promise 객체는 global의 Promise 객체를 사용하도록 함.
    mongoose.connect(databaseUrl, { dbName: "initiativemgr", useNewUrlParser : true });
    database = mongoose.connection;
    database.on('error', console.error.bind(console, 'mongoose connection error'));
    database.on('open', () => {
      console.log("connect to database successfully");
      /*
      // 1. User Schima 정의 및 정형화된 Data 저장하기
      var InitmgrSchima = mongoose.Schema({id:String, name:String, password: String});
      var InitmgrModel = mongoose.model("sungbin", InitmgrSchima); // 1st param : Collection Name
      var data = new InitmgrModel({id:'216', name: 'sungbin6', password: '1236'});
      data.save();
      data = new InitmgrModel({id:'215', name: 'sungbin5', password: '1235'});
      data.save();
      */
      
      /*
      // 2. 정형화 하기 어려운 Schima 구조 즉 JSON으로 된 file을 DB로 Save Test....
      var InitmgrSchima = mongoose.Schema({inserted_at : Date, Updated_at : Date, json: Object});    
      var InitmgrModel = mongoose.model("snapshot", InitmgrSchima);
      var today = new Date();
      var data = new InitmgrModel({ inserted_at : today, Updated_at : today, json: initiative_DB });
      data.save();
      */

      // 3. 저장된 비정형화 JSON Object를 DB로 부터 Find Test....
      var InitmgrSchima = mongoose.Schema({inserted_at : Date, Updated_at : Date, json: Object});    
      var InitmgrModel = mongoose.model("snapshot", InitmgrSchima);
      InitmgrModel.find().then((result) => { 
        console.log("read DB = ", result[0]['json']) 
        Save_JSON_file(result[0]['json'], "./query.json");
      });
    });
    database.on('disconnected', () => {
      console.log("disconnected to database, after 5sec reconnect to DB");
      setInterval(mongo_connectDB, 5000);
    });
}


/*
  load_InitiativeDB : filename(Path정보 포함)을 읽어 initiative_DB 객체(JSON)으로 Loading한다.
*/
function load_InitiativeDB(filename)
{
  return new Promise(function (resolve, reject) {
    fs.exists(filename, (exist) => {
      if(exist)
      {
        console.log("file is exist");
        let data = fs.readFileSync(filename, 'utf8');
        initiative_DB = JSON.parse(data); 
      }
      else
      {
        console.log('Not Found!');
        initiative_DB = {};   
      }
      resolve(initiative_DB);
    });      
  });
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