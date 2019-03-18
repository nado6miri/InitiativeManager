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

 lgldap.getLDAP_Info('raja.rathinavel').then((result) => { 
    console.log("revove . from department = ", result);
  })
  .catch((error) => { console.log("[ERR] ldap.getLDAP_Info = ", error)});
}  


Test_Function();
