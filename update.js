var initiativemgr = require('./javascripts/initiativemgr');
var lgldap = require('./javascripts/lgeldap');

var moment = require('moment-timezone')
moment.tz.setDefault("Asiz/Seoul");

function update_function()
{
  let exeflag = true;
  //initapi.Test();

  console.log(process.argv);
  /*
  process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });
  */

  switch(process.argv[2])
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
    case "webOS5.0_Platform" :
      console.log("req.params.id == webOS5.0_Platform");
      filterID = 48233;
      break;
    case "SEETV" :
      console.log("req.params.id == SEETV");
      filterID = 45938;
      break;
    case "webOS5.0_Initial(SEETV)" :
      console.log("req.params.id == webOS5.0_Initial(SEETV)");
      filterID = 45400;
      break;
    case "test" :
      console.log("req.params.id == test");
      filterID = 46610;
      break;
    default :
      console.log("req.params.id == Error");
      exeflag = false;
      break;
  }
  if(exeflag) { initiativemgr.makeSnapshot_InitiativeListfromJira("filterID_KeyListOnly", filterID, true); }
}  

update_function();

/*
$ node process-2.js one two=three four

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
*/