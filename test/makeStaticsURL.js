var moment = require('moment-timezone')
var initiativemgr = require('../javascripts/initiativemgr');
var lgldap = require('../javascripts/lgeldap.js')

moment.tz.setDefault("Asiz/Seoul");

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
  initiativemgr.makeSnapshot_StaticsURL('/tmp/Initiativemgr_JSON/webOS50_SEETV_filter_45938/initiative_DB_filterID_KeyListOnly_45938_2019-03-15T10-38-35.json');
}  

Test_Function();

/*
$ node process-2.js one two=three four

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
*/