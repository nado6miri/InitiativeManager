var moment = require('moment-timezone')
var initiativemgr = require('../javascripts/initiativemgr');
var lgldap = require('../javascripts/lgeldap.js')

moment.tz.setDefault("Asiz/Seoul");

// HDD Disk
const JSON_Path = '/media/sdet/3dd31023-a774-4f18-a813-0789b15061db/Initiativemgr_JSON/';

function Test_Function()
{
  let exeflag = true;
  //initapi.Test();

  console.log(process.argv);
  /*
  process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });
  */
  initiativemgr.makeSnapshot_StaticsURL(JSON_Path + 'webOS50_Initial_filter_45402/initiative_DB_filterID_KeyListOnly_45402_2019-05-29T12-30-00.json');
}  

Test_Function();

/*
$ node process-2.js one two=three four

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
*/