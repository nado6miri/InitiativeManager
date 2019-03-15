var fs = require('fs');
var http = require('http');
var fse = require('fs-extra');
var http = require('http');
var url = require('url');
var XMLHttpRequest = require('xmlhttprequest-ssl').XMLHttpRequest;
var initparse = require('./parsejirafields');
var ldap = require('./lgeldap.js')
var moment = require('moment-timezone');
var initiative_jiraquery = require('./initiative_jiraquery_api');

var async_mode = false;
var SDETVerifyOnly = false; // false(default) : all check, true : SDET이 개발필요 TC 항목으로 분류된 EPIC/STORY만 Zephyer 정보 수집을 수행한다. 

// initiative filter result (json) - webOS45 webOS45MR, webOS5.0 
var initiative_keylist = [];

// epic filter result (json) - epic list depend on intitative key
var epic_FilterResult;
var epic_keylist = [];

// epic filter result (json) - story list depend on epic key
var story_FilterResult;
var story_keylist = [];

var initiative_DB = {
  'total' : 0,
  'snapshotDate' : '2018',
  'issues' : [], // initiative issue list
  'developers' : { },
};  

var current_demo_info = {
  'key' : '',
  'summary' : '',
  'praize' : false,
};

var story_point = 
{
  'PlanSP' : 0,
  'BurnedSP' : 0,
  'RemainSP' : 0,
};
  
var current_epic_info = {};
var epic_info =  
{
    'Epic Key' : '',
    'Release_SP' : '',
    'Summary' : '',
    'Assignee' : '',
    'duedate' : '',
    'Status' : '',
    'CreatedDate' : '',
    'RescheduleCnt' : 0,
    'AbnormalSprint' : '',
    "GovOrDeployment" : '',
    'Labels' : [],
    'SDET_NeedDevelTC' : false,
    'SDET_NeedtoCheck' : false,
    'StoryPoint' : story_point,
    'Zephyr' : 
    {
      "ZephyrTC": [],       
    },
    'STORY' : 
    {
      'STORY_SUMMARY' : 
      {
          'StoryTotalCnt': 0,
          'StoryDevelCnt': 0,
          'StoryGovOrDeploymentCnt': 0,
          'StoryTotalResolutionCnt' : 0,
          'StoryDevelResolutionCnt' : 0,
          'StoryGovOrDeploymentResolutionCnt' : 0,
          'StoryDelayedCnt' : 0,
          'StoryAbnormalSPCnt' : 0, // Story Abnormal SP 
          'StoryDuedateNullCnt' : 0, // Story Due Date Null 
          'StoryDevelTCCnt' : 0, // zephyr tc 필요항목
          'StoryNonDevelTCCnt' : 0,    // zephyr tc 불필요항목 
          'StoryNeedtoCheckCnt' : 0, // 개발 / 비개발 확인 필요 항목
          'StoryHasTCCnt' : 0, 
      }, 
      'issues' : [], // story issue list
    },
};


var current_initiative_info = { };
var initiative_info =
{
  'Initiative Key' : '',
  'created' : '',
  'Summary' : '',
  'Assignee' : '',
  'OrgInfo' : [], 
  '관리대상' : '',
  'Risk관리대상' : '',
  'Initiative Order' : '',
  'Initiative Score' : '', 
  'Status Color' : '',
  'SE_Delivery' : '',
  'SE_Quality' : '',
  'StatusSummary' : { 'UpdateDate' : 'None', count : 0, 'Description' : "" },
  'DeliveryComment' : '',
  'QualityComment' : '',
  'ScopeOfChange' : '',
  'RMS' : '',
  'Labels' : [],
  'STESDET_OnSite' : '',
  'SDET_STE_Members' : [],
  'AbnormalSprint' : '',
  "GovOrDeployment" : '',
  'Demo' : [],
  'StoryPoint' : { },
  'FixVersion' : [ ],
  'Workflow' : { }, 
  'ReleaseSprint' : { },
  'ARCHREVIEW' : { }, 
  'STORY_SUMMARY' : 
  {
      'StoryTotalCnt': 0,
      'StoryDevelCnt': 0,
      'StoryGovOrDeploymentCnt': 0,
      'StoryTotalResolutionCnt' : 0,
      'StoryDevelResolutionCnt' : 0,
      'StoryGovOrDeploymentResolutionCnt' : 0,
      'StoryDelayedCnt' : 0,
      'StoryAbnormalSPCnt' : 0, // Story Abnormal SP 
      'StoryDuedateNullCnt' : 0, // Story Due Date Null 
      'StoryDevelTCCnt' : 0, // zephyr tc 필요항목
      'StoryNonDevelTCCnt' : 0,    // zephyr tc 불필요항목 
      'StoryNeedtoCheckCnt' : 0, // 개발 / 비개발 확인 필요 항목
      'StoryHasTCCnt' : 0, // 연결률 계산..
    },

  'EPIC' : 
  {
    'EpicTotalCnt': 0,
    'EpicDevelCnt': 0,
    'EpicGovOrDeploymentCnt': 0,
    'EpicTotalResolutionCnt' : 0,
    'EpicDevelResolutionCnt' : 0,
    'EpicGovOrDeploymentResolutionCnt' : 0,
    'EpicDelayedCnt' : 0,
    'EpicAbnormalSPCnt' : 0, // Epic Abnormal SP 
    'EpicDuedateNullCnt' : 0, // Epic Due Date Null 
    'EpicDevelTCCnt' : 0, // zephyr tc 필요항목 (개발)
    'EpicNonDevelTCCnt' : 0,    // zephyr tc 불필요항목 (비개발)
    'EpicNeedtoCheckCnt' : 0, // 개발 / 비개발 확인 필요 항목
    'EpicHasTCCnt' : 0, // 연결률 계산..
    'issues' : [],    
  },
  'STATICS' : { },
  'URL' : { },
  'developers' : { },
};


var current_story_info;
var story_info = 
{
  'Story Key' : '',
  'Release_SP' : '',
  'Summary' : '',
  'Assignee' : '',
  'duedate' : '',
  'Status' : '',
  'CreatedDate' : '',
  'AbnormalSprint' : '',
  'Labels' : [],
  'GovOrDeployment' : '',
  'SDET_NeedDevelTC' : false,
  'SDET_NeedtoCheck' : false,
  'StoryPoint' : {} ,
  'Zephyr' : 
  {
    'ZephyrTC': [],       
  },
};

var zephyr_issueIdlist = [];

var current_zephyr_info = {};
var zephyr_info = 
{
  'IssueID' : 0,
  'Zephyr Key' : '',
  'Summary' : '',
  'Assignee' : '',
  'Status' : '',
  'Labels' : [],
  'ExeRecordsCnt' : 0,
  'Executions': [],
}     

var current_zephyr_exeinfo = {};
var zephyr_exeinfo = 
{
  'id': 0,
  'executionStatus': '',
  'executedOn': '',
  'executedBy': '',
  'cycleId': 0,
  'cycleName': ''
}

var current_workflow = {};
var workflow = 
{   
  'CreatedDate' : '',
  'Status' : '',
  'totalDevelDays' : 0,
  'RemainDays' : 0,
  "DRAFTING" : { "Duration" : 0, 'History' :[ ] } ,             
  "PO REVIEW" : { "Duration" : 0, 'History' :[ ] } ,             
  "ELT REVIEW" : { "Duration" : 0, 'History' :[ ] } ,             
  "Approved" : { "Duration" : 0, 'History' :[ ] } ,             
  "BACKLOG REFINEMENT" : { "Duration" : 0, 'History' :[ ] } ,             
  "READY" : { "Duration" : 0, 'History' :[ ] } ,             
  "In Progress" : { "Duration" : 0, 'History' :[ ] } ,             
  "Delivered" : { "Duration" : 0, 'History' :[ ] } ,             
  "PROPOSED TO DEFER" : { "Duration" : 0, 'History' :[ ] } ,             
  "Deferred" : { "Duration" : 0, 'History' :[ ] } ,             
  "Closed" : { "Duration" : 0, 'History' :[ ] }  ,             
};

var current_ReleaseSP = {};
var ReleaseSP = 
{
  'OrgRelease_SP' : '',
  'CurRelease_SP' : '',
  'RescheduleCnt' : 0,
  'History' :
  [
     // { 'ChangeSP' : 'TVSP6', 'ChangeDate' : '20190101', "ReleaseSP" : "" },  // History 상에 Ready 단계 이후 처음으로 입력된 value.
  ],
};

var Initiative_Statics = 
{
    'EPIC+STORY_STATICS' :
    {
        'TOTAL' : {},
        'ORGANIZATION' : {},
        'DEVELOPER' : {},
    },

    'EPIC_STATICS' : 
    {
        'TOTAL' : {}, 
        'ORGANIZATION' : {},
        'DEVELOPER' : {},
    },

    'STORY_STATICS' : 
    {
        'TOTAL' : {},
        'ORGANIZATION' : {},
        'DEVELOPER' : {},
    },    
}

var StaticsInfo = 
{
    // Epic
    'EpicTotalCnt': 0,
    'EpicDevelCnt': 0,
    'EpicGovOrDeploymentCnt': 0,
    'EpicTotalResolutionCnt' : 0,
    'EpicDevelResolutionCnt' : 0,
    'EpicGovOrDeploymentResolutionCnt' : 0,
    'EpicDelayedCnt' : 0,
    'EpicAbnormalSPCnt' : 0, // Epic Abnormal SP 
    'EpicDuedateNullCnt' : 0, // Epic Due Date Null 
    'EpicDevelTCCnt' : 0, // zephyr tc 필요항목 (개발)
    'EpicNonDevelTCCnt' : 0,    // zephyr tc 불필요항목 (비개발)
    'EpicNeedtoCheckCnt' : 0, // 개발 / 비개발 확인 필요 항목
    'EpicHasTCCnt' : 0, // 연결률 계산..
    // Story
    'StoryTotalCnt': 0,
    'StoryDevelCnt': 0,
    'StoryGovOrDeploymentCnt': 0,
    'StoryTotalResolutionCnt' : 0,
    'StoryDevelResolutionCnt' : 0,
    'StoryGovOrDeploymentResolutionCnt' : 0,
    'StoryDelayedCnt' : 0,
    'StoryAbnormalSPCnt' : 0, // Story Abnormal SP 
    'StoryDuedateNullCnt' : 0, // Story Due Date Null 
    'StoryDevelTCCnt' : 0, // zephyr tc 필요항목
    'StoryNonDevelTCCnt' : 0,    // zephyr tc 불필요항목 
    'StoryNeedtoCheckCnt' : 0, // 개발 / 비개발 확인 필요 항목
    'StoryHasTCCnt' : 0, // 연결률 계산..
    // Epic 하위, Story 하위 Zephyr 통계
    'ZephyrCnt': 0,
    'ZephyrExecutionCnt' : 0,
    'Zephyr_S_Draft' : 0, 
    'Zephyr_S_Review' : 0, 
    'Zephyr_S_Update' : 0, 
    'Zephyr_S_Active' : 0, 
    'Zephyr_S_Approval' : 0, 
    'Zephyr_S_Archived' : 0, 
    'executionStatus_PASS' : 0, // “1” PASS
    'executionStatus_FAIL' : 0, // “2” FAIL
    'executionStatus_UNEXEC' : 0, // “-1” UNEXECUTED
    'executionStatus_BLOCK' : 0, // “3” WIP, “4” BLOCKED”
    'PassEpicCnt' : 0,
    'PassStoryCnt' : 0,
}


var current_Arch_Review = {};
var Arch_1st_workflow = 
{
  'CreatedDate' : '',
  'Status' : '',
  'Signal' : 'YELLOW',
  "Scoping" : { "Duration" : 0, 'History' :[ ] } ,             
  "Review" : { "Duration" : 0, 'History' :[ ] } ,             
  "In Progress" : { "Duration" : 0, 'History' :[ ] } ,             
  "Delivered" : { "Duration" : 0, 'History' :[ ] } ,             
  "Closed" : { "Duration" : 0, 'History' :[ ] }  ,            
}

var Arch_2nd_workflow = 
{   
  'CreatedDate' : '',
  'Status' : '',
  'Signal' : '-',
  "Screen" : { "Duration" : 0, 'History' :[ ] } ,             
  "Analysis" : { "Duration" : 0, 'History' :[ ] } ,             
  "Verify" : { "Duration" : 0, 'History' :[ ] } ,             
  "Closed" : { "Duration" : 0, 'History' :[ ] }  ,            
};

var Arch_Review = 
{
  'Key' : '',
  'ScopeOfChange' : '---',
  'First Review' : 
  {
    '1stReviewDone' : false,
    'Plan' : { 'Interface Review' : false, 'Sangria Review' : false, 'FMEA' : false },
    'workflow' : {},
  },
  'Second Review' : 
  {
    'Interface Review' : { 'output' : false, 'workflow' : {}, }, 
    'Document Review' : { 'output' : false, 'workflow' : {}, }, 
    'Architecture Review' : { 'output' : false, 'workflow' : {}, }, 
    'FMEA Review' : { 'output' : false, 'workflow' : {}, }, 
  },
}


const common_url = 'http://hlm.lge.com/issue/issues/?jql=';

const total_link_key = 
{
  'Total' : { 'link' : '', 'keys' : [] },
  'DevelTC' : { 'link' : '', 'keys' : [] },
  'NonDevelTC' : { 'link' : '', 'keys' : [] },
  'NeedtoCheck' : { 'link' : '', 'keys' : [] },
  'ZephyrTotal' : { 'link' : '', 'keys' : [] },
  'Zephyr_DRAFT' : { 'link' : '', 'keys' : [] },
  'Zephyr_REVIEW' : { 'link' : '', 'keys' : [] },
  'Zephyr_UPDATE' : { 'link' : '', 'keys' : [] },
  'Zephyr_ACTIVE' : { 'link' : '', 'keys' : [] },
  'Zephyr_PASS' : { 'link' : '', 'keys' : [] },
  'Zephyr_FAIL' : { 'link' : '', 'keys' : [] },
}

const OrgDevel_link_key = 
{
  'Total' : '',
  'DevelTC' : '',
  'NonDevelTC' : '',
  'NeedtoCheck' : '',
  'ZephyrTotal' : '',
  'Zephyr_DRAFT' : '',
  'Zephyr_REVIEW' : '',
  'Zephyr_UPDATE' : '',
  'Zephyr_ACTIVE' : '',
  'Zephyr_PASS' : '',
  'Zephyr_FAIL' : '',
};

var current_urlinfo = { }; 
const urlinfo = 
{
  'COMMON' :
  {
    'EPIC_TOTAL' : '',
    'EPIC_Duedate_Null' : '',
    'EPIC_Duedate_Delayed' : '',
    'EPIC_AbnormalSP' : '',
    'STORY_TOTAL' : '',
    'STORY_Duedate_Null' : '',
    'STORY_Duedate_Delayed' : '',
    'STORY_AbnormalSP' : '',
    'AbnormalSPList' : [],
  },
  'EPIC+STORY_LINK' : 
  {
      'TOTAL' : { },
      'ORGANIZATION' : { },
      'DEVELOPER' :  { },
  },    
  'EPIC_LINK' : 
  {
      'TOTAL' : { },
      'ORGANIZATION' : { },
      'DEVELOPER' : { },
  },
  'STORY_LINK' : 
  {
      'TOTAL' : { },
      'ORGANIZATION' : { },
      'DEVELOPER' : { },
  },
}


var developerslist = {};
var developers = {};
var start = 0, end = 0;


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
        /*
        console.log("file is exist");
        fs.readFile(filename, 'utf8', (e, data) => {
          if(e){ console.log("error=", e); } 
          else 
          { 
            let jsonObject = JSON.parse(data); 
            console.log("Read developers DB = ", JSON.stringify(jsonObject)); 
            return jsonObject;
          }
        });
        */
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
var get_errors = 
{
   'epiclist' : [ ], // initiative key list that failed to get epic list.
   'storylist' : [ { 'IK' : '', 'EK' : '' }, ],
   'e_zephyrlist' : [ { 'IK' : '', 'EK' : '' }, ],
   'e_zephyr_exeinfo' : [ { 'IK' : '', 'EK' : '', 'ZK': '', 'ZID' : '' }, ], 
   's_zephyrlist' : [ { 'IK' : '', 'EK' : '', 'SK' : '' }, ],
   's_zephyr_exeinfo' : [ { 'IK' : '', 'EK' : '', 'SK' : '', 'ZK': '', 'ZID' : '' }, ], 
};
*/

var get_errors = 
{
   'epiclist' : [ ], // initiative key list that failed to get epic list.
   'storylist' : [ ],
   'e_zephyrlist' : [ ],
   'e_zephyr_exeinfo' : [ ], 
   's_zephyrlist' : [ ],
   's_zephyr_exeinfo' : [ ], 
};

// HDD Disk
const JSON_Path = '/media/sdet/3dd31023-a774-4f18-a813-0789b15061db/Initiativemgr_JSON/';
// const JSON_Path = "/tmp/Initiativemgr_JSON/" 
/*
make statics / url function
*/
async function makeSnapshot_StaticsURL(filename)
{
  let today = start = moment().locale('ko');
  
  var filterID = String(filename).split('KeyListOnly_')[1];
  filterID = String(filterID).split('_')[0];
  
  //today = moment(today).add(9, 'Hour');
  var snapshot = 0; 
  snapshot = today.format();
  snapshot = snapshot.split('+');
  snapshot = snapshot[0].replace(':', '-');
  snapshot = snapshot.replace(':', '-');
  //snapshot = querymode+"_"+filterID+"_"+snapshot;
  // init global variables.
  initiative_DB['snapshotDate'] = snapshot;
  initiative_DB['total'] = 0;
  initiative_DB['issues'] = [];
  initiative_DB['developers'] = {};
 
  await load_DevelopersDB('./public/json/developers.json').then((result) => {
    console.log("[TEST] Read developers DB = ", JSON.stringify(developerslist));
  })

  //await load_InitiativeDB('./public/json/initiative_DB_filterID_KeyListOnly_45938_2019-03-15T10-38-35.json').then((result) => {
  await load_InitiativeDB(filename).then((result) => {
      console.log("[TEST] Read developers DB = ", JSON.stringify(initiative_DB));
  });

  await makeZephyrStatics();
  await make_URLinfo();
  console.log("[final-Zephyr] Save file = initiative_DB");
  Save_JSON_file(initiative_DB, "./public/json/initiative_DB_"+filterID+"_Latest.json");
  console.log("[final-Zephyr] Save end : initiative_DB");
  Save_JSON_file(developerslist, "./public/json/developers.json");
  Save_JSON_file(developerslist, JSON_Path + "developers.json");

  end = moment().locale('ko');
  let elapsed = (end - start)/(1000*60);
  console.log("Elapsed time = ", elapsed, " mins");  
}

//===================================================================================================================
// Solution : use this function to avoid timeout error when request jira info with change log.
// New Sequence with change log....
// makeSnapshot_InitiativeListfromJira --> makeSnapshot_InitiativeDetailInfofromJira --> makeSnapshot_EpicDetailInfofromJira --> Story/Zephyer Detail Info..
// Example : initapi.makeSnapshot_InitiativeListfromJira(46093, true);   // webOS4.5 MR minor airplay
/*
  makeSnapshot_InitiativeListfromJira : 지정한 Filter ID에 대한 Initiative List 상세 DB를 구성하고 File로 저장한다. (Jenkins에서 해당 함수 정기적 호출하여 DB 구성 / Snapshot)
*/
async function makeSnapshot_InitiativeListfromJira(querymode, filterID, withChglog)
{
  let today = start = moment().locale('ko');
  //today = moment(today).add(9, 'Hour');
  var snapshot = 0; 
  snapshot = today.format();
  snapshot = snapshot.split('+');
  snapshot = snapshot[0].replace(':', '-');
  snapshot = snapshot.replace(':', '-');
  snapshot = querymode+"_"+filterID+"_"+snapshot;
  // init global variables.
  initiative_DB['snapshotDate'] = snapshot;
  initiative_DB['total'] = 0;
  initiative_DB['issues'] = [];
  initiative_DB['developers'] = {};
  initiative_keylist = [];

  var foldername = "";
  switch(filterID)
  {
    case 46117 :
      foldername = "webOS45_MR_Major_filter_" + String(filterID);
      break;
    case 46093 :
      foldername = "webOS45_MR_Minor_filter_" + String(filterID);
      break;
    case 45402 :
      foldername = "webOS50_Initial_filter_" + String(filterID);
      break;
    case 45938 :
      foldername = "webOS50_SEETV_filter_" + String(filterID);
      break;
    default :
      foldername = "";
      break;
  }

  // 1.LDAP Query최소화를 위해 developer List를 관리한다.
  await load_DevelopersDB('./public/json/developers.json').then((result) => {
    //console.log("[TEST] Read developers DB = ", JSON.stringify(developerslist));
  })

  // 2.Initiative Key List 구성 (상세정보 필요 없음)
  try{
    var initiativelist = await initiative_jiraquery.get_InitiativeListfromJira(querymode, filterID, withChglog);
    initiative_DB['total'] = initiativelist.total;
    for (var i = 0; i < initiativelist.total; i++) { initiative_keylist.push(initiativelist['issues'][i]['key']); }     
  }
  catch(error){ console.log("Error = ", error); }

  // 3.Initiative Key List 기반으로 각각의 Initiative Key에 해당하는 상세 정보를 가져와서 DB 구성한다.
  console.log("Key List = ", initiative_keylist);
  for(var i = 0; i < initiative_keylist.length; i++)
  {
    console.log("start loop = ", i);
    await makeSnapshot_InitiativeDetailInfofromJira(initiative_keylist[i], i, withChglog);
    console.log("end loop = ", i);
  }
  
  // 4. 구성된 Initiative DB를 File로 저장한다.
  console.log("[final] Save file = initiative_DB");
  //Save_JSON_file(initiative_DB, "./public/json/initiative_DB_"+initiative_DB['snapshotDate']+".json");
  Save_JSON_file(initiative_DB, JSON_Path + foldername + "/initiative_DB_"+initiative_DB['snapshotDate']+".json");
  console.log("[final] Save end : initiative_DB");

  // 5. Error가 발생되었다면 Error list를 file로 저장한다. 
  console.log("Error List - Save file = errorlist.json", JSON.stringify(get_errors));
  Save_JSON_file(get_errors, "./public/json/errorlist.json");
  console.log("Error List - Save end : initiative_DB");

  // 6. Initiative DB기반으로 통계 구성을 한다.
  await makeZephyrStatics();

  // 7. View에 표시할 data의 URL Link를 구성한다.
  make_URLinfo();
  console.log("[final-Zephyr] Save file = initiative_DB");

  // 8. 최종 정보를 Snapshot 일자, Latest 2가지 형태의 file로 저장한다. 
  Save_JSON_file(initiative_DB, JSON_Path + foldername + "/initiative_DB_"+initiative_DB['snapshotDate']+".json");
  Save_JSON_file(initiative_DB, "./public/json/initiative_DB_"+filterID+"_Latest.json");
  console.log("[final-Zephyr] Save end : initiative_DB");
  Save_JSON_file(developerslist, "./public/json/developers.json");
  Save_JSON_file(developerslist, JSON_Path + "developers.json");
  
  end = moment().locale('ko');
  let elapsed = (end - start)/(1000*60);
  console.log("Elapsed time = ", elapsed, " mins");  
}


/*
  makeSnapshot_InitiativeDetailInfofromJira : Initiative Key ID('TVPLAT-XXXX') 상세 DB를 구성한다. 전체 DB 구성을 위해 Keylist.length만큼 호출되어야 함.
*/
async function makeSnapshot_InitiativeDetailInfofromJira(KeyValue, index, withChglog)
{
  /*
   try/catch 사용하여 let initiativelist = await initiative_jiraquery.get_InitiativeListfromJira('KeyID', KeyValue, withChglog); 를 받은 후 처리해도 되고 (현재 구현된 상태)
   try/catch 없이  await initiative_jiraquery.get_InitiativeListfromJira('KeyID', KeyValue, withChglog).then((initiativelist) => {}).catch((error)=>{}) 로 처리해도 되고 (refactoring전 버전 - 아래 미변경된 코드 참조)
  */
  try {
    // Use Promise Object
    var initiativelist = await initiative_jiraquery.get_InitiativeListfromJira('KeyID', KeyValue, withChglog);
    console.log("[Promise 1] Get Initiative List / Update Basic Info and Iinitiative Key List from JIRA");
    //console.log(JSON.stringify(initiativelist));
    var issue = initiativelist['issues'][0];
    var initowner = 0;

    current_initiative_info = JSON.parse(JSON.stringify(initiative_info)); // initialize...
    current_initiative_info['Initiative Key'] = initparse.getKey(issue);        
    current_initiative_info['created'] = initparse.getCreatedDate(issue);        
    current_initiative_info['Summary'] = initparse.getSummary(issue);        
    current_initiative_info['Assignee'] = initowner = initparse.getAssignee(issue);        
    current_initiative_info['관리대상'] = initparse.checkLabels(issue, 'SPE_M');
    current_initiative_info['Risk관리대상'] = initparse.checkLabels(issue, 'SPE_R');        
    current_initiative_info['Initiative Score'] = initparse.getInitiativeScore(issue);        
    current_initiative_info['Initiative Order'] = initparse.getInitiativeOrder(issue);        
    current_initiative_info['Status Color'] = initparse.getStatusColor(issue);        
    current_initiative_info['SE_Delivery'] = initparse.getSE_Delivery(issue);        
    current_initiative_info['SE_Quality'] = initparse.getSE_Quality(issue);    
    current_initiative_info['DeliveryComment'] = initparse.getD_Comment(issue);    
    current_initiative_info['QualityComment'] = initparse.getQ_Comment(issue);    
    current_initiative_info['ScopeOfChange'] = initparse.getScopeOfChange(issue);        
    current_initiative_info['RMS'] = initparse.checkRMSInitiative(issue);       
    current_initiative_info['STESDET_OnSite'] = initparse.getSTESDET_Support(issue);        
    current_initiative_info['SDET_STE_Members'] = initparse.getSTEList(issue);     
    current_initiative_info['GovOrDeployment'] = initparse.checkGovDeployComponents(issue);    
    current_initiative_info['FixVersion'] = initparse.getFixVersions(issue);     
    current_initiative_info['Labels'] = initparse.getLabels(issue);   
    
    current_initiative_info['OrgInfo'] = await getDevelopersInformation(initowner);
    console.log("[current_initiative_info['OrgInfo'] = ", current_initiative_info['OrgInfo'])

    let changelog = initiativelist['issues'][0]['changelog'];
    // Release Sprint
    current_ReleaseSP = JSON.parse(JSON.stringify(ReleaseSP)); // initialize...
    current_ReleaseSP['CurRelease_SP'] = initparse.conversionReleaseSprintToSprint(initparse.getReleaseSprint(issue));
    current_ReleaseSP = initparse.parseReleaseSprint(changelog, current_ReleaseSP);
    current_initiative_info['ReleaseSprint'] = JSON.parse(JSON.stringify(current_ReleaseSP)); 
    if(current_ReleaseSP['CurRelease_SP'] == 'SP_UNDEF') { current_initiative_info['AbnormalSprint'] = true; } else { current_initiative_info['AbnormalSprint'] = false; }

    // workflow
    let target = initparse.conversionSprintToDate(current_ReleaseSP['CurRelease_SP']);
    let today = moment().locale('ko');
    current_workflow = JSON.parse(JSON.stringify(workflow)); // initialize...
    current_workflow['CreatedDate'] = initparse.getCreatedDate(issue);
    current_workflow['Status'] = initparse.getStatus(issue);
    current_workflow['totalDevelDays'] = initparse.getElapsedDays(current_workflow['CreatedDate'], target);
    current_workflow['RemainDays'] = initparse.getRemainDays(target, today);
    current_workflow = initparse.parseWorkflow(changelog, current_workflow);
    current_initiative_info['Workflow'] = JSON.parse(JSON.stringify(current_workflow)); 

    // Status Summary { 'UpdateDate' : 'None', count : 0, 'Description' : "" }
    current_initiative_info['StatusSummary'] = initparse.parseStatusSummary(changelog, current_workflow['Status']);

    // Arch Review
    current_initiative_info['ARCHREVIEW'] = { };   
    initiative_DB['issues'][index] = JSON.parse(JSON.stringify(current_initiative_info)) // object copy --> need deep copy
  }
  catch(error) { console.log("[Catch] get_InitiativeListfromJira - exception error = ", error); }
  
  await makeSnapshot_EpicDetailInfofromJira(current_initiative_info['Initiative Key'], index);
}


/*
  makeSnapshot_EpicDetailInfofromJira : Initiative Key ID('TVPLAT-XXXX')와 Initiative Index를 전달받아 Epic List를 구성한다.
*/
async function makeSnapshot_EpicDetailInfofromJira(init_keyvalue, init_index)
{
  console.log("[Proimse 2] makeSnapshot_EpicInfofromJira ---- Get Epic List / Update Epic Basic Info");
  var archjira = [ false, null, null, null];  // true/false, init_index, init_keyvalue, epic_keyvalue

  /*
   try/catch 사용하여 let epiclist = await initiative_jiraquery.getEpicListfromJira(init_keyvalue); 를 받은 후 처리해도 되고 (현재 구현된 상태)
   try/catch 없이  await initiative_jiraquery.getEpicListfromJira(init_keyvalue).then((epiclist) => {}).catch((error)=>{}) 로 처리해도 되고 (refactoring전 버전 - 아래 미변경된 코드 참조)
  */
  try {
    let epiclist = await initiative_jiraquery.getEpicListfromJira(init_keyvalue);
    console.log("getEpicListfromJira ==== [I-index]:", init_index, "[I-Key]:", init_keyvalue);
    epic_keylist = new Array();
    let issue = 0;
    let epic = initiative_DB['issues'][init_index]['EPIC'];

    for(key in epic)
    {
      if(key != 'issues')
      {
        if(key == 'EpicTotalCnt') { epic[key] = epiclist.total; } else { epic[key] = 0; }
      }
    }

    for (var i = 0; i < epiclist.total; i++) 
    {
      var init_ReleaseSP = initiative_DB['issues'][init_index]['ReleaseSprint']['CurRelease_SP'];
      var epic_ReleaseSP = 0;
      var init_Status = initiative_DB['issues'][init_index]['Workflow']['Status'];
      var epic_Status = 0;
      issue = epiclist['issues'][i];
      current_epic_info = JSON.parse(JSON.stringify(epic_info));
      current_epic_info['Epic Key'] = initparse.getKey(issue); 
      current_epic_info['duedate'] = initparse.getDueDate(issue);        
      current_epic_info['Release_SP'] = epic_ReleaseSP = initparse.conversionDuedateToSprint(current_epic_info['duedate']);        
      current_epic_info['Summary'] = initparse.getSummary(issue);         
      current_epic_info['Assignee'] = initparse.getAssignee(issue);        
      current_epic_info['Status'] = epic_Status = initparse.getStatus(issue);        
      current_epic_info['CreatedDate'] = initparse.getCreatedDate(issue);         
      current_epic_info['GovOrDeployment'] = initparse.checkGovDeployComponents(issue);    
      if(current_epic_info['GovOrDeployment'] == true) { current_epic_info['AbnormalSprint'] = false; }    
      else { current_epic_info['AbnormalSprint'] = initparse.checkAbnormalSP(init_ReleaseSP, init_Status, epic_ReleaseSP, epic_Status); }
      current_epic_info['Labels'] = initparse.getLabels(issue);     
      current_epic_info['SDET_NeedtoCheck'] = !initparse.checkLabels(issue, 'SDET_CHECKED'); // SDET_CHECKED label이 없을 경우 True...
      current_epic_info['SDET_NeedDevelTC'] = initparse.checkLabels(issue, '개발TC필요');

      // Archi Review
      if(current_epic_info['Summary'].includes("ARCH REVIEW") && initiative_DB['issues'][init_index]['ScopeOfChange'] != 'N/A')
      {
        archjira = [ true, init_index, init_keyvalue, current_epic_info['Epic Key']];
      }

      // 개발항목이면..... epic list에 추가하여 zephyer까지 체크하도록....
      if(SDETVerifyOnly)
      {
        if(archjira[0] == false || current_epic_info['SDET_NeedDevelTC'] == true) { epic_keylist.push(issue['key']); }
      }
      else { epic_keylist.push(issue['key']); }

      epic['issues'][i] = JSON.parse(JSON.stringify(current_epic_info));

      if(current_epic_info['Labels'].length == 0 || current_epic_info['SDET_NeedtoCheck'] == true) { epic['EpicNeedtoCheckCnt']++; }
      else
      {
        if(current_epic_info['SDET_NeedDevelTC'] == true) { epic['EpicDevelTCCnt']++; } else { epic['EpicNonDevelTCCnt']++; }
      }

      if(initparse.checkIsDelivered(current_epic_info['Status']) == false)
      {
        if(initparse.checkIsDelayed(current_epic_info['duedate']) == true) { epic['EpicDelayedCnt']++; }
        if(current_epic_info['duedate'] == null) { epic['EpicDuedateNullCnt']++; }
        if(current_epic_info['AbnormalSprint'] == true) { epic['EpicAbnormalSPCnt']++; }
      }  

      if(current_epic_info['GovOrDeployment'] == true) 
      {
        epic['EpicGovOrDeploymentCnt']++;
        if(initparse.checkIsDelivered(epic_Status) == true)
        {
          epic['EpicTotalResolutionCnt']++;
          epic['EpicGovOrDeploymentResolutionCnt']++;
        }
      }
      else
      {
        epic['EpicDevelCnt']++;
        if(initparse.checkIsDelivered(epic_Status) == true)
        {
          epic['EpicTotalResolutionCnt']++;
          epic['EpicDevelResolutionCnt']++;
        }
      }
    }
  }
  catch(error) {
    console.log("[Catch] getEpicListfromJira ==== [I-index]:", init_index, "[I-Key]:", init_keyvalue, " - exception error = ", error);
    get_errors['epiclist'].push(init_keyvalue);
  }

  // Archi Review
  if(archjira[0] == true) { await makeSnapshot_ArchiReviewInfofromJira(archjira[1], archjira[2], archjira[3]); }
  else
  {
    // Processing ARCH EPIC 
    current_Arch_Review = JSON.parse(JSON.stringify(Arch_Review)); // initialize...
    current_Arch_Review['ScopeOfChange'] = initiative_DB['issues'][init_index]['ScopeOfChange'];
    if(current_Arch_Review['ScopeOfChange'] == 'N/A')
    {
      current_Arch_Review['First Review']['Plan']['Interface Review'] = false;
      current_Arch_Review['First Review']['Plan']['Sangria Review'] = false;
      current_Arch_Review['First Review']['Plan']['FMEA'] = false;
    }
    else
    {
      let labelstring = initiative_DB['issues'][init_index]['Labels'].join();
      if(labelstring.includes("1st_reviewed")) { current_Arch_Review['First Review']['1stReviewDone'] = true; }
      if(labelstring.includes("interface_review")) { current_Arch_Review['First Review']['Plan']['Interface Review'] = true; }
      if(labelstring.includes("sangria")) { current_Arch_Review['First Review']['Plan']['Sangria Review'] = true; }
      if(labelstring.includes("fmea")) { current_Arch_Review['First Review']['Plan']['FMEA'] = true; }
    }

    initiative_DB['issues'][init_index]['ARCHREVIEW'] = JSON.parse(JSON.stringify(current_Arch_Review)); 
  }

  // Eipc Zephyer
  await makeSnapshot_EpicZephyrInfofromJira(init_index, epic_keylist); // initiative index, epick keylist     
  // Story Info (Story List)
  await makeSnapshot_StoryInfofromJira(init_index, epic_keylist); // initiative index, epick keylist        
}


/*
  makeSnapshot_ArchiReviewInfofromJira : Archi Epic기반으로 Architecture Review 진행현황 정보를 구성한다.
*/
async function makeSnapshot_ArchiReviewInfofromJira(init_index, init_keyvalue, epic_keyvalue)
{
  console.log("[Proimse 3] makeSnapshot_ArchiReviewInfofromJira ---- Get ARCH Epic-Story List / Update Story Basic Info");
 
  // Processing ARCH EPIC 
  current_Arch_Review = JSON.parse(JSON.stringify(Arch_Review)); // initialize...
  await initiative_jiraquery.get_ChangeLogfromJira('keyID', epic_keyvalue)
  .then((epicinfo) => {
      var issue = epicinfo['issues'][0];
      current_Arch_Review['Key'] = epic_keyvalue;
      current_Arch_Review['ScopeOfChange'] = initiative_DB['issues'][init_index]['ScopeOfChange'];
      let labelstring = initiative_DB['issues'][init_index]['Labels'].join();
      if(labelstring.includes("1st_reviewed")) { current_Arch_Review['First Review']['1stReviewDone'] = true; }
      if(labelstring.includes("interface_review")) { current_Arch_Review['First Review']['Plan']['Interface Review'] = true; }
      if(labelstring.includes("sangria")) { current_Arch_Review['First Review']['Plan']['Sangria Review'] = true; }
      if(labelstring.includes("fmea")) { current_Arch_Review['First Review']['Plan']['FMEA'] = true; }

      var current_Arch_1st_workflow = JSON.parse(JSON.stringify(Arch_1st_workflow));
      current_Arch_1st_workflow['CreatedDate'] = initparse.getCreatedDate(issue);
      current_Arch_1st_workflow['Status'] = initparse.getStatus(issue);
      /*
      [RED] 
       1. init status가 ELT가 지났는데 1stReviewDone == false 이면 위반 : o
       2. init status가  In Progress 인데 ARCH EPIC Status가 Scoping / Review상태이면 위반 : o
       3. init status가 Delivered/Closed상태인데 Arch Epic이 Delivered/Closed가 아닌경우  : o
       4. Release Sprint 일정 2개 Sprint 이내에도 Arch Epic이 Closed가 안된경우 : o
       [YELLOW]
       1. [ARCHREVIEW]항목이 Null인경우.... 즉 Archi Epic이 없는 경우.... 1st Review 미진행 또는 진행중인 항목. : init value...
       [GREEN]
       1. [RED] / [YELLOW]를 제외한 Default 상태
      */
      let init_status = initiative_DB['issues'][init_index]['Workflow']['Status'];
      let init_ReleaseSP = initiative_DB['issues'][init_index]['ReleaseSprint']['CurRelease_SP'];
      let arch_epicstatus = current_Arch_1st_workflow['Status'];
      if(init_status != 'Deferred' && init_status != 'PROPOSED TO DEFER') // Normal workflow
      {
        let color = 'GREEN';
        current_Arch_1st_workflow['Signal'] = 'GREEN';
        if(init_status != 'DRAFTING' && init_status != 'PO REVIEW')
        {
          // RED case
          if(labelstring.includes("1st_reviewed") == false) { color = 'RED'; }
          if(init_status == "In Progress" && (arch_epicstatus == 'Scoping' || arch_epicstatus == 'Review')) { color = 'RED'; }
          if((init_status == "Delivered" || init_status == "Closed") && (arch_epicstatus != 'Delivered' && arch_epicstatus != 'Closed')) { color = 'RED'; }
          /*
          let target = initparse.conversionSprintToDate(init_ReleaseSP);
          target = moment(target).add(9, 'Hour');
          let today = moment().locale('ko');
          today = moment(today).add(9, 'Hour');
          let diff = (target - today) / (1000*60*60*24); 
          */
          let target = initparse.conversionSprintToDate(init_ReleaseSP);
          let today = moment().locale('ko');
          let diff = initparse.getRemainDays(target, today);
          if(diff <= 28 && (arch_epicstatus != 'Delivered' && arch_epicstatus != 'Closed')) { color = 'RED'; }
          if((diff > 28 && diff <= 42) && (arch_epicstatus != 'Delivered' && arch_epicstatus != 'Closed')) { color = 'YELLOW'; }
        }
        current_Arch_1st_workflow['Signal'] = color;
      }
      current_Arch_1st_workflow = initparse.parseArchEpicWorkflow(epicinfo['issues'][0]['changelog'], current_Arch_1st_workflow);
      current_Arch_Review['First Review']['workflow'] = current_Arch_1st_workflow;
      //initiative_DB['issues'][init_index]['ARCHREVIEW'] = JSON.parse(JSON.stringify(current_Arch_Review)); 
  })
  .catch((error) => { console.log("[ARCH] Errors of getting Epic_History = ", error); });
  
  // Processing ARCH EPIC-Story 1
  var story_keylist = new Array();

  try {
    let storylist = await initiative_jiraquery.getStoryListfromJira(epic_keyvalue);
    for (var i = 0; i < storylist.total; i++) { story_keylist.push(storylist['issues'][i]['key']); }
  }
  catch(error) { console.log("[Catch] getStoryListfromJira ==== [I-index]:", init_index, "[E-Key]:", epic_keyvalue, " - exception error = ", error); }

  // Processing ARCH EPIC-Story 2
  for(var i = 0; i < story_keylist.length; i++)
  {
    try {
      let storyinfo = await initiative_jiraquery.get_ChangeLogfromJira('keyID', story_keylist[i]);
      var issue = storyinfo['issues'][0];
      var current_Arch_2nd_workflow = JSON.parse(JSON.stringify(Arch_2nd_workflow));
      let summary = initparse.getSummary(issue);
      let reviewkey = null;
      current_Arch_2nd_workflow['CreatedDate'] = initparse.getCreatedDate(issue);
      current_Arch_2nd_workflow['Status'] = initparse.getStatus(issue);
      current_Arch_2nd_workflow['Signal'] = "-";
  
      if(summary.includes("INTERFACE REVIEW")) { reviewkey = "Interface Review"; }
      else if(summary.includes("DOCUMENT REVIEW")) { reviewkey = "Document Review"; }
      else if(summary.includes("ARCHITECTURE REVIEW")) { reviewkey = "Architecture Review"; }
      else if(summary.includes("FMEA REVIEW")) { reviewkey = "FMEA Review"; }

      if(reviewkey != null) 
      { 
        current_Arch_2nd_workflow['Signal'] = "GREEN";
        /*
        [RED] 
        1. Interface Review / Document Review 가 Release SP 3개 SPRINT전에 종료가 안되면.....
        2. Release Sprint 일정 3개 Sprint 이내에도 Arch Story(Arch review / fmea review)가 Verify/Closed가 안된경우
        3. arch epic이 Delivered/Closed상태인데 Arch Story가 Closed가 아닌경우
        [YELLOW]
        [GREEN]
        1. [RED] / [YELLOW]를 제외한 Default 상태
        */
        let init_status = initiative_DB['issues'][init_index]['Workflow']['Status'];
        let init_ReleaseSP = initiative_DB['issues'][init_index]['ReleaseSprint']['CurRelease_SP'];
        let arch_epicstatus = current_Arch_Review['First Review']['workflow']['Status'];
        let arch_curstorystatus = current_Arch_2nd_workflow['Status'];

        let target = initparse.conversionSprintToDate(init_ReleaseSP);
        let today = moment().locale('ko');
        let diff = initparse.getRemainDays(target, today);
        let color = 'GREEN';
        // [RED Case]
        if(reviewkey == "Interface Review" || reviewkey == "Document Review")
        {
          if(diff <= 42 && arch_curstorystatus != "Closed") { color = "RED"; } 
        }
        if((arch_epicstatus == "Delivered" || arch_epicstatus == 'Closed') && (arch_curstorystatus != "Closed")) { color = "RED"; }
        if(reviewkey == "Architecture Review" || reviewkey == "FMEA Review")
        {
          if(diff <= 42 && (arch_curstorystatus != "Verify" && arch_curstorystatus != "Closed")) { color = "RED"; } 
        }
        // [YELLOW Case]
        // ??

        current_Arch_2nd_workflow['Signal'] = color;
        current_Arch_Review['Second Review'][reviewkey]['output'] = true; 
        current_Arch_Review['Second Review'][reviewkey]['workflow'] = initparse.parseArchStoryWorkflow(storyinfo['issues'][0]['changelog'], current_Arch_2nd_workflow);
      }
      initiative_DB['issues'][init_index]['ARCHREVIEW'] = JSON.parse(JSON.stringify(current_Arch_Review)); 
    }
    catch(error) { console.log("[ARCH] Errors of getting EpicStory_History = ", error); }    
  }
}


/*
  makeSnapshot_StoryInfofromJira : Initiative Index, Epic Keylist를 받아서 Story 정보를 구성한다.
*/
async function makeSnapshot_StoryInfofromJira(init_index, epickeylist)
{
  console.log("[Proimse 4] makeSnapshot_StoryInfofromJira ---- Get Epic-Story List / Update Story Basic Info");
  var init_keyvalue = initiative_keylist[init_index];
  let issue = 0;
  let initstorysummary = initiative_DB['issues'][init_index]['STORY_SUMMARY'];

  for(key in initstorysummary) { initstorysummary[key] = 0; }
  var storykeyverify = [];
  for(var i = 0; i < epickeylist.length; i++)
  {
    var epic_keyvalue = epickeylist[i];
    await initiative_jiraquery.getStoryListfromJira(epic_keyvalue)
    .then((storylist) => {
      console.log("getStoryListfromJira ==== [I-index]:", init_index, "[E-Key]:", epic_keyvalue);
      //console.log(storylist);
      story_keylist = new Array();
      let issue = 0;
      let epicstorysummary = initiative_DB['issues'][init_index]['EPIC']['issues'][i]['STORY']['STORY_SUMMARY'];

      for(key in epicstorysummary)
      {
        if(key == 'StoryTotalCnt') { epicstorysummary[key] = storylist.total; } else { epicstorysummary[key] = 0; }
      }

      for (var j = 0; j < storylist.total; j++) 
      {
        var init_ReleaseSP = initiative_DB['issues'][init_index]['ReleaseSprint']['CurRelease_SP'];
        var init_Status = initiative_DB['issues'][init_index]['Workflow']['Status'];
        var story_ReleaseSP = 0;
        var story_Status = 0;
        issue = storylist['issues'][j];
        current_story_info = JSON.parse(JSON.stringify(story_info));
        current_story_info['Story Key'] = initparse.getKey(issue); 
        current_story_info['duedate'] = initparse.getDueDate(issue);        
        current_story_info['Release_SP'] = story_ReleaseSP = initparse.conversionDuedateToSprint(current_story_info['duedate']);         
        current_story_info['Summary'] = initparse.getSummary(issue);         
        current_story_info['Assignee'] = initparse.getAssignee(issue);        
        current_story_info['Status'] = story_Status = initparse.getStatus(issue);        
        current_story_info['CreatedDate'] = initparse.getCreatedDate(issue);        
        current_story_info['GovOrDeployment'] = initparse.checkGovDeployComponents(issue);        
        current_story_info['AbnormalSprint'] = initparse.checkAbnormalSP(init_ReleaseSP, init_Status, story_ReleaseSP, story_Status); 
        current_story_info['Labels'] = initparse.getLabels(issue);     
        current_story_info['SDET_NeedtoCheck'] = !initparse.checkLabels(issue, 'SDET_CHECKED');
        current_story_info['SDET_NeedDevelTC'] = initparse.checkLabels(issue, '개발TC필요');

        current_story_info['StoryPoint'] = 0; // need to be updated     
        /*  
        current_story_info['Zephyr'] = 0; // need to be updated      
        */
       storykeyverify.push(current_story_info['Story Key']);
        // 개발항목이면..... Story list에 추가하여 zephyer까지 체크하도록....
        if(SDETVerifyOnly)
        {
          if(current_story_info['SDET_NeedDevelTC'] == true) { story_keylist.push(storylist['issues'][j]['key']); }
        } else { story_keylist.push(storylist['issues'][j]['key']); }

        initiative_DB['issues'][init_index]['EPIC']['issues'][i]['STORY']['issues'][j] = JSON.parse(JSON.stringify(current_story_info));   

        if(current_story_info['AbnormalSprint'] == true) { initiative_DB['issues'][init_index]['AbnormalSprint'] = true; }

        if(current_story_info['Labels'].length == 0 || current_story_info['SDET_NeedtoCheck'] == true) { epicstorysummary['StoryNeedtoCheckCnt']++; }
        else
        {
          if(current_story_info['SDET_NeedDevelTC'] == true) { epicstorysummary['StoryDevelTCCnt']++; } else { epicstorysummary['StoryNonDevelTCCnt']++; }
        }

        if(initparse.checkIsDelivered(story_Status) == false)
        {
          if(initparse.checkIsDelayed(current_story_info['duedate']) == true) { epicstorysummary['StoryDelayedCnt']++; }
          if(current_story_info['duedate'] == null) { epicstorysummary['StoryDuedateNullCnt']++; }
          if(current_story_info['AbnormalSprint'] == true) { epicstorysummary['StoryAbnormalSPCnt']++; }
        }

        if(current_story_info['GovOrDeployment'] == true) 
        {
          epicstorysummary['StoryGovOrDeploymentCnt']++;
          if(initparse.checkIsDelivered(story_Status) == true)
          {
            epicstorysummary['StoryTotalResolutionCnt']++;
            epicstorysummary['StoryGovOrDeploymentResolutionCnt']++;
          }
        }
        else
        {
          epicstorysummary['StoryDevelCnt']++;
          if(initparse.checkIsDelivered(story_Status) == true)
          {
            epicstorysummary['StoryTotalResolutionCnt']++;
            epicstorysummary['StoryDevelResolutionCnt']++;
          }
        }             
      }
 
      for(key in initstorysummary) { initstorysummary[key] += epicstorysummary[key]; }
    }).catch(error => {
      console.log("[Catch] getStoryListfromJira ==== [I-index]:", init_index, "[E-Key]:", epic_keyvalue, " - exception error = ", error);
      let error_info = { 'IK' : '', 'EK' : '' };
      error_info['IK'] = init_keyvalue;
      error_info['EK'] = epic_keyvalue;
      get_errors['storylist'].push(error_info);
    });
    await makeSnapshot_StoryZephyrInfofromJira(init_index, i, story_keylist);     
  }
  console.log("[[Storykeylist]] = ", storykeyverify.join());
  Save_JSON_file(storykeyverify, "./public/json/storylist.json");
}


/*
  makeSnapshot_EpicZephyrInfofromJira : Initiative Index, Epic Keylist를 받아서 Epic Zephyr 정보를 구성한다.(Zephyr, Zephyr Execution)
*/
async function makeSnapshot_EpicZephyrInfofromJira(init_index, epickeylist)
{
  console.log("[Proimse 3] makeSnapshot_EpicZephyrInfofromJira ---- Get Epic-Zephyr List / Update Zephyr Basic Info");
 
  var init_keyvalue = initiative_keylist[init_index];
  
  for(var i = 0; i < epickeylist.length; i++)
  {
    var epic_keyvalue = epickeylist[i];
    await initiative_jiraquery.getZephyerListfromJira(epic_keyvalue)
    .then((zephyrlist) => {
      //console.log(zephyrlist);
      if(initiative_DB['issues'][init_index]['EPIC']['issues'][i]['SDET_NeedDevelTC'] == true)
      {
        if(zephyrlist.total > 0) { initiative_DB['issues'][init_index]['EPIC']['EpicHasTCCnt']++; }
      }
      let epiczephyr = initiative_DB['issues'][init_index]['EPIC']['issues'][i]['Zephyr'];
      console.log("getZephyerListfromJira ==== [I-index]:", init_index, "[I-Key]:", init_keyvalue, "[E-index]:", i, "[E-Key]:", epic_keyvalue, "[Z-Total]:",zephyrlist.total);
      epiczephyr['ZephyrCnt'] = zephyrlist.total; 
      zephyr_issueIdlist = [];
      let issue = 0;
      for (var j = 0; j < zephyrlist.total; j++) 
      {
        issue = zephyrlist['issues'][j];
        current_zephyr_info = JSON.parse(JSON.stringify(zephyr_info));
        // need to be update initiative info
        current_zephyr_info['IssueID'] = issue['id'];
        zephyr_issueIdlist.push(issue['id']);
        current_zephyr_info['Zephyr Key'] = initparse.getKey(issue);      
        current_zephyr_info['Summary'] = initparse.getSummary(issue);        
        current_zephyr_info['Assignee'] = initparse.getAssignee(issue);         
        current_zephyr_info['Status'] = initparse.getStatus(issue);        
        current_zephyr_info['Labels'] = initparse.getLabels(issue);        
        //console.log("^^^^add zephyr^^^^^");       
        epiczephyr['ZephyrTC'][j] = JSON.parse(JSON.stringify(current_zephyr_info)); 
        // async
        if(async_mode == true) { makeSnapshot_EpicZephyrExecutionInfofromJira(init_index, i, j, current_zephyr_info['IssueID']); }
      }
    }).catch(error => {
      console.log("[Catch] getZephyerListfromJira ==== [I-index]:", init_index, "[I-Key]:", init_keyvalue, "[E-index]:", i, "[E-Key]:", 
      epic_keyvalue, " - exception error = ", error);
      let error_info = { 'IK' : '', 'EK' : '' };
      error_info['IK'] = init_keyvalue;
      error_info['EK'] = epic_keyvalue;
      get_errors['e_zephyrlist'].push(error_info);
    });
    //sync
    if(async_mode == false) { await makeSnapshot_SyncEpicZephyrExecutionInfofromJira(init_index, i, zephyr_issueIdlist); }
  }
}


/*
  makeSnapshot_EpicZephyrExecutionInfofromJira : Initiative Index, Epic Index, Zephyr Index, ZephyrKeyID를 받아서 Epic Zephyr의 Execution 정보를 구성한다.
*/
async function makeSnapshot_EpicZephyrExecutionInfofromJira(init_index, epic_index, zephyr_index, zephyrkeyID)
{
  console.log("[Promise 4.1] makeSnapshot_EpicZephyrExecutionInfofromJira ---- Update Epic~Zephyr Executions info");
  await initiative_jiraquery.getZephyerExecutionfromJira(zephyrkeyID)
  .then((zephyrExecution) => {
    //console.log(zephyrExecution);
    console.log("getZephyerExecutionfromJira ==== [I-index]:", init_index, "[E-index]:", epic_index, "[Z-index]:", zephyr_index, "[Z-KeyID]:", zephyrkeyID);
    let issue = 0;

    for (var i = 0; i < zephyrExecution['executions'].length; i++) 
    {
      current_zephyr_exeinfo = { };
      issue = zephyrExecution['executions'][i];
      current_zephyr_exeinfo['id'] = initparse.getZephyrExeinfo_ID(issue); 
      current_zephyr_exeinfo['executionStatus'] = initparse.getZephyrExeinfo_Status(issue);
      current_zephyr_exeinfo['executedOn'] = initparse.getZephyrExeinfo_Date(issue);
      current_zephyr_exeinfo['executedBy'] = initparse.getZephyrExeinfo_Tester(issue);
      current_zephyr_exeinfo['cycleId'] = initparse.getZephyrExeinfo_cycleId(issue);
      current_zephyr_exeinfo['cycleName'] = initparse.getZephyrExeinfo_cycleName(issue);
      initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['Zephyr']['ZephyrTC'][zephyr_index]['Executions'][i] = JSON.parse(JSON.stringify(current_zephyr_exeinfo)); 
    }
  }).catch(error => {
    console.log("[Catch] getZephyerExecutionfromJira ==== [I-index]:", init_index, "[E-index]:", epic_index, "[Z-index]:", 
    zephyr_index, "[Z-KeyID]:", zephyrkeyID, " - exception error = ", error);
    let error_info = { 'IK' : '', 'EK' : '', 'ZK': '', 'ZID' : '' };
    error_info['IK'] = initiative_DB['issues'][init_index]['Initiative Key'];
    error_info['EK'] = initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['Epic Key'];
    error_info['ZK'] = initiative_DB['issues'][init_index]['EPIC']['Zephyr']['Zephyr TC'][zephyr_index]['Zephyr Key'];
    error_info['ZID'] = zephyrkeyID;
    get_errors['e_zephyr_exeinfo'].push(error_info);
  });
}


/*
  makeSnapshot_SyncEpicZephyrExecutionInfofromJira : Initiative Index, Epic Index, ZephyrKeyID List를 받아서 Epic Zephyr의 Execution 정보를 구성한다.
*/
async function makeSnapshot_SyncEpicZephyrExecutionInfofromJira(init_index, epic_index, zephyr_issueIdlist)
{
  console.log("[Promise 4.1] makeSnapshot_SyncEpicZephyrExecutionInfofromJira ---- Update Epic~Zephyr Executions info");

  for(var i = 0; i < zephyr_issueIdlist.length; i++)
  {
    var zephyrkeyID = zephyr_issueIdlist[i];
    await initiative_jiraquery.getZephyerExecutionfromJira(zephyrkeyID)
    .then((zephyrExecution) => {
      console.log("getZephyerExecutionfromJira ==== [I-index]:", init_index, "[E-index]:", epic_index, "[Z-index]:", i, "[Z-KeyID]:", zephyrkeyID);
      //console.log(zephyrExecution);
      let issue = 0;
      for (var j = 0; j < zephyrExecution['executions'].length; j++) 
      {
        current_zephyr_exeinfo = {}; 
        issue = zephyrExecution['executions'][j];
        current_zephyr_exeinfo['id'] = initparse.getZephyrExeinfo_ID(issue); 
        current_zephyr_exeinfo['executionStatus'] = initparse.getZephyrExeinfo_Status(issue);
        current_zephyr_exeinfo['executedOn'] = initparse.getZephyrExeinfo_Date(issue);
        current_zephyr_exeinfo['executedBy'] = initparse.getZephyrExeinfo_Tester(issue);
        current_zephyr_exeinfo['cycleId'] = initparse.getZephyrExeinfo_cycleId(issue);
        current_zephyr_exeinfo['cycleName'] = initparse.getZephyrExeinfo_cycleName(issue);
        initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['Zephyr']['ZephyrTC'][i]['Executions'][j] = JSON.parse(JSON.stringify(current_zephyr_exeinfo)); 
      }
    }).catch(error => {
      console.log("[Catch] getZephyerExecutionfromJira ==== [I-index]:", init_index, "[E-index]:", epic_index, "[Z-index]:", 
      i, "[Z-KeyID]:", zephyrkeyID, " - exception error = ", error);
      let error_info = { 'IK' : '', 'EK' : '', 'ZK': '', 'ZID' : '' };
      error_info['IK'] = initiative_DB['issues'][init_index]['Initiative Key'];
      error_info['EK'] = initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['Epic Key'];
      error_info['ZK'] = initiative_DB['issues'][init_index]['EPIC']['Zephyr']['Zephyr TC'][i]['Zephyr Key'];
      error_info['ZID'] = zephyrkeyID;
      get_errors['e_zephyr_exeinfo'].push(error_info);
    });
  }
}


/*
  makeSnapshot_StoryZephyrInfofromJira : Initiative Index, Epic Index, Story Keylist를 받아서 Story Zephyr 정보를 구성한다.(Zephyr, Zephyr Execution)
*/
async function makeSnapshot_StoryZephyrInfofromJira(init_index, epic_index, stroylist)
{
  console.log("[Proimse 3.1] makeSnapshot_StoryZephyrInfofromJira ---- Get Story-Zephyr List / Update Zephyr Basic Info");
 
  var init_keyvalue = initiative_keylist[init_index];
  var epic_keyvalue = epic_keylist[epic_index];
  
  for(var i = 0; i < stroylist.length; i++)
  {
    var story_keyvalue = stroylist[i];
    await initiative_jiraquery.getZephyerListfromJira(story_keyvalue)
    .then((zephyrlist) => {
      console.log("getZephyerListfromJira ==== [I-index]:", init_index, "[I-Key]:", init_keyvalue, "[E-index]:", epic_index, "[S-Key]:", story_keyvalue, "[Z-Total]:", zephyrlist.total);
      //console.log(zephyrlist);
      if(initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['STORY']['issues'][i]['SDET_NeedDevelTC'] == true)
      {
        if(zephyrlist.total > 0) // 연결율...
        { 
          initiative_DB['issues'][init_index]['STORY_SUMMARY']['StoryHasTCCnt']++; 
          initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['STORY']['STORY_SUMMARY']['StoryHasTCCnt']++; 
        }
      }

      let storyzephyr = initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['STORY']['issues'][i]['Zephyr'];
      storyzephyr['ZephyrCnt'] = zephyrlist.total; 
      zephyr_issueIdlist = [];
      let issue = 0;
      for (var j = 0; j < zephyrlist.total; j++) 
      {
        let status = 0;
        issue = zephyrlist['issues'][j];
        current_zephyr_info = JSON.parse(JSON.stringify(zephyr_info));
        // need to be update initiative info
        current_zephyr_info['IssueID'] = issue['id']; 
        zephyr_issueIdlist.push(issue['id']);
        current_zephyr_info['Zephyr Key'] = initparse.getKey(issue);      
        current_zephyr_info['Summary'] = initparse.getSummary(issue);        
        current_zephyr_info['Assignee'] = initparse.getAssignee(issue);         
        current_zephyr_info['Status'] = status = initparse.getStatus(issue);        
        current_zephyr_info['Labels'] = initparse.getLabels(issue);        
        //console.log("^^^^add zephyr^^^^^");       
        storyzephyr['ZephyrTC'][j] = JSON.parse(JSON.stringify(current_zephyr_info)); 
        // async mode....
        if(async_mode == true) { makeSnapshot_StoryZephyrExecutionInfofromJira(init_index, epic_index, i, j, current_zephyr_info['IssueID']); }
      }
    }).catch(error => {
      console.log("[Catch] getZephyerListfromJira ==== [I-index]:", init_index, "[I-Key]:", init_keyvalue, "[E-index]:", epic_index, "[S-Key]:", 
      story_keyvalue, " - exception error = ", error);
      let error_info = { 'IK' : '', 'EK' : '', 'SK' : '' };
      error_info['IK'] = init_keyvalue;
      error_info['EK'] = epic_keyvalue;
      error_info['SK'] = story_keyvalue;
      get_errors['s_zephyrlist'].push(error_info);
    });

    // sync mode....
    if(async_mode == false) { await makeSnapshot_SyncStoryZephyrExecutionInfofromJira(init_index, epic_index, i, zephyr_issueIdlist); }
  }
}


/*
  makeSnapshot_StoryZephyrExecutionInfofromJira : Initiative Index, Epic Index, Story Index,  Zephyr Index, ZephyrKeyID를 받아서 Story Zephyr의 Execution 정보를 구성한다.
*/
async function makeSnapshot_StoryZephyrExecutionInfofromJira(init_index, epic_index, story_index, zephyr_index, zephyrkeyID)
{
  console.log("[Promise 4.1.1] makeSnapshot_StoryZephyrExecutionInfofromJira ----");
  await initiative_jiraquery.getZephyerExecutionfromJira(zephyrkeyID)
  .then((zephyrExecution) => {
    console.log("getZephyerExecutionfromJira ==== [I-index]:", init_index, "[E-index]:", epic_index, "[S-index]:", story_index, "[Z-index]:", zephyr_index, "[Z-KeyID]:", zephyrkeyID);
    //console.log(zephyrExecution);
    let issue = 0;

    for (var i = 0; i < zephyrExecution['executions'].length; i++) 
    {
      let status = 0;
      current_zephyr_exeinfo = {}; 
      //current_zephyr_exeinfo = JSON.parse(JSON.stringify(zephyr_exeinfo));
      issue = zephyrExecution['executions'][i];
      current_zephyr_exeinfo['id'] = initparse.getZephyrExeinfo_ID(issue); 
      current_zephyr_exeinfo['executionStatus'] = status = initparse.getZephyrExeinfo_Status(issue);
      current_zephyr_exeinfo['executedOn'] = initparse.getZephyrExeinfo_Date(issue);
      current_zephyr_exeinfo['executedBy'] = initparse.getZephyrExeinfo_Tester(issue);
      current_zephyr_exeinfo['cycleId'] = initparse.getZephyrExeinfo_cycleId(issue);
      current_zephyr_exeinfo['cycleName'] = initparse.getZephyrExeinfo_cycleName(issue);
      initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['STORY']['issues'][story_index]['Zephyr']['ZephyrTC'][zephyr_index]['Executions'][i] = JSON.parse(JSON.stringify(current_zephyr_exeinfo)); 
    }
  }).catch(error => {
    console.log("getZephyerExecutionfromJira ==== [I-index]:", init_index, "[E-index]:", epic_index, "[S-index]:", story_index, 
    "[Z-index]:", zephyr_index, "[Z-KeyID]:", zephyrkeyID, " - exception error = ", error);
    let error_info = { 'IK' : '', 'EK' : '', 'SK' : '', 'ZK': '', 'ZID' : '' };
    error_info['IK'] = initiative_DB['issues'][init_index]['Initiative Key'];
    error_info['EK'] = initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['Epic Key'];
    error_info['SK'] = initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['STORY']['issues'][story_index]['Zephyr']['Zephyr TC'][zephyr_index]['Zephyr Key'];
    error_info['ZK'] = initiative_DB['issues'][init_index]['EPIC']['Zephyr']['Zephyr TC'][zephyr_index]['Zephyr Key'];
    error_info['ZID'] = zephyrkeyID;
    get_errors['s_zephyr_exeinfo'].push(error_info);    
  });
}


/*
  makeSnapshot_SyncStoryZephyrExecutionInfofromJira : Initiative Index, Epic Index, Story Index, ZephyrKeyID List를 받아서 Story Zephyr의 Execution 정보를 구성한다.
*/
async function makeSnapshot_SyncStoryZephyrExecutionInfofromJira(init_index, epic_index, story_index, zephyr_issueIdlist)
{
  console.log("[Promise 4.1.1] makeSnapshot_SyncStoryZephyrExecutionInfofromJira ---- Update Story Zephyr Execution info");

  for(var i = 0; i < zephyr_issueIdlist.length; i++)
  {
    var zephyrkeyID = zephyr_issueIdlist[i];
    await initiative_jiraquery.getZephyerExecutionfromJira(zephyrkeyID)
    .then((zephyrExecution) => {
      console.log("getZephyerExecutionfromJira ==== [I-index]:", init_index, "[E-index]:", epic_index, "[S-index]:", story_index, "[Z-index]:", i, "[Z-KeyID]:", zephyrkeyID);
      //console.log(zephyrExecution);
      let issue = 0;
      for (var j = 0; j < zephyrExecution['executions'].length; j++) 
      {
        current_zephyr_exeinfo = {}; 
        //current_zephyr_exeinfo = JSON.parse(JSON.stringify(zephyr_exeinfo));
        issue = zephyrExecution['executions'][j];
        current_zephyr_exeinfo['id'] = initparse.getZephyrExeinfo_ID(issue); 
        current_zephyr_exeinfo['executionStatus'] = initparse.getZephyrExeinfo_Status(issue);
        current_zephyr_exeinfo['executedOn'] = initparse.getZephyrExeinfo_Date(issue);
        current_zephyr_exeinfo['executedBy'] = initparse.getZephyrExeinfo_Tester(issue);
        current_zephyr_exeinfo['cycleId'] = initparse.getZephyrExeinfo_cycleId(issue);
        current_zephyr_exeinfo['cycleName'] = initparse.getZephyrExeinfo_cycleName(issue);
        //current_zephyr_exeinfo = JSON.parse(JSON.stringify(zephyr_exeinfo));
        //console.log(zephyrExecution['executions'][j]);
        initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['STORY']['issues'][story_index]['Zephyr']['ZephyrTC'][i]['Executions'][j] = JSON.parse(JSON.stringify(current_zephyr_exeinfo)); 
      }
    }).catch(error => {
      console.log("getZephyerExecutionfromJira ==== [I-index]:", init_index, "[E-index]:", epic_index, "[S-index]:", story_index,
        "[Z-index]:", i, "[Z-KeyID]:", zephyrkeyID, " - exception error = ", error);
        let error_info = { 'IK' : '', 'EK' : '', 'SK' : '', 'ZK': '', 'ZID' : '' };
        error_info['IK'] = initiative_DB['issues'][init_index]['Initiative Key'];
        error_info['EK'] = initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['Epic Key'];
        error_info['SK'] = initiative_DB['issues'][init_index]['EPIC']['issues'][epic_index]['STORY']['issues'][story_index]['Zephyr']['Zephyr TC'][zephyr_index]['Zephyr Key'];
        error_info['ZK'] = initiative_DB['issues'][init_index]['EPIC']['Zephyr']['Zephyr TC'][zephyr_index]['Zephyr Key'];
        error_info['ZID'] = zephyrkeyID;
        get_errors['s_zephyr_exeinfo'].push(error_info);    
    });
  }
}


/*
  makeZephyrStatics : Intiative_DB 정보를 기반으로 전반적인 통계를 재 구성한다.
*/
async function makeZephyrStatics()
{
  console.log("[Proimse 1] makeZephyrStatics ---- make statics of zephyr Info");
  let initiative = initiative_DB['issues'];  

  Initiative_Statics['EPIC+STORY_STATICS']['TOTAL'] = JSON.parse(JSON.stringify(StaticsInfo));
  Initiative_Statics['EPIC_STATICS']['TOTAL'] = JSON.parse(JSON.stringify(StaticsInfo));
  Initiative_Statics['STORY_STATICS']['TOTAL'] = JSON.parse(JSON.stringify(StaticsInfo));

  // [INITIATIVE LOOP]
  for(var i = 0; i < initiative.length; i++)
  {
    developers = {};
    console.log("[Initiative] i = ", i, "#######################");
    // SUM : EPIC + STORY 
    let current_Statics = JSON.parse(JSON.stringify(Initiative_Statics));

    let sum_total = current_Statics['EPIC+STORY_STATICS']['TOTAL'];
    let sum_org = current_Statics['EPIC+STORY_STATICS']['ORGANIZATION'];
    let sum_devel = current_Statics['EPIC+STORY_STATICS']['DEVELOPER'];

    // EPIC  
    let epicz_total = current_Statics['EPIC_STATICS']['TOTAL'];
    let epicz_org = current_Statics['EPIC_STATICS']['ORGANIZATION'];
    let epicz_devel = current_Statics['EPIC_STATICS']['DEVELOPER'];

    // STORY 
    let storyz_total = current_Statics['STORY_STATICS']['TOTAL'];
    let storyz_org = current_Statics['STORY_STATICS']['ORGANIZATION'];
    let storyz_devel = current_Statics['STORY_STATICS']['DEVELOPER'];

    // [EPIC LOOP]
    let epic = initiative_DB['issues'][i]['EPIC']['issues'];
    for(var j = 0; j < epic.length; j++)
    {
      var epicowner = epic[j]['Assignee'];
      if(epicowner == null) { epicowner = "Unassigned"; }
      if((epicowner in developers) == false) { developers[epicowner] = []; }

      developers[epicowner] = await getDevelopersInformation(epicowner);
      if((epicowner in sum_devel) == false) { sum_devel[epicowner] = JSON.parse(JSON.stringify(StaticsInfo)); }
      if((epicowner in epicz_devel) == false) { epicz_devel[epicowner] = JSON.parse(JSON.stringify(StaticsInfo)); }
      if((epicowner in storyz_devel) == false) { storyz_devel[epicowner] = JSON.parse(JSON.stringify(StaticsInfo)); }

      if(epic[j]['Labels'].length == 0 || epic[j]['SDET_NeedtoCheck'] == true) { epicz_devel[epicowner]['EpicNeedtoCheckCnt']++; }
      else
      {
        if(epic[j]['SDET_NeedDevelTC'] == true) { epicz_devel[epicowner]['EpicDevelTCCnt']++; } else { epicz_devel[epicowner]['EpicNonDevelTCCnt']++; }
      }

      epicz_devel[epicowner]['EpicTotalCnt']++;
      if(initparse.checkIsDelivered(epic[j]['Status']) == false)
      {
        if(initparse.checkIsDelayed(epic[j]['duedate']) == true) { epicz_devel[epicowner]['EpicDelayedCnt']++; }
        if(epic[j]['duedate'] == null) { epicz_devel[epicowner]['EpicDuedateNullCnt']++; }
        if(epic[j]['AbnormalSprint'] == true) { epicz_devel[epicowner]['EpicAbnormalSPCnt']++; }
      }      

      if(epic[j]['GovOrDeployment'] == true) 
      {
        epicz_devel[epicowner]['EpicGovOrDeploymentCnt']++;
        if(initparse.checkIsDelivered(epic[j]['Status']) == true)
        {
          epicz_devel[epicowner]['EpicTotalResolutionCnt']++;
          epicz_devel[epicowner]['EpicGovOrDeploymentResolutionCnt']++;
        }
      }
      else
      {
        epicz_devel[epicowner]['EpicDevelCnt']++;
        if(initparse.checkIsDelivered(epic[j]['Status']) == true)
        {
          epicz_devel[epicowner]['EpicTotalResolutionCnt']++;
          epicz_devel[epicowner]['EpicDevelResolutionCnt']++;
        }
      }

      // [EPIC ZEPHYR LOOP]
      let epic_zephyr = initiative_DB['issues'][i]['EPIC']['issues'][j]['Zephyr']['ZephyrTC'];

      if(initiative_DB['issues'][i]['EPIC']['issues'][j]['SDET_NeedDevelTC'] == true)
      {
        // [TBC] 연결율 : Archive zephyr만 달려있을 경우에는 EpicHasTCCnt가 0이 되어야 하나 Archive Zephyer개수가 반영되는지 / 예외처리 필요함.
        if(epic_zephyr.length > 0) { epicz_devel[epicowner]['EpicHasTCCnt']++; }
      }

      let epicz_assignee = null; 
      for(var k = 0; k < epic_zephyr.length; k++)
      {
        epicz_assignee = null; 
        if(initiative_DB['issues'][i]['EPIC']['issues'][j]['SDET_NeedDevelTC'] == true)
        {
          console.log("[EZ] i = ", i, " j = ", j, " k = ", k);
          epicz_assignee = epic_zephyr[k]['Assignee'];
          if(epicz_assignee == null) { epicz_assignee = "Unassigned"; }
          if((epicz_assignee in developers) == false) { developers[epicz_assignee] = []; }

          developers[epicz_assignee] = await getDevelopersInformation(epicz_assignee);
          if((epicz_assignee in sum_devel) == false) { sum_devel[epicz_assignee] = JSON.parse(JSON.stringify(StaticsInfo)); }
          if((epicz_assignee in epicz_devel) == false) { epicz_devel[epicz_assignee] = JSON.parse(JSON.stringify(StaticsInfo)); }
          if((epicz_assignee in storyz_devel) == false) { storyz_devel[epicz_assignee] = JSON.parse(JSON.stringify(StaticsInfo)); }

          epicz_devel[epicz_assignee]['ZephyrCnt']++;
          if(epic_zephyr[k]['Status'] == "Draft") { epicz_devel[epicz_assignee]['Zephyr_S_Draft']++; }
          else if(epic_zephyr[k]['Status'] == "Review") { epicz_devel[epicz_assignee]['Zephyr_S_Review']++; }
          else if(epic_zephyr[k]['Status'] == "Update") { epicz_devel[epicz_assignee]['Zephyr_S_Update']++; }
          else if(epic_zephyr[k]['Status'] == "Active") { epicz_devel[epicz_assignee]['Zephyr_S_Active']++; }
          else if(epic_zephyr[k]['Status'] == "Approval") { /*epicz_devel[epicz_assignee]['Zephyr_S_Approval']++;*/ epicz_devel[epicz_assignee]['Zephyr_S_Active']++; }
          else if(epic_zephyr[k]['Status'] == "Archived") { epicz_devel[epicz_assignee]['Zephyr_S_Archived']++; epicz_devel[epicz_assignee]['ZephyrCnt']--; }
          else { console.log("[EZ] Status is not Defined = ", epicz_devel[k]['Status']); epicz_devel[epicz_assignee]['ZephyrCnt']--; }

          // [EPIC ZEPHYR EXECUTION LOOP]
          let ez_last_time = 0, ez_final_status = "2";
          for(var l = 0; l < epic_zephyr[k]['Executions'].length; l++)
          {
            console.log("[EZ-Exec] i = ", i, " j = ", j, " k = ", k, " l = ", l);
            let epicze_assignee = epic_zephyr[k]['Executions'][l]['executedBy'];
            if(epicze_assignee == null) { epicze_assignee = "Unassigned"; }
            if((epicze_assignee in developers) == false) { developers[epicze_assignee] = []; }

            developers[epicze_assignee] = await getDevelopersInformation(epicze_assignee);
            if((epicze_assignee in sum_devel) == false) { sum_devel[epicze_assignee] = JSON.parse(JSON.stringify(StaticsInfo)); }
            if((epicze_assignee in epicz_devel) == false) { epicz_devel[epicze_assignee] = JSON.parse(JSON.stringify(StaticsInfo)); }
            if((epicze_assignee in storyz_devel) == false) { storyz_devel[epicze_assignee] = JSON.parse(JSON.stringify(StaticsInfo)); }

            let status = epic_zephyr[k]['Executions'][l]['executionStatus'];
            epicz_devel[epicze_assignee]['ZephyrExecutionCnt']++;
            if(status == "1") { epicz_devel[epicze_assignee]['executionStatus_PASS']++; }
            else if(status == "2") { epicz_devel[epicze_assignee]['executionStatus_FAIL']++; }
            else if(status == "-1") { epicz_devel[epicze_assignee]['executionStatus_UNEXEC']++; }
            else if(status == "3" || status == "4") { epicz_devel[epicze_assignee]['executionStatus_BLOCK']++; }
            else { console.log("[EZE] executionStatus is not Defined = ", status); }

            // check the result of last test status.
            if(status == "1") 
            {
              let ez_cur_time = epic_zephyr[k]['Executions'][l]['executedOn'];
              ez_cur_time = ez_cur_time.replace('/', '-');
              ez_cur_time = ez_cur_time.replace(' ', 'T');
              ez_cur_time = new Date(ez_cur_time);
              if(ez_last_time == 0 || (ez_cur_time - ez_last_time > 0)) { ez_last_time = ez_cur_time, ez_final_status = '1'; }
            }
          }
          if(epicz_assignee != null && ez_final_status == '1') { epicz_devel[epicz_assignee]['PassEpicCnt']++; }
        }
      }

      // [STORY LOOP]
      let story = initiative_DB['issues'][i]['EPIC']['issues'][j]['STORY']['issues'];
      for(var k = 0; k < story.length; k++)
      {
        var storyowner = story[k]['Assignee'];
        if(storyowner == null) { storyowner = "Unassigned"; }
        if((storyowner in developers) == false) { developers[storyowner] = []; }

        developers[storyowner] = await getDevelopersInformation(storyowner);
        if((storyowner in sum_devel) == false) { sum_devel[storyowner] = JSON.parse(JSON.stringify(StaticsInfo)); }
        if((storyowner in epicz_devel) == false) { epicz_devel[storyowner] = JSON.parse(JSON.stringify(StaticsInfo)); }
        if((storyowner in storyz_devel) == false) { storyz_devel[storyowner] = JSON.parse(JSON.stringify(StaticsInfo)); }

        if(story[k]['Labels'].length == 0 || story[k]['SDET_NeedtoCheck'] == true) { storyz_devel[storyowner]['StoryNeedtoCheckCnt']++; }
        else
        {
          if(story[k]['SDET_NeedDevelTC'] == true) { storyz_devel[storyowner]['StoryDevelTCCnt']++; } else { storyz_devel[storyowner]['StoryNonDevelTCCnt']++; }
        }

        storyz_devel[storyowner]['StoryTotalCnt']++;
        
        //if(initparse.checkIsDelayed(story[k]['duedate']) == true && initparse.checkIsDelivered(story[k]['Status']) == false) { storyz_devel[storyowner]['StoryDelayedCnt']++; }
        if(initparse.checkIsDelivered(story[k]['Status']) == false)
        {
          if(initparse.checkIsDelayed(story[k]['duedate']) == true) { storyz_devel[storyowner]['StoryDelayedCnt']++; }
          if(story[k]['duedate'] == null) { storyz_devel[storyowner]['StoryDuedateNullCnt']++; }
          if(story[k]['AbnormalSprint'] == true) { storyz_devel[storyowner]['StoryAbnormalSPCnt']++; }
        }      

        if(story[k]['GovOrDeployment'] == true) 
        {
          storyz_devel[storyowner]['StoryGovOrDeploymentCnt']++;
          if(initparse.checkIsDelivered(story[k]['Status']) == true)
          {
            storyz_devel[storyowner]['StoryTotalResolutionCnt']++;
            storyz_devel[storyowner]['StoryGovOrDeploymentResolutionCnt']++;
          }
        }
        else
        {
          storyz_devel[storyowner]['StoryDevelCnt']++;
          if(initparse.checkIsDelivered(story[k]['Status']) == true)
          {
            storyz_devel[storyowner]['StoryTotalResolutionCnt']++;
            storyz_devel[storyowner]['StoryDevelResolutionCnt']++;
          }
        }
  
        // [STORY ZEPHYR LOOP]
        let story_zephyr = initiative_DB['issues'][i]['EPIC']['issues'][j]['STORY']['issues'][k]['Zephyr']['ZephyrTC'];

        if(initiative_DB['issues'][i]['EPIC']['issues'][j]['STORY']['issues'][k]['SDET_NeedDevelTC'] == true)
        {
          // [TBC] 연결율 : Archive zephy만 달려있을 경우에는 StoryHasTCCnt가 0이 되어야 하나 Archive Zephyer개수가 반영되는지 / 예외처리 필요함.
          if(story_zephyr.length > 0) { storyz_devel[storyowner]['StoryHasTCCnt']++; }
        }

        let storyz_assignee = null;
        for(var l = 0; l < story_zephyr.length; l++)
        {
          storyz_assignee = null;
          if(initiative_DB['issues'][i]['EPIC']['issues'][j]['STORY']['issues'][k]['SDET_NeedDevelTC'] == true)
          {
            storyz_assignee = story_zephyr[l]['Assignee'];
            if(storyz_assignee == null) { storyz_assignee = "Unassigned"; }
            if((storyz_assignee in developers) == false) { developers[storyz_assignee] = []; }

            developers[storyz_assignee] = await getDevelopersInformation(storyz_assignee);
            if((storyz_assignee in sum_devel) == false) { sum_devel[storyz_assignee] = JSON.parse(JSON.stringify(StaticsInfo)); }
            if((storyz_assignee in epicz_devel) == false) { epicz_devel[storyz_assignee] = JSON.parse(JSON.stringify(StaticsInfo)); }
            if((storyz_assignee in storyz_devel) == false) { storyz_devel[storyz_assignee] = JSON.parse(JSON.stringify(StaticsInfo)); }

            storyz_devel[storyz_assignee]['ZephyrCnt']++;
            if(story_zephyr[l]['Status'] == "Draft") { storyz_devel[storyz_assignee]['Zephyr_S_Draft']++; }
            else if(story_zephyr[l]['Status'] == "Review") { storyz_devel[storyz_assignee]['Zephyr_S_Review']++; }
            else if(story_zephyr[l]['Status'] == "Update") { storyz_devel[storyz_assignee]['Zephyr_S_Update']++; }
            else if(story_zephyr[l]['Status'] == "Active") { storyz_devel[storyz_assignee]['Zephyr_S_Active']++; }
            else if(story_zephyr[l]['Status'] == "Approval") { /*storyz_devel[storyz_assignee]['Zephyr_S_Approval']++;*/ storyz_devel[storyz_assignee]['Zephyr_S_Active']++; }
            else if(story_zephyr[l]['Status'] == "Archived") { storyz_devel[storyz_assignee]['Zephyr_S_Archived']++; storyz_devel[storyz_assignee]['ZephyrCnt']--; }
            else { console.log("[SZ] Status is not Defined = ", story_zephyr[l]['Status']); storyz_devel[storyz_assignee]['ZephyrCnt']--; }
        
            // [STORY ZEPHYR EXECUTION LOOP]
            let sz_last_time = 0, sz_final_status = "2";
            console.log("[SZ] i = ", i, " j = ", j, " k = ", k, " l = ", l);
            for(var m = 0; m < story_zephyr[l]['Executions'].length; m++)
            {
              let storyze_assignee = story_zephyr[l]['Executions'][m]['executedBy'];
              if(storyze_assignee == null) { storyze_assignee = "Unassigned"; }
              if((storyze_assignee in developers) == false) { developers[storyze_assignee] = []; }

              developers[storyze_assignee] = await getDevelopersInformation(storyze_assignee);
              if((storyze_assignee in sum_devel) == false) { sum_devel[storyze_assignee] = JSON.parse(JSON.stringify(StaticsInfo)); }
              if((storyze_assignee in epicz_devel) == false) { epicz_devel[storyze_assignee] = JSON.parse(JSON.stringify(StaticsInfo)); }
              if((storyze_assignee in storyz_devel) == false) { storyz_devel[storyze_assignee] = JSON.parse(JSON.stringify(StaticsInfo)); }

              console.log("[SZ-Exec] i = ", i, " j = ", j, " k = ", k, " l = ", l, " m = ", m);    

              let status = story_zephyr[l]['Executions'][m]['executionStatus'];
              storyz_devel[storyze_assignee]['ZephyrExecutionCnt']++;
              if(status == "1") { storyz_devel[storyze_assignee]['executionStatus_PASS']++; }
              else if(status == "2") { storyz_devel[storyze_assignee]['executionStatus_FAIL']++; }
              else if(status == "-1") { storyz_devel[storyze_assignee]['executionStatus_UNEXEC']++; }
              else if(status == "3" || status == "4") { storyz_devel[storyze_assignee]['executionStatus_BLOCK']++; }
              else { console.log("[SZE] executionStatus is not Defined = ", status); }

              // check the result of last test status.
              if(status == "1") 
              {
                let sz_cur_time = story_zephyr[l]['Executions'][m]['executedOn'];
                sz_cur_time = sz_cur_time.replace('/', '-');
                sz_cur_time = sz_cur_time.replace(' ', 'T');
                sz_cur_time = new Date(sz_cur_time);
                if(sz_last_time == 0 || (sz_cur_time - sz_last_time > 0)) { sz_last_time = sz_cur_time, sz_final_status = '1'; }
              }
            }
            if(storyz_assignee != null && sz_final_status == '1') { storyz_devel[storyz_assignee]['PassStoryCnt']++; }
          }
        }       
      }
    }

    console.log("developers = ", JSON.stringify(developers));

    // DEVELOPER
    for(assignee in developers)
    {
      // Developer Statics
      for(key in sum_devel[assignee]) { sum_devel[assignee][key] =  epicz_devel[assignee][key] + storyz_devel[assignee][key]; }
      for(key in epicz_total) { epicz_total[key] += epicz_devel[assignee][key]; }
      for(key in storyz_total) { storyz_total[key] += storyz_devel[assignee][key]; } //if(key.includes("Epic") == false)
      
      // Organization Statics
      let orgname = developerslist[assignee][2];
      if(orgname == null || orgname == undefined) { console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"); } else { console.log("Org Name = ", orgname); }
      if((orgname in sum_org) == false) { sum_org[orgname] = JSON.parse(JSON.stringify(StaticsInfo)); }
      if((orgname in epicz_org) == false) { epicz_org[orgname] = JSON.parse(JSON.stringify(StaticsInfo)); }
      if((orgname in storyz_org) == false) { storyz_org[orgname] = JSON.parse(JSON.stringify(StaticsInfo)); }

      for(key in epicz_org[orgname]) { epicz_org[orgname][key] += epicz_devel[assignee][key]; }
      for(key in storyz_org[orgname]) { storyz_org[orgname][key] += storyz_devel[assignee][key]; }
      for(key in sum_org[orgname]) { sum_org[orgname][key] = epicz_org[orgname][key] + storyz_org[orgname][key]; }
    }

    // EPIC + STORY Statics
    for(key in sum_total) { sum_total[key] = epicz_total[key] + storyz_total[key]; }

    initiative_DB['issues'][i]['STATICS'] = current_Statics;
    initiative_DB['issues'][i]['developers'] = developers;
  }
  initiative_DB['developers'] = developerslist;
}


/*
  make_URLinfo : Intiative_DB 정보(통계자료추가)를 기반으로 전반적인 URL 정보를 구성 및 추가한다.
*/
async function make_URLinfo()
{
  console.log("[Proimse 1] make_URLinfo ---- make URL of JIRA Info");
  var initiative = initiative_DB['issues'];  

  // [INITIATIVE LOOP]
  for(var i = 0; i < initiative.length; i++)
  {
    console.log("[Initiative] i = ", i, "#######################");
    let orgcode = initiative_DB['issues'][i]['OrgInfo'][4];  

    current_urlinfo = JSON.parse(JSON.stringify(urlinfo));
    current_urlinfo['EPIC+STORY_LINK']['TOTAL'] = JSON.parse(JSON.stringify(total_link_key));
    current_urlinfo['EPIC_LINK']['TOTAL'] = JSON.parse(JSON.stringify(total_link_key));
    current_urlinfo['STORY_LINK']['TOTAL'] = JSON.parse(JSON.stringify(total_link_key));

    // [EPIC LOOP]
    let epic = initiative_DB['issues'][i]['EPIC']['issues'];
    for(var j = 0; j < epic.length; j++)
    {
      current_urlinfo['EPIC_LINK']['TOTAL']['Total']['keys'].push(epic[j]['Epic Key']);

      if(epic[j]['Labels'].length == 0 || epic[j]['SDET_NeedtoCheck'] == true) { current_urlinfo['EPIC_LINK']['TOTAL']['NeedtoCheck']['keys'].push(epic[j]['Epic Key']); }
      else
      {
        if(epic[j]['SDET_NeedDevelTC'] == true) { current_urlinfo['EPIC_LINK']['TOTAL']['DevelTC']['keys'].push(epic[j]['Epic Key']); } 
        else { current_urlinfo['EPIC_LINK']['TOTAL']['NonDevelTC']['keys'].push(epic[j]['Epic Key']); }
      }

      if(initparse.checkIsDelivered(epic[j]['Status']) == false)
      {
        if(epic[j]['AbnormalSprint'] == true) { current_urlinfo['COMMON']['AbnormalSPList'].push(epic[j]['Epic Key']); }
      }      

      // [EPIC ZEPHYR LOOP]
      let epic_zephyr = initiative_DB['issues'][i]['EPIC']['issues'][j]['Zephyr']['ZephyrTC'];
      for(var k = 0; k < epic_zephyr.length; k++)
      {
        let ez_final_status = '2', ez_last_time = 0;
        if(initiative_DB['issues'][i]['EPIC']['issues'][j]['SDET_NeedDevelTC'] == true)
        {
          console.log("[EZ] i = ", i, " j = ", j, " k = ", k);
          let epicz_assignee = epic_zephyr[k]['Assignee'];
          if(epic_zephyr[k]['Status'] == "Draft" || epic_zephyr[k]['Status'] == "Review" || epic_zephyr[k]['Status'] == "Update" || epic_zephyr[k]['Status'] == "Active" || epic_zephyr[k]['Status'] == "Approval")
          { 
            current_urlinfo['EPIC_LINK']['TOTAL']['ZephyrTotal']['keys'].push(epic_zephyr[k]['Zephyr Key']); 
            console.log("push epic zephyr key = ", epic_zephyr[k]['Zephyr Key']);
          }

          if(epic_zephyr[k]['Status'] == "Draft") { current_urlinfo['EPIC_LINK']['TOTAL']['Zephyr_DRAFT']['keys'].push(epic_zephyr[k]['Zephyr Key']); }
          else if(epic_zephyr[k]['Status'] == "Review") { current_urlinfo['EPIC_LINK']['TOTAL']['Zephyr_REVIEW']['keys'].push(epic_zephyr[k]['Zephyr Key']); }
          else if(epic_zephyr[k]['Status'] == "Update") { current_urlinfo['EPIC_LINK']['TOTAL']['Zephyr_UPDATE']['keys'].push(epic_zephyr[k]['Zephyr Key']); }
          else if(epic_zephyr[k]['Status'] == "Active") { current_urlinfo['EPIC_LINK']['TOTAL']['Zephyr_ACTIVE']['keys'].push(epic_zephyr[k]['Zephyr Key']); }
          else if(epic_zephyr[k]['Status'] == "Approval") { current_urlinfo['EPIC_LINK']['TOTAL']['Zephyr_ACTIVE']['keys'].push(epic_zephyr[k]['Zephyr Key']); }
          else if(epic_zephyr[k]['Status'] == "Archived") {  }
          else { console.log("[EZ] Status is not Defined = ", epicz_devel[k]['Status']); }

          // [EPIC ZEPHYR EXECUTION LOOP]
          for(var l = 0; l < epic_zephyr[k]['Executions'].length; l++)
          {
            console.log("[EZ-Exec] i = ", i, " j = ", j, " k = ", k, " l = ", l);
            let epicze_assignee = epic_zephyr[k]['Executions'][l]['executedBy'];
            let status = epic_zephyr[k]['Executions'][l]['executionStatus'];
            // check the result of last test status.
            if(status == "1") 
            {
              let ez_cur_time = epic_zephyr[k]['Executions'][l]['executedOn'];
              ez_cur_time = ez_cur_time.replace('/', '-');
              ez_cur_time = ez_cur_time.replace(' ', 'T');
              ez_cur_time = new Date(ez_cur_time);
              if(ez_last_time == 0 || (ez_cur_time - ez_last_time > 0)) { ez_last_time = ez_cur_time, ez_final_status = '1'; }
            }           
          }       
          if(ez_final_status == '1') { current_urlinfo['EPIC_LINK']['TOTAL']['Zephyr_PASS']['keys'].push(epic_zephyr[k]['Zephyr Key']); }
          else { current_urlinfo['EPIC_LINK']['TOTAL']['Zephyr_FAIL']['keys'].push(epic_zephyr[k]['Zephyr Key']); }
        }
      }

      // [STORY LOOP]
      let story = initiative_DB['issues'][i]['EPIC']['issues'][j]['STORY']['issues'];
      for(var k = 0; k < story.length; k++)
      {
        var storyowner = story[k]['Assignee'];
        if(story[k]['Labels'].length == 0 || story[k]['SDET_NeedtoCheck'] == true) { current_urlinfo['STORY_LINK']['TOTAL']['NeedtoCheck']['keys'].push(story[k]['Story Key']); }
        else
        {
          if(story[k]['SDET_NeedDevelTC'] == true) { current_urlinfo['STORY_LINK']['TOTAL']['DevelTC']['keys'].push(story[k]['Story Key']); } 
          else { current_urlinfo['STORY_LINK']['TOTAL']['NonDevelTC']['keys'].push(story[k]['Story Key']); }
        }

        current_urlinfo['STORY_LINK']['TOTAL']['Total']['keys'].push(story[k]['Story Key']);
        
        if(initparse.checkIsDelivered(story[k]['Status']) == false)
        {
          if(story[k]['AbnormalSprint'] == true) { current_urlinfo['COMMON']['AbnormalSPList'].push(story[k]['Story Key']); }
        }      

        // [STORY ZEPHYR LOOP]
        let story_zephyr = initiative_DB['issues'][i]['EPIC']['issues'][j]['STORY']['issues'][k]['Zephyr']['ZephyrTC'];
        for(var l = 0; l < story_zephyr.length; l++)
        {
          let sz_final_status = '2', sz_last_time = 0;
          if(initiative_DB['issues'][i]['EPIC']['issues'][j]['STORY']['issues'][k]['SDET_NeedDevelTC'] == true)
          {
            let storyz_assignee = story_zephyr[l]['Assignee'];
            if(story_zephyr[l]['Status'] == "Draft" || story_zephyr[l]['Status'] == "Review" || story_zephyr[l]['Status'] == "Update" || story_zephyr[l]['Status'] == "Active" || story_zephyr[l]['Status'] == "Approval")
            { 
              current_urlinfo['STORY_LINK']['TOTAL']['ZephyrTotal']['keys'].push(story_zephyr[l]['Zephyr Key']);
              console.log("push Story zephyr key = ", story_zephyr[l]['Zephyr Key']);
            }
  
            if(story_zephyr[l]['Status'] == "Draft") { current_urlinfo['STORY_LINK']['TOTAL']['Zephyr_DRAFT']['keys'].push(story_zephyr[l]['Zephyr Key']); }
            else if(story_zephyr[l]['Status'] == "Review") { current_urlinfo['STORY_LINK']['TOTAL']['Zephyr_REVIEW']['keys'].push(story_zephyr[l]['Zephyr Key']); }
            else if(story_zephyr[l]['Status'] == "Update") { current_urlinfo['STORY_LINK']['TOTAL']['Zephyr_UPDATE']['keys'].push(story_zephyr[l]['Zephyr Key']); }
            else if(story_zephyr[l]['Status'] == "Active") { current_urlinfo['STORY_LINK']['TOTAL']['Zephyr_ACTIVE']['keys'].push(story_zephyr[l]['Zephyr Key']); }
            else if(story_zephyr[l]['Status'] == "Approval") { current_urlinfo['STORY_LINK']['TOTAL']['Zephyr_ACTIVE']['keys'].push(story_zephyr[l]['Zephyr Key']); }
            else if(story_zephyr[l]['Status'] == "Archived") { }
            else { console.log("[SZ] Status is not Defined = ", story_zephyr[l]['Status']); }
        
            // [STORY ZEPHYR EXECUTION LOOP]
            console.log("[SZ] i = ", i, " j = ", j, " k = ", k, " l = ", l);
            for(var m = 0; m < story_zephyr[l]['Executions'].length; m++)
            {
              let storyze_assignee = story_zephyr[l]['Executions'][m]['executedBy'];
              console.log("[SZ-Exec] i = ", i, " j = ", j, " k = ", k, " l = ", l, " m = ", m);    
              let status = story_zephyr[l]['Executions'][m]['executionStatus'];
              // check the result of last test status.
              if(status == "1") 
              {
                let sz_cur_time = story_zephyr[l]['Executions'][m]['executedOn'];
                sz_cur_time = sz_cur_time.replace('/', '-');
                sz_cur_time = sz_cur_time.replace(' ', 'T');
                sz_cur_time = new Date(sz_cur_time);
                if(sz_last_time == 0 || (sz_cur_time - sz_last_time > 0)) { sz_last_time = sz_cur_time, sz_final_status = '1'; }
              }
            }
            if(sz_final_status == '1') { current_urlinfo['STORY_LINK']['TOTAL']['Zephyr_PASS']['keys'].push(story_zephyr[l]['Zephyr Key']); }
            else { current_urlinfo['STORY_LINK']['TOTAL']['Zephyr_FAIL']['keys'].push(story_zephyr[l]['Zephyr Key']); }
          }
        }      
      } // story
    } // epic

    // COMMON
    current_urlinfo['COMMON']['EPIC_TOTAL'] = common_url + '(issuetype = epic) AND issuefunction in linkedissuesOf("key in (' + initiative[i]['Initiative Key'] + ')")';
    current_urlinfo['COMMON']['EPIC_Duedate_Null'] = current_urlinfo['COMMON']['EPIC_TOTAL'] + " AND (duedate = null AND Status not in (Closed, Deferred, Delivered, Verify, Resolved, Withdrawn))";
    current_urlinfo['COMMON']['EPIC_Duedate_Delayed'] = current_urlinfo['COMMON']['EPIC_TOTAL'] + " AND (duedate < now() AND Status not in (Closed, Deferred, Delivered, Verify, Resolved, Withdrawn))";
    current_urlinfo['COMMON']['EPIC_AbnormalSP'] = common_url + "(issuetype = epic) AND key in (" + current_urlinfo['COMMON']['AbnormalSPList'].join() + ")";
    current_urlinfo['COMMON']['STORY_TOTAL'] = common_url + '(issuetype = story OR issuetype = task) AND key in (' + current_urlinfo['STORY_LINK']['TOTAL']['Total']['keys'].join() + ')';
    current_urlinfo['COMMON']['STORY_Duedate_Null'] = current_urlinfo['COMMON']['STORY_TOTAL'] + 'AND (duedate = null AND Status not in (Closed, Deferred, Delivered, Verify, Resolved, Withdrawn))';
    current_urlinfo['COMMON']['STORY_Duedate_Delayed'] = current_urlinfo['COMMON']['STORY_TOTAL'] + 'AND (duedate < now() AND Status not in (Closed, Deferred, Delivered, Verify, Resolved, Withdrawn))';
    current_urlinfo['COMMON']['STORY_AbnormalSP'] = common_url + "(issuetype = story OR issuetype = task) AND key in (" + current_urlinfo['COMMON']['AbnormalSPList'].join() + ")";

    // Epic
    let linkstr = null;
    let keystr = [];
    for(let key in current_urlinfo['EPIC_LINK']['TOTAL'])
    { 
      linkstr = null, keystr = [];
      console.log("epic key = ", key, " ", current_urlinfo['EPIC_LINK']['TOTAL'][key]['keys'].join());
      keystr = current_urlinfo['EPIC_LINK']['TOTAL'][key]['keys'].join();
      if(keystr.length > 0) { linkstr = common_url + "key in ("+ keystr + ")"; }
      current_urlinfo['EPIC_LINK']['TOTAL'][key]['link'] = linkstr;
    }

    // Story
    for(let key in current_urlinfo['STORY_LINK']['TOTAL'])
    {
      linkstr = null, keystr = [];
      console.log("story key = ", key, " ", current_urlinfo['STORY_LINK']['TOTAL'][key]['keys'].join());
      keystr = current_urlinfo['STORY_LINK']['TOTAL'][key]['keys'].join();
      if(keystr.length > 0) { linkstr = common_url + "key in ("+ keystr + ")"; }
      current_urlinfo['STORY_LINK']['TOTAL'][key]['link'] = linkstr;
    }
    // epic + story
    for(let key in current_urlinfo['EPIC+STORY_LINK']['TOTAL'])
    {
      linkstr = null, keystr = [];
      current_urlinfo['EPIC+STORY_LINK']['TOTAL'][key]['keys'] = current_urlinfo['EPIC_LINK']['TOTAL'][key]['keys'].concat(current_urlinfo['STORY_LINK']['TOTAL'][key]['keys']);
      keystr = current_urlinfo['EPIC+STORY_LINK']['TOTAL'][key]['keys'].join();
      if(keystr.length > 0) { linkstr = common_url + "key in ("+current_urlinfo['EPIC+STORY_LINK']['TOTAL'][key]['keys'].join() + ")"; }
      current_urlinfo['EPIC+STORY_LINK']['TOTAL'][key]['link'] = linkstr;
    }

    // ORGANIZATION
    for(var orgname in initiative[i]['STATICS']['EPIC+STORY_STATICS']['ORGANIZATION'])
    { // EPIC
      current_urlinfo['EPIC_LINK']['ORGANIZATION'][orgname] = JSON.parse(JSON.stringify(OrgDevel_link_key));
      console.log("orgname = ", orgname);
      for(let key in current_urlinfo['EPIC_LINK']['ORGANIZATION'][orgname])
      {
        linkstr = current_urlinfo['EPIC_LINK']['TOTAL'][key]['link'];
        if(linkstr != null)
        {
          orgcode = getGroupCode(orgname);
          current_urlinfo['EPIC_LINK']['ORGANIZATION'][orgname][key] = linkstr + " AND Assignee in membersOf(" + '\"' + orgname + "(" + String(orgcode) + ")_grp" + '\")';
        }
        console.log("url = ", current_urlinfo['EPIC_LINK']['ORGANIZATION'][orgname][key]);
      }
      // STORY
      current_urlinfo['STORY_LINK']['ORGANIZATION'][orgname] = JSON.parse(JSON.stringify(OrgDevel_link_key));
      for(let key in current_urlinfo['STORY_LINK']['ORGANIZATION'][orgname])
      {
        linkstr = current_urlinfo['STORY_LINK']['TOTAL'][key]['link'];
        if(linkstr != null)
        {
          orgcode = getGroupCode(orgname);
          current_urlinfo['STORY_LINK']['ORGANIZATION'][orgname][key] = linkstr + " AND Assignee in membersOf(" + '\"' + orgname + "("+ String(orgcode) + ")_grp" + '\")';
        }
      }
      // EPIC + STORY
      current_urlinfo['EPIC+STORY_LINK']['ORGANIZATION'][orgname]=JSON.parse(JSON.stringify(OrgDevel_link_key));
      for(let key in current_urlinfo['EPIC+STORY_LINK']['ORGANIZATION'][orgname])
      {
        linkstr = current_urlinfo['EPIC+STORY_LINK']['TOTAL'][key]['link'];
        if(linkstr != null)
        {
          orgcode = getGroupCode(orgname);
          current_urlinfo['EPIC+STORY_LINK']['ORGANIZATION'][orgname][key] = linkstr + " AND Assignee in membersOf(" + '\"' + orgname + "("+ String(orgcode) + ")_grp" + '\")';
        }
      }
    }
    
    // DEVELOPER
    for(var assignee in initiative[i]['STATICS']['EPIC+STORY_STATICS']['DEVELOPER'])
    { 
      // MongoDB doesn't support keys with a dot in them so you're going to have to preprocess your JSON file to remove/replace them before importing it
      // or value = value.replace('.', "\\u002e"); reverse....again...
      let filter_assignee = assignee.replace('-', '.');
      // EPIC
      current_urlinfo['EPIC_LINK']['DEVELOPER'][assignee] = JSON.parse(JSON.stringify(OrgDevel_link_key));
      for(let key in current_urlinfo['EPIC_LINK']['DEVELOPER'][assignee])
      {
        linkstr = current_urlinfo['EPIC_LINK']['TOTAL'][key]['link'];
        if(linkstr != null)
        {
          current_urlinfo['EPIC_LINK']['DEVELOPER'][assignee][key] = linkstr + " AND Assignee in (" + filter_assignee + ")";
        }
      }
      // STORY
      current_urlinfo['STORY_LINK']['DEVELOPER'][assignee] = JSON.parse(JSON.stringify(OrgDevel_link_key));
      for(let key in current_urlinfo['STORY_LINK']['DEVELOPER'][assignee])
      {
        linkstr = current_urlinfo['STORY_LINK']['TOTAL'][key]['link'];
        if(linkstr != null)
        {
          current_urlinfo['STORY_LINK']['DEVELOPER'][assignee][key] = linkstr + " AND Assignee in (" + filter_assignee + ")";
        }
      }
      // EPIC + STORY
      current_urlinfo['EPIC+STORY_LINK']['DEVELOPER'][assignee] = JSON.parse(JSON.stringify(OrgDevel_link_key));
      for(let key in current_urlinfo['EPIC+STORY_LINK']['DEVELOPER'][assignee])
      {
        linkstr = current_urlinfo['EPIC+STORY_LINK']['TOTAL'][key]['link'];
        if(linkstr != null)
        {
          current_urlinfo['EPIC+STORY_LINK']['DEVELOPER'][assignee][key] = linkstr + " AND Assignee in (" + filter_assignee + ")";
        }
      }
    }

    initiative_DB['issues'][i]['URL'] = current_urlinfo;
  } // initiative
}


/*
  getGroupCode : 조직명을 받아서 그룹 Code를 return한다.
*/
function getGroupCode(OrgName)
{
  var develist = initiative_DB['developers'];
  for (developer in develist)
  {
      if (OrgName == develist[developer][2])
      {
        console.log("develpers[developer]['DepartmentCode'] = ", develist[developer][4]);
        return develist[developer][4];
      }
  }
  return 0;
}




/*
  getDevelopersInformation : 조직정보를 얻어온다.
*/
async function getDevelopersInformation(assignee) 
{
  if((assignee in developerslist) == false)
  {
    try {
      let result = await ldap.getLDAP_Info(assignee);
      developerslist[assignee] = initparse.getPersonalInfo(result['displayName'], result['DepartmentCode']); 
      console.log("[getDevelopersInformation] name = ", developerslist[assignee][0], " position = ", developerslist[assignee][1], " department = ", developerslist[assignee][2], " email = ", developerslist[assignee][3]);
    }
    catch(error) { console.log("[getDevelopersInformation][ERR] ldap.getLDAP_Info = ", error); }
  }

  return (developerslist[assignee]);
}


/*
  module.exports : 외부 함수 open (extern)
*/
module.exports = { 
  initiative_DB,              // final DB
  makeSnapshot_InitiativeListfromJira, // new version
  makeSnapshot_StaticsURL,
  Test,
 };



/*
  Test : Test Code........................
*/
async function Test()
{
  load_InitiativeDB('./public/json/initiative_DB_46093_Latest.json').then((result) => {
      console.log("[TEST] Read Initiative DB = ", JSON.stringify(initiative_DB));
    make_URLinfo();
  });


  console.log("[final-make_URLinfo] Save file = initiative_DB_URL");
  Save_JSON_file(initiative_DB, "./public/json/initiative_DB_URL_Latest.json");
  console.log("[final-make_URLinfo] Save end : initiative_DB_URL");
}


