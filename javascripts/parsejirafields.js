var moment = require('moment-timezone');

const HE_SP_Schedule = 
[   // 2018
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP11', 'start' : '2018-01-15', 'end' : '2018-01-28' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP12', 'start' : '2018-01-29', 'end' : '2018-02-11' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP13', 'start' : '2018-02-12', 'end' : '2018-02-25' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP14', 'start' : '2018-02-26', 'end' : '2018-03-11' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP15', 'start' : '2018-03-12', 'end' : '2018-04-01' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP16', 'start' : '2018-04-02', 'end' : '2018-04-15' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP17', 'start' : '2018-04-16', 'end' : '2018-04-29' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP18', 'start' : '2018-04-30', 'end' : '2018-05-13' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP19', 'start' : '2018-05-14', 'end' : '2018-05-27' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP20', 'start' : '2018-05-28', 'end' : '2018-06-10' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP21', 'start' : '2018-06-11', 'end' : '2018-06-24' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP22', 'start' : '2018-06-25', 'end' : '2018-07-08' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP23', 'start' : '2018-07-09', 'end' : '2018-07-22' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP24', 'start' : '2018-07-23', 'end' : '2018-08-05' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP25', 'start' : '2018-08-06', 'end' : '2018-08-19' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP26', 'start' : '2018-08-20', 'end' : '2018-09-02' },
    /*
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP27', 'start' : '2018-09-03', 'end' : '2018-09-16' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP28', 'start' : '2018-09-17', 'end' : '2018-09-30' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP29', 'start' : '2018-10-01', 'end' : '2018-10-14' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP30', 'start' : '2018-10-15', 'end' : '2018-10-28' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP31', 'start' : '2018-10-29', 'end' : '2018-11-11' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP32', 'start' : '2018-11-12', 'end' : '2018-11-25' },
    */
    /*
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP27/2019_SP01', 'start' : '2018-09-03', 'end' : '2018-09-16' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP28/2019_SP02', 'start' : '2018-09-17', 'end' : '2018-09-30' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP29/2019_SP03', 'start' : '2018-10-01', 'end' : '2018-10-14' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP30/2019_SP04', 'start' : '2018-10-15', 'end' : '2018-10-28' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP31/2019_SP05', 'start' : '2018-10-29', 'end' : '2018-11-11' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2018_SP32/2019_SP06', 'start' : '2018-11-12', 'end' : '2018-11-25' },
    */
    // 2019
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP01', 'start' : '2018-09-03', 'end' : '2018-09-16' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP02', 'start' : '2018-09-17', 'end' : '2018-09-30' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP03', 'start' : '2018-10-01', 'end' : '2018-10-14' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP04', 'start' : '2018-10-15', 'end' : '2018-10-28' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP05', 'start' : '2018-10-29', 'end' : '2018-11-11' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP06', 'start' : '2018-11-12', 'end' : '2018-11-25' },

    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP07', 'start' : '2018-11-26', 'end' : '2018-12-9'  },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP08', 'start' : '2018-12-10', 'end' : '2018-12-23' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP09', 'start' : '2018-12-24', 'end' : '2019-01-06' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP10', 'start' : '2019-01-07', 'end' : '2019-01-20' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP11', 'start' : '2019-01-21', 'end' : '2019-02-03' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP12', 'start' : '2019-02-04', 'end' : '2019-02-17' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP13', 'start' : '2019-02-18', 'end' : '2019-03-03' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP14', 'start' : '2019-03-04', 'end' : '2019-03-17' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP15', 'start' : '2019-03-18', 'end' : '2019-03-31' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP16', 'start' : '2019-04-01', 'end' : '2019-04-14' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2019_SP17', 'start' : '2019-04-15', 'end' : '2019-04-28' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2019_SP18', 'start' : '2019-04-29', 'end' : '2019-05-12' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2019_SP19', 'start' : '2019-05-13', 'end' : '2019-05-26' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2019_SP20', 'start' : '2019-05-27', 'end' : '2019-06-09' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2019_SP21', 'start' : '2019-06-10', 'end' : '2019-06-23' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2019_SP22', 'start' : '2019-06-24', 'end' : '2019-07-07' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2019_SP23', 'start' : '2019-07-08', 'end' : '2019-07-21' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2019_SP24', 'start' : '2019-07-22', 'end' : '2019-08-04' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2019_SP25', 'start' : '2019-08-05', 'end' : '2019-08-18' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2019_SP26', 'start' : '2019-08-19', 'end' : '2019-09-01' },

    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2019_SP27', 'start' : '2019-09-02', 'end' : '2019-09-15' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2019_SP28', 'start' : '2019-09-16', 'end' : '2019-09-29' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2019_SP29', 'start' : '2019-09-30', 'end' : '2019-10-13' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2019_SP30', 'start' : '2019-10-14', 'end' : '2019-10-27' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2019_SP31', 'start' : '2019-10-28', 'end' : '2019-11-10' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2019_SP32', 'start' : '2019-11-11', 'end' : '2019-11-24' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2019_SP33', 'start' : '2019-11-25', 'end' : '2019-12-08' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2019_SP34', 'start' : '2019-12-09', 'end' : '2019-12-22' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2019_SP35', 'start' : '2019-12-23', 'end' : '2020-01-05' },

    // 2020
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2020_SP01', 'start' : '2019-09-02', 'end' : '2019-09-15' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2020_SP02', 'start' : '2019-09-16', 'end' : '2019-09-29' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2020_SP03', 'start' : '2019-09-30', 'end' : '2019-10-13' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2020_SP04', 'start' : '2019-10-14', 'end' : '2019-10-27' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2020_SP05', 'start' : '2019-10-28', 'end' : '2019-11-10' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2020_SP06', 'start' : '2019-11-11', 'end' : '2019-11-24' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2020_SP07', 'start' : '2019-11-25', 'end' : '2019-12-08' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2020_SP08', 'start' : '2019-12-09', 'end' : '2019-12-22' },
    { 'IR' : 'IR1', 'SPRINT_SHORT' : '2020_SP09', 'start' : '2019-12-23', 'end' : '2020-01-05' },

    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2020_SP10', 'start' : '2020-01-06', 'end' : '2020-01-19' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2020_SP11', 'start' : '2020-01-20', 'end' : '2020-02-02' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2020_SP12', 'start' : '2020-02-03', 'end' : '2020-02-16' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2020_SP13', 'start' : '2020-02-17', 'end' : '2020-03-01' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2020_SP14', 'start' : '2020-03-02', 'end' : '2020-03-15' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2020_SP15', 'start' : '2020-03-16', 'end' : '2020-03-29' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2020_SP16', 'start' : '2020-03-30', 'end' : '2020-04-12' },
    { 'IR' : 'IR2', 'SPRINT_SHORT' : '2020_SP17', 'start' : '2020-04-13', 'end' : '2020-04-26' },

    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2020_SP18', 'start' : '2020-04-27', 'end' : '2020-05-10' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2020_SP19', 'start' : '2020-05-11', 'end' : '2020-05-24' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2020_SP20', 'start' : '2020-05-25', 'end' : '2020-06-07' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2020_SP21', 'start' : '2020-06-08', 'end' : '2020-06-21' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2020_SP22', 'start' : '2020-06-22', 'end' : '2020-07-05' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2020_SP23', 'start' : '2020-07-06', 'end' : '2020-07-19' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2020_SP24', 'start' : '2020-07-20', 'end' : '2020-08-09' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2020_SP25', 'start' : '2020-08-10', 'end' : '2020-08-23' },
    { 'IR' : 'IR3', 'SPRINT_SHORT' : '2020_SP26', 'start' : '2020-08-24', 'end' : '2020-09-06' },

    { 'IR' : 'IR4', 'SPRINT_SHORT' : '2020_SP27', 'start' : '2020-09-07', 'end' : '2020-09-20' },
    { 'IR' : 'IR4', 'SPRINT_SHORT' : '2020_SP28', 'start' : '2020-09-21', 'end' : '2020-10-11' },
    { 'IR' : 'IR4', 'SPRINT_SHORT' : '2020_SP29', 'start' : '2020-10-12', 'end' : '2020-10-25' },
    { 'IR' : 'IR4', 'SPRINT_SHORT' : '2020_SP30', 'start' : '2020-10-26', 'end' : '2020-11-08' },
    { 'IR' : 'IR4', 'SPRINT_SHORT' : '2020_SP31', 'start' : '2020-11-09', 'end' : '2020-11-22' },
    { 'IR' : 'IR4', 'SPRINT_SHORT' : '2020_SP32', 'start' : '2020-11-23', 'end' : '2020-12-06' },
    { 'IR' : 'IR4', 'SPRINT_SHORT' : '2020_SP33', 'start' : '2020-12-07', 'end' : '2020-12-20' },
    { 'IR' : 'IR4', 'SPRINT_SHORT' : '2020_SP34', 'start' : '2020-12-21', 'end' : '2021-01-01' },
];




//===========================================================================
//Get Key of jira
//[param] jiraIssue : json object of jira
//[return] str
//===========================================================================
function getKey(jiraIssue) {
    let value = jiraIssue['key'];
    if(value != null) {
        console.log("getKey = ", value)
        return value;
    }
    console.log("getKey = Null")
    return null;
}

//===========================================================================
// Get Summary of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getSummary(jiraIssue) {
    let value = jiraIssue['fields']['summary'];
    if(value != null) {
        console.log("getSummary = ", value);
        return value;
    }
    console.log("getSummary = Null");
    return null;
}

//===========================================================================
// Get Status of jira
// [param] jiraIssue : json object of jira
// [return]checkLabels str
//===========================================================================
function getStatus(jiraIssue) {
    let value = jiraIssue['fields']['status']['name'];
    console.log("getStatus = ", value);
    return value;
}

//===========================================================================
// Get issuetype of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getIssuetype(jiraIssue) {
    let value = jiraIssue['fields']['issuetype']['name'];
    console.log("getIssuetype = ", value)
    return value;
}

//===========================================================================
// Get resolution of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getResolution(jiraIssue) {
    let value = jiraIssue['fields']['resolution'];
    if(value != null) 
    {
        console.log("getResolution = ", value['name']);
        return value['name'];
    }
    console.log("getResolution = null");
    return null;
}


//===========================================================================
// Get components of jira
// [param] jiraIssue : json object of jira
// [return] components[]
//===========================================================================
function getComponents(jiraIssue) {
    let value = jiraIssue['fields']['components'];
    let compname = [];
    if(value != null) 
    {
        for(var i = 0; i < value.length; i++)
        {
            compname.splice(0, 0, value[i]['name']);
        }
        console.log("getComponents = ", compname.join());
        return compname;
    }
    console.log("getComponents = Null");
    return null;
}


//===========================================================================
// Get components of jira
// [param] jiraIssue : json object of jira
// [return] true or false
//===========================================================================
function checkGovDeployComponents(jiraIssue) {
    let compval = jiraIssue['fields']['components']
    console.log("checkGovDeployComponents");
    if(compval != null) 
    {
        for(var i = 0; i < compval.length; i++)
        {
            //console.log("********* Comp = ", compval);
            if(compval[i]['name'].includes("Deployment(manage)") == true || compval[i]['name'].includes("_Governing") == true) 
            {
                console.log("[true] Deployment(manage) or _Governing components = ", compval[i]['name']);
                return true;
            }
        }
    }
    console.log("[false] Governing or Deployment(manage) components = null");
    return false;
}


//===========================================================================
// Get Release Sprint of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getReleaseSprint(jiraIssue) {
    let value = jiraIssue['fields']['customfield_15926'];
    if(value != null) {
        console.log("getReleaseSprint = ", value);
        let retstr = value;
        return retstr;
    }
    console.log("getReleaseSprint = Null");
    return null;
}


//===========================================================================
// convert created date to datetime obect
// [param] createddate : created
// [return] datetime object
//===========================================================================
function conversionDateToDatetime(datedata) {
    // "2018-05-04"
    // "2018-05-04T14:03:49.000+0900"
    datedata = String(datedata);
    let result = datedata.split(' ');
    result = result[0]; // take yyyy-mm-dd area
    result = result.split('-');

    if(result.length >= 3) {
        let yyyy = result[0];
        let mm = result[1];
        let dd = result[2];
        dd = dd.split('T');
        dd = dd[0];
        return new Date(Number(yyyy), Number(mm), Number(dd));
    }
    else {
        return null;
    }
}


//===========================================================================
// convert duedate to Sprint
// [param] duedate : covdate
// [return] Sprint str
//===========================================================================
function conversionDuedateToSprint(covdate) {
    let targetDate = conversionDateToDatetime(covdate)
    if(targetDate != null)
    {
        for(var i = 0; i < HE_SP_Schedule.length; i++)
        {
            let start = conversionDateToDatetime(HE_SP_Schedule[i]['start']);
            let end = conversionDateToDatetime(HE_SP_Schedule[i]['end']);
            if(targetDate >= start && targetDate <= end)
            {
                //console.log("conversionDuedateToSprint = ", HE_SP_Schedule[i]['SPRINT_SHORT']);
                return HE_SP_Schedule[i]['SPRINT_SHORT'];
            }
        }
    }
    //console.log("conversionDuedateToSprint = SP_UNDEF");
    return "SP_UNDEF";
}



//===========================================================================
// convert Sprint to duedate
// [param] SPRINT : SPRINT
// [return] Sprint end date
//===========================================================================
function conversionSprintToDate(SPRINT) 
{
    for(var i = 0; i < HE_SP_Schedule.length; i++)
    {
        let start = conversionDateToDatetime(HE_SP_Schedule[i]['start']);
        let end = conversionDateToDatetime();
        if(HE_SP_Schedule[i]['SPRINT_SHORT'].includes(SPRINT))
        {
            return HE_SP_Schedule[i]['end'];
        }
    }
    //console.log("conversionSprintToDate = SP_UNDEF");
    return "SP_UNDEF";
}


//===========================================================================
// convert ReleaseSprint to ShortSprint
// [param] duedate : "2019_IR1SP01(3/XX~5/10)"
// [return] Sprint str
// refactoring 필요함... 귀찮아...
//===========================================================================
function conversionReleaseSprintToSprint(ReleaseSprint) 
{
    let bypass = false;
    let sprint = String(ReleaseSprint);
    let b = 0;
    let result = '';
    if(sprint == "SP_UNDEF") { return "SP_UNDEF"; }

    // webOS5.0 Sprint
    if(sprint.includes("2019_IR1"))
    {
        let a = sprint.replace('2019_IR1', '');
        a = a.split('(');
        result = "2019_" + a[0];
        return result;
    }
    if(sprint.includes("2019_IR2"))
    {
        let a = sprint.replace('2019_IR2', '');
        a = a.split('(');
        result = "2019_" + a[0];
        return result;
    }
    if(sprint.includes("2019_IR3"))
    {
        let a = sprint.replace('2019_IR3', '');
        a = a.split('(');
        result = "2019_" + a[0];
        return result;
    }

    // webOS5.5 Sprint
    if(sprint.includes("2020_IR1"))
    {
        let a = sprint.replace('2020_IR1', '');
        a = a.split('(');
        result = "2020_" + a[0];
        return result;
    }
    if(sprint.includes("2020_IR2"))
    {
        let a = sprint.replace('2020_IR2', '');
        a = a.split('(');
        result = "2020_" + a[0];
        return result;
    }
    if(sprint.includes("2020_IR3"))
    {
        let a = sprint.replace('2020_IR3', '');
        a = a.split('(');
        result = "2020_" + a[0];
        return result;
    }
    
    // webOS4.5 Sprint
    if(sprint.includes("GL2_"))
    {
        let a = sprint.replace("GL2_", '');
        a = a.split('_');
        b = a[0];
    }
    else if (sprint.includes("FC2_"))
    {
        b = sprint;
    }
    else if (sprint.includes("19Y_"))
    {
        b = sprint;
    }
    else 
    {
        bypass = true;
    }

    if(bypass == true) 
    {
        //console.log(sprint)
        return sprint;
    }
    else 
    {
        b = b.replace('IR1', '');
        b = b.replace('IR2', '');
        b = b.replace('IR3', '');
        b = b.replace('IR4', '');
        //console.log(b)
        b = b.split('(');
        //console.log(b[0])
        if(b[0].includes('TV') == true)
        {
            b = b[0].replace('TV', '');
            result = "2018_" + b;
        }
        else
        {
            result = "2019_" + b[0];
        }
        return result;
    }
}


//===========================================================================
// Get Status Summary of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getStatusSummary(jiraIssue) {
    let value = jiraIssue['fields']['customfield_15710'];
    if(value != null) {
        console.log("getStatusSummary = ", value)
        return value;
    }
    console.log("getStatusSummary = Null")
    return null;
}


//===========================================================================
// Get Status Color of jira
// [param] jiraIssue : json object of jira
// [return] str (RGB)
//===========================================================================
function getStatusColor(jiraIssue) {
    let statusColor = jiraIssue['fields']['customfield_15711'];
    if(statusColor != null) {
        console.log("getStatusColor = ", JSON.stringify(statusColor['value']))
        return statusColor['value'];
    }
    console.log("getStatusColor = Null");
    return null;
}


//===========================================================================
// Get SE_Delivery of jira
// [param] jiraIssue : json object of jira
// [return] str (RGB)
//===========================================================================
function getSE_Delivery(jiraIssue) {
    let delivery = jiraIssue['fields']['customfield_16988'];
    if(delivery != null) {
        console.log("getSE_Delivery = ", JSON.stringify(delivery['value']))
        return delivery['value'];
    }
    console.log("getSE_Delivery = Null")
    return null;
}


//===========================================================================
// Get SE_Quality of jira
// [param] jiraIssue : json object of jira
// [return] str (RGB)
//===========================================================================
function getSE_Quality(jiraIssue) {
    let quality = jiraIssue['fields']['customfield_16987'];
    if(quality != null) {
        console.log("getSE_Quality = ", JSON.stringify(quality['value']))
        return quality['value'];
    }

    console.log("getSE_Quality = Null");
    return null;
}

//===========================================================================
// Get D_Comment of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getD_Comment(jiraIssue) {
    let value = jiraIssue['fields']['customfield_16984'];
    console.log("getD_Comment = ", value);
    return value;
}


//===========================================================================
// Get Q_Comment of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getQ_Comment(jiraIssue) {
    let value = jiraIssue['fields']['customfield_16983'];
    console.log("getQ_Comment = ", value);
    return value;
}


//===========================================================================
// Get STE Member List of jira
// [param] jiraIssue : json object of jira
// [return] QE[]
//===========================================================================
function getSTEList(jiraIssue) {
    let value = jiraIssue['fields']['customfield_15228'];
    let stelist = [];
    if(value != null) 
    {
        for(var i = 0; i < value.length; i++)
        {
            stelist.splice(0, 0, value[i]['name']);
        }
        console.log("getSTEList[] = ", stelist.join());
        return stelist;
    }
    console.log("getSTEList[] = null");
    return null;
}


//===========================================================================
// Get STE manage item or Not..
// [param] jiraIssue : json object of jira
// [return] true or false
//===========================================================================
function getSTESDET_Support(jiraIssue) {
    if(getSTEList(jiraIssue) != null) { return true; }
    return false;
}


//===========================================================================
// Get Initiative Order of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getInitiativeOrder(jiraIssue) {
    let value = jiraIssue['fields']['customfield_16986'];
    console.log("getInitiativeOrder = ", value)
    return value;
}


//===========================================================================
// Get Initiative Score of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getInitiativeScore(jiraIssue) {
    let value = jiraIssue['fields']['customfield_16985'];
    console.log("getInitiativeScore = ", value)
    return value;
}

//===========================================================================
// Get Created Date of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getCreatedDate(jiraIssue) {
    let value = jiraIssue['fields']['created'];
    console.log("getCreatedDate = ", value);
    return value;
}


//===========================================================================
// Get Updated Date of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getUpdatedDate(jiraIssue) {
    let value = jiraIssue['fields']['updated'];
    console.log("Updated Date = ", value);
    return value;
}


//===========================================================================
// Get Due Date of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getDueDate(jiraIssue) {
    let value = jiraIssue['fields']['duedate'];
    console.log("getDueDate = ", value)
    return value;
}

//===========================================================================
// Get Resolution Date List of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getResolutionDate(jiraIssue) {
    let value = jiraIssue['fields']['resolutiondate'];
    console.log("getResolutionDate = ", value)
    return value;
}


//===========================================================================
// Get Created Date List of jira
// [param] jiraIssue : json object of jira
// [return] labels []
//===========================================================================
function getLabels(jiraIssue) {
    let value = jiraIssue['fields']['labels'];
    if(value != null) 
    {
        console.log("getLabels = ", value)
        return value;
    }
    return [];
}


//===========================================================================
// Get Description List of jira
// [param] jiraIssue : json object of jira
// [return] labels [ 'a', 'b', .... ]
//===========================================================================
function getDescription(jiraIssue) {
    let value = jiraIssue['fields']['description'];
    console.log("getDescription = ", value);
    return value;
}

//===========================================================================
// Get fixVersions of jira
// [param] jiraIssue : json object of jira
// [return] fixVersions [ ]
//===========================================================================
function getFixVersions(jiraIssue) {
    let value = jiraIssue['fields']['fixVersions'];
    let fixversions = [];
    if(value != null) 
    {
        for(var i = 0; i < value.length; i++)
        {
            fixversions.splice(0, 0, value[i]['name']);
        }
        console.log("getFixVersions[] = ", fixversions.join());
        return fixversions;
    }
    console.log("getFixVersions[] = null");
    return null;
}


//===========================================================================
// Get Scope of Change of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getScopeOfChange(jiraIssue) {
    let value = jiraIssue['fields']['customfield_15104'];
    if(value != null) {
        console.log("getScopeOfChange = ", value['value'])
        return value['value'];
    }
    console.log("getScopeOfChange = null");
    return null;
}


//===========================================================================
// Get Issue Links of jira
// [param] jiraIssue : json object of jira
// [return] issuelinks[ {}, .... ]
//===========================================================================
function getIssueLinks(jiraIssue) {
    let value = jiraIssue['fields']['issuelinks'];
    console.log("getIssueLinks = ", value);
    return value;
}

//===========================================================================
// Get Reporter of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getReporter(jiraIssue) {
    let value = jiraIssue['fields']['reporter']['name'];
    console.log("getReporter = ", value)
    return value;
}


//===========================================================================
// Get Assignee of jira
// [param] jiraIssue : json object of jira
// [return] str
//===========================================================================
function getAssignee(jiraIssue) {
    let value = "Unassigned";
    if(jiraIssue['fields']['assignee'] != null) {
        value = jiraIssue['fields']['assignee']['name'];
        // MongoDB doesn't support keys with a dot in them so you're going to have to preprocess your JSON file to remove/replace them before importing it
        // or value = value.replace('.', "\\u002e");
        value = value.replace('.', '-');
        value = value.replace('.', '-');
        console.log("getAssignee = ", value);
        return value;
    }
    console.log("getAssignee = ", value);
    return value;
}


//===========================================================================
// Get Reporter of jira
// [param] jiraIssue : json object of jira
// [return] Watchers [ ] <== [ { 'name' { ''}, { 'emailAddress' { '' }, .... ]
//===========================================================================
function getWatchers(jiraIssue) {
    let watchers = jiraIssue['fields']['customfield_10105'];
    let results = [];
    if(watchers != null)
    {
        for(var i = 0; i < watchers.length; i++)
        {
            results.splice(0, 0, watchers[i]['name']);
        }
        console.log("getWatchers List = ", results.join());
        return results;
    }
    console.log("getWatchers List = null");
    return null;
}


//===========================================================================
// Check labels
// [param] dissue : jira issue
// [return] True (label is exist) or False (label is not exisit)
//===========================================================================
function checkLabels(jiraIssue, labelname) {
    let labels = getLabels(jiraIssue);
    if(labels.includes(labelname) == true)
    {
        console.log("checkLabels = " + labelname + "--> TRUE");
        return true;
    }
    console.log("checkLabels = " + labelname + "--> FALSE");
    return false;
}



//===========================================================================
// Check Initiative base on RMS
// [param] dissue : jira issue
// [return] true or false
//===========================================================================
function checkRMSInitiative(jiraIssue) {
    let labels = getLabels(jiraIssue);
    if(labels.includes('RMS요구사항') == true)
    {
        console.log("checkLabels = RMS요구사항 --> TRUE");
        return true;
    }
    let summary = getSummary(jiraIssue);
    if(summary.includes('RMS') == true)
    {
        console.log("summary includes RMS :..--> TRUE");
        return true;
    }
    console.log("checkRMSInitiative = --> FALSE");
    return false;
}



//===========================================================================
// Get Exeinfo ID of zephyr
// [param] jiraIssue : json object of jira
// [return] str (ID)
//===========================================================================
function getZephyrExeinfo_ID(ZephyrIssue) {
    if(ZephyrIssue['id'] != null) 
    {
        return ZephyrIssue['id'];
    }
    return null;    
}


//===========================================================================
// Get Exeinfo Status of zephyr
// [param] jiraIssue : json object of jira
// [return] str (Status) - “-1” UNEXECUTED, “1” PASS, “2” FAIL, “3” WIP, “4” BLOCKED”
// UNEXECUTED: The test has not yet been executed.
// PASS: Test was executed and passed successfully.
// FAIL: Test was executed and failed.
// WIP: Test execution is a work – in – progress.
// BLOCKED: The test execution of this test was blocked for some reason.
//===========================================================================
function getZephyrExeinfo_Status(ZephyrIssue) {
    if(ZephyrIssue['executionStatus'] != null) 
    {
        return ZephyrIssue['executionStatus'];
    }
    return null;
}

//===========================================================================
// Get Exeinfo executedOn of zephyr
// [param] jiraIssue : json object of jira
// [return] str (executedOn - Date Info)
//===========================================================================
function getZephyrExeinfo_Date(ZephyrIssue) {
    if(ZephyrIssue['executedOn'] != null) 
    {
        return ZephyrIssue['executedOn'];
    }
    return null;
}


//===========================================================================
// Get Exeinfo executionBy of zephyr
// [param] jiraIssue : json object of jira
// [return] str (executionBy)
//===========================================================================
function getZephyrExeinfo_Tester(ZephyrIssue) {
    if(ZephyrIssue['executedBy'] != null) 
    {
        let result = ZephyrIssue['executedBy'];
        // MongoDB doesn't support keys with a dot in them so you're going to have to preprocess your JSON file to remove/replace them before importing it
        // or result = result.replace('.', "\\u002e");
        result = result.replace('.', '-');
        result = result.replace('.', '-');
        return result;
    }
    return null;
}


//===========================================================================
// Get Exeinfo cycle ID of zephyr
// [param] jiraIssue : json object of jira
// [return] str (cycle ID)
//===========================================================================
function getZephyrExeinfo_cycleId(ZephyrIssue) {
    if(ZephyrIssue['cycleId'] != null) 
    {
        return ZephyrIssue['cycleId'];
    }
    return null;
}


//===========================================================================
// Get Exeinfo cycle Name of zephyr
// [param] jiraIssue : json object of jira
// [return] str (cycle Name)
//===========================================================================
function getZephyrExeinfo_cycleName(ZephyrIssue) {
    if(ZephyrIssue['cycleName'] != null) 
    {
        return ZephyrIssue['cycleName'];
    }    
    return null;
}


//===========================================================================
// checkAbnormalSP : compare init vs epic/story Release SP
// [param] initiative Release SP, initiative Status, Current (epic/story) Release SP, Current (epic/story) Status
// [return] init >= epicstory (false) else true
//===========================================================================
function checkAbnormalSP(Initiative_SP, Initiative_Status, CurIssue_SP, CurIssue_Status)
{
    var CurIssue_SP = conversionReleaseSprintToSprint(CurIssue_SP);
    var Initiative_SP = conversionReleaseSprintToSprint(Initiative_SP);
    var Parent_Index = 0, Child_Index = 0;

    // abnormal case 1 : Parent / child duedate is Null. Can't estimate schedule. 
    if(Initiative_SP == "SP_UNDEF" || CurIssue_SP == "SP_UNDEF") 
    { 
        console.log("[abnormal case 1] Initiative_SP = ", Initiative_SP, " CurIssue_SP = ", CurIssue_SP);
        if(checkIsDelivered(CurIssue_Status) == true) { return false } else { return true; } 
    }

    // abnormal case 2 : parent is delivered but childs(current) is not delivered. 
    if(checkIsDelivered(Initiative_Status) == true && checkIsDelivered(CurIssue_Status) == false) 
    {
        console.log("[abnormal case 2] = ", checkIsDelivered(Initiative_Status), checkIsDelivered(CurIssue_Status));
        return true; 
    }

    for(var i = 0; i < HE_SP_Schedule.length; i++)
    {
        if(HE_SP_Schedule[i]['SPRINT_SHORT'] == Initiative_SP) { Parent_Index = i; }
        if(HE_SP_Schedule[i]['SPRINT_SHORT'] == CurIssue_SP) { Child_Index = i; }
    }

    // abnormal case 3 : child duedate is greater than parent duedate. 
    if(Parent_Index >= Child_Index) { return false; } 
    else 
    {
        console.log("[abnormal case 3] = ", Parent_Index, Child_Index);
        if(checkIsDelivered(CurIssue_Status) == true) { return false } else { return true; } 
    }
}



//===========================================================================
// checkIsDelivered : check developing or not (resolved, closed, deferred, withdrawn)
// [param] Status
// [return] under development (false), delivered (resolved/closed/resolved/withdrawn) : true
//===========================================================================
function checkIsDelivered(Status)
{
    if(Status == 'Resolved' || Status == 'Closed' || Status == 'Delivered' || Status == 'Deferred' 
        || Status == "Withdrwan" || Status == 'Verify')
    { 
        return true; 
    }
    return false;  
}


//===========================================================================
// checkIsDelayed : check delayed or not
// [param] duedate
// [return] delayed or due date is null : true, not delayed : false
//===========================================================================
function checkIsDelayed(DueDate)
{
    if(DueDate != null)
    {
        var duedate = new Date(DueDate);
        var today = new Date();
        if(duedate < today) { return true; }
    }
    return false; 
}


//===========================================================================
// parseWorkflow : make the history of workflow from changelog
// [param] changelog, workflow
// [return] workflow
//===========================================================================
function parseWorkflow(changelog, workflow)
{
    console.log("parseWorkflow function")
    if(workflow != null && changelog != null)
    {
        let log = changelog['histories'];
        let today = moment().locale('ko');
        today = moment(today).add(9, 'Hour');
        let createddate = workflow['CreatedDate'].split('+');
        let created = moment(createddate[0]).add(9, 'Hour');
        let start = 0;
        let end = 0;
        let period = 0;
        for(let i = 0; i < changelog.total; i++)
        {
            for(let j = 0; j < log[i]['items'].length; j++)
            {
                let item = log[i]['items'][j];
                if(item['field'] == 'status') // Status - Workflow
                {
                    let item_created = log[i]['created'];
                    item_created = item_created.split('+');
                    if(start == 0) { start = created; } else { start = end; }
                    end = moment(item_created[0]).add(9, 'Hour');
                    period = (end - start) / (1000*60*60*24);
     
                    let from = item['fromString'];
                    let to = item['toString'];
                    console.log("From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);

                    // normal flow
                    if(from == 'DRAFTING' && to == "PO REVIEW") 
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['DRAFTING']['Duration'] += period; 
                        workflow['DRAFTING']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }
                    
                    if(from == 'PO REVIEW' && to == "ELT REVIEW")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['PO REVIEW']['Duration'] += period; 
                        workflow['PO REVIEW']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(from == 'ELT REVIEW' && to == "Approved")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['ELT REVIEW']['Duration'] += period; 
                        workflow['ELT REVIEW']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(from == 'Approved' && to == "BACKLOG REFINEMENT")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['Approved']['Duration'] += period; 
                        workflow['Approved']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(from == 'BACKLOG REFINEMENT' && to == "READY")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['BACKLOG REFINEMENT']['Duration'] += period; 
                        workflow['BACKLOG REFINEMENT']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(from == 'READY' && to == "In Progress")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['READY']['Duration'] += period; 
                        workflow['READY']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(from == 'In Progress' && to == "Delivered")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['In Progress']['Duration'] += period; 
                        workflow['In Progress']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        // need to check...
                        //workflow['Delivered']['Duration'] = (today - end) / (1000*60*60*24); 
                        //workflow['Delivered']['History'].push({ "startdate" : end, "enddate" : today, "peroid" : period });
                    }

                    // EXCEPTIONAL CASE
                    if(from == 'Deferred' && to == "In Progress")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['Deferred']['Duration'] += period; 
                        workflow['Deferred']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(from == 'PO REVIEW' && to == "DRAFTING")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['PO REVIEW']['Duration'] += period; 
                        workflow['PO REVIEW']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(from == 'ELT REVIEW' && to == "PO REVIEW")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['ELT REVIEW']['Duration'] += period; 
                        workflow['ELT REVIEW']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(from == 'Delivered' && to == "In Progress")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                    if(from == 'Delivered' && to == "In Progress")
                        workflow['Delivered']['Duration'] += period; 
                        workflow['Delivered']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(to == "Closed")
                    { 
                        if(from == "DRAFTING")
                        {
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['DRAFTING']['Duration'] += period; 
                            workflow['DRAFTING']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }
                        if(from == "PO REVIEW")
                        {
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['PO REVIEW']['Duration'] += period; 
                            workflow['PO REVIEW']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }
                        if(from == "ELT REVIEW")
                        {
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['ELT REVIEW']['Duration'] += period; 
                            workflow['ELT REVIEW']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }
                        if(from == "In Progress")
                        {
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['In Progress']['Duration'] += period; 
                            workflow['In Progress']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }
                    }

                    if(from == 'Closed' && to == "DRAFTING")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['Closed']['Duration'] += period; 
                        workflow['Closed']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(to == "PROPOSED TO DEFER")
                    { 
                        if(from == "Approved")
                        {
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['Approved']['Duration'] += period; 
                            workflow['Approved']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }
                        if(from == "BACKLOG REFINEMENT")
                        {
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['BACKLOG REFINEMENT']['Duration'] += period; 
                            workflow['BACKLOG REFINEMENT']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }
                        if(from == "READY")
                        {
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['READY']['Duration'] += period; 
                            workflow['READY']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }
                        if(from == "In Progress")
                        {
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['In Progress']['Duration'] += period; 
                            workflow['In Progress']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }
                    }

                    if(from == 'PROPOSED TO DEFER' && to == "Deferred")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['PROPOSED TO DEFER']['Duration'] += period; 
                        workflow['PROPOSED TO DEFER']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }
                }
            }
        }

        let cur_status = workflow['Status'];
        if(cur_status == "DRAFTING") { end = created; }
        workflow[cur_status]['Duration'] = (today - end) / (1000*60*60*24); 
        workflow[cur_status]['History'].push({ "startdate" : end, "enddate" : today, "peroid" : workflow[cur_status]['Duration'] });

        return workflow;
    }
    console.log("[Exception] : parseWorkflow")
    return null;
}


//===========================================================================
// parseWorkflow : make the history of workflow from changelog
// [param] changelog, workflow
// [return] workflow
//===========================================================================
function parseWorkflow2(changelog, workflow)
{
    return new Promise(function (resolve, reject){
        console.log("parseWorkflow function")
        if(workflow != null && changelog != null)
        {
            let log = changelog['histories'];
            let today = moment().locale('ko');
            today = moment(today).add(9, 'Hour');
            let createddate = workflow['CreatedDate'].split('+');
            let created = moment(createddate[0]).add(9, 'Hour');
            let start = 0;
            let end = 0;
            let period = 0;
            for(let i = 0; i < changelog.total; i++)
            {
                for(let j = 0; j < log[i]['items'].length; j++)
                {
                    let item = log[i]['items'][j];
                    if(item['field'] == 'status') // Status - Workflow
                    {
                        let item_created = log[i]['created'];
                        item_created = item_created.split('+');
                        if(start == 0) { start = created; } else { start = end; }
                        end = moment(item_created[0]).add(9, 'Hour');
                        period = (end - start) / (1000*60*60*24);
        
                        let from = item['fromString'];
                        let to = item['toString'];
                        console.log("From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);

                        // normal flow
                        if(from == 'DRAFTING' && to == "PO REVIEW") 
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['DRAFTING']['Duration'] += period; 
                            workflow['DRAFTING']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }
                        
                        if(from == 'PO REVIEW' && to == "ELT REVIEW")
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['PO REVIEW']['Duration'] += period; 
                            workflow['PO REVIEW']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }

                        if(from == 'ELT REVIEW' && to == "Approved")
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['ELT REVIEW']['Duration'] += period; 
                            workflow['ELT REVIEW']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }

                        if(from == 'Approved' && to == "BACKLOG REFINEMENT")
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['Approved']['Duration'] += period; 
                            workflow['Approved']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }

                        if(from == 'BACKLOG REFINEMENT' && to == "READY")
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['BACKLOG REFINEMENT']['Duration'] += period; 
                            workflow['BACKLOG REFINEMENT']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }

                        if(from == 'READY' && to == "In Progress")
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['READY']['Duration'] += period; 
                            workflow['READY']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }

                        if(from == 'In Progress' && to == "Delivered")
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['In Progress']['Duration'] += period; 
                            workflow['In Progress']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                            // need to check...
                            //workflow['Delivered']['Duration'] = (today - end) / (1000*60*60*24); 
                            //workflow['Delivered']['History'].push({ "startdate" : end, "enddate" : today, "peroid" : period });
                        }

                        // EXCEPTIONAL CASE
                        if(from == 'Deferred' && to == "In Progress")
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['Deferred']['Duration'] += period; 
                            workflow['Deferred']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }

                        if(from == 'PO REVIEW' && to == "DRAFTING")
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['PO REVIEW']['Duration'] += period; 
                            workflow['PO REVIEW']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }

                        if(from == 'ELT REVIEW' && to == "PO REVIEW")
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['ELT REVIEW']['Duration'] += period; 
                            workflow['ELT REVIEW']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }

                        if(from == 'Delivered' && to == "In Progress")
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        if(from == 'Delivered' && to == "In Progress")
                            workflow['Delivered']['Duration'] += period; 
                            workflow['Delivered']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }

                        if(to == "Closed")
                        { 
                            if(from == "DRAFTING")
                            {
                                //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                                workflow['DRAFTING']['Duration'] += period; 
                                workflow['DRAFTING']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                            }
                            if(from == "PO REVIEW")
                            {
                                //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                                workflow['PO REVIEW']['Duration'] += period; 
                                workflow['PO REVIEW']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                            }
                            if(from == "ELT REVIEW")
                            {
                                //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                                workflow['ELT REVIEW']['Duration'] += period; 
                                workflow['ELT REVIEW']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                            }
                            if(from == "In Progress")
                            {
                                //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                                workflow['In Progress']['Duration'] += period; 
                                workflow['In Progress']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                            }
                        }

                        if(from == 'Closed' && to == "DRAFTING")
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['Closed']['Duration'] += period; 
                            workflow['Closed']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }

                        if(to == "PROPOSED TO DEFER")
                        { 
                            if(from == "Approved")
                            {
                                //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                                workflow['Approved']['Duration'] += period; 
                                workflow['Approved']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                            }
                            if(from == "BACKLOG REFINEMENT")
                            {
                                //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                                workflow['BACKLOG REFINEMENT']['Duration'] += period; 
                                workflow['BACKLOG REFINEMENT']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                            }
                            if(from == "READY")
                            {
                                //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                                workflow['READY']['Duration'] += period; 
                                workflow['READY']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                            }
                            if(from == "In Progress")
                            {
                                //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                                workflow['In Progress']['Duration'] += period; 
                                workflow['In Progress']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                            }
                        }

                        if(from == 'PROPOSED TO DEFER' && to == "Deferred")
                        { 
                            //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                            workflow['PROPOSED TO DEFER']['Duration'] += period; 
                            workflow['PROPOSED TO DEFER']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                        }
                    }
                }
            }

            let cur_status = workflow['Status'];
            workflow[cur_status]['Duration'] = (today - end) / (1000*60*60*24); 
            workflow[cur_status]['History'].push({ "startdate" : end, "enddate" : today, "peroid" : workflow[cur_status]['Duration'] });

            resolve(workflow);
        }
        console.log("[Exception] : parseWorkflow")
        reject(null);
    });
}


//===========================================================================
// parseArchiEpicWorkflow : make the history of workflow from changelog
// [param] changelog, workflow
// [return] workflow
//===========================================================================
function parseArchEpicWorkflow(changelog, workflow)
{
    //console.log("parseArchEpicWorkflow function ", changelog, workflow)
    if(workflow != null && changelog != null)
    {
        let log = changelog['histories'];
        let today = moment().locale('ko');
        today = moment(today).add(9, 'Hour');
        let createddate = workflow['CreatedDate'].split('+');
        let created = moment(createddate[0]).add(9, 'Hour');
        let start = 0;
        let end = 0;
        let period = 0;
        for(let i = 0; i < changelog.total; i++)
        {
            for(let j = 0; j < log[i]['items'].length; j++)
            {
                let item = log[i]['items'][j];
                if(item['field'] == 'status') // Status - Workflow
                {
                    let item_created = log[i]['created'];
                    item_created = item_created.split('+');
                    if(start == 0) { start = created; } else { start = end; }
                    end = moment(item_created[0]).add(9, 'Hour');
                    period = (end - start) / (1000*60*60*24);
     
                    let from = item['fromString'];
                    let to = item['toString'];
                    console.log("From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);

                    // normal flow
                    if(from == 'Scoping' && to == "Review") 
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['Scoping']['Duration'] += period; 
                        workflow['Scoping']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }
                    
                    if(from == 'Review' && to == "In Progress")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['Review']['Duration'] += period; 
                        workflow['Review']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(from == 'In Progress' && to == "Delivered")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['In Progress']['Duration'] += period; 
                        workflow['In Progress']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(from == 'Delivered' && to == "Closed")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['Delivered']['Duration'] += period; 
                        workflow['Delivered']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    // EXCEPTIONAL CASE
                }
            }
        }

        let cur_status = workflow['Status'];
        if(end == 0) { end = created; }
        workflow[cur_status]['Duration'] = (today - end) / (1000*60*60*24); 
        workflow[cur_status]['History'].push({ "startdate" : end, "enddate" : today, "peroid" : workflow[cur_status]['Duration'] });

        return workflow;
    }
    console.log("[Exception] : parseArchEpicWorkflow")
    return null;
}



//===========================================================================
// parseArchiStoryWorkflow : make the history of workflow from changelog
// [param] changelog, workflow
// [return] workflow
//===========================================================================
function parseArchStoryWorkflow(changelog, workflow)
{
    //console.log("parseArchStoryWorkflow function")
    if(workflow != null && changelog != null)
    {
        let log = changelog['histories'];
        let today = moment().locale('ko');
        today = moment(today).add(9, 'Hour');
        let createddate = workflow['CreatedDate'].split('+');
        let created = moment(createddate[0]).add(9, 'Hour');
        let start = 0;
        let end = 0;
        let period = 0;
        for(let i = 0; i < changelog.total; i++)
        {
            for(let j = 0; j < log[i]['items'].length; j++)
            {
                let item = log[i]['items'][j];
                if(item['field'] == 'status') // Status - Workflow
                {
                    let item_created = log[i]['created'];
                    item_created = item_created.split('+');
                    if(start == 0) { start = created; } else { start = end; }
                    end = moment(item_created[0]).add(9, 'Hour');
                    period = (end - start) / (1000*60*60*24);
     
                    let from = item['fromString'];
                    let to = item['toString'];
                    console.log("From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);

                    // normal flow
                    if(from == 'Screen' && to == "Analysis") 
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['Screen']['Duration'] += period; 
                        workflow['Screen']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }
                    
                    if(from == 'Analysis' && to == "Verify")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['Analysis']['Duration'] += period; 
                        workflow['Analysis']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    if(from == 'Verify' && to == "Closed")
                    { 
                        //console.log("[Log]From : ", from, " ==> To : ", to, " period = ", period, "Start = ", start, " End = ", end);
                        workflow['Verify']['Duration'] += period; 
                        workflow['Verify']['History'].push({ "startdate" : start, "enddate" : end, "peroid" : period });
                    }

                    // EXCEPTIONAL CASE
                }
            }
        }

        let cur_status = workflow['Status'];
        if(end == 0) { end = created; }
        workflow[cur_status]['Duration'] = (today - end) / (1000*60*60*24); 
        workflow[cur_status]['History'].push({ "startdate" : end, "enddate" : today, "peroid" : workflow[cur_status]['Duration'] });

        return workflow;
    }
    console.log("[Exception] : parseArchStoryWorkflow")
    return null;
}


//===========================================================================
// parseReleaseSprint : make the history of Release Sprint from changelog
// [param] changelog, releaseSP
// [return] releaseSP
//===========================================================================
function parseReleaseSprint(changelog, releaseSP)
{
    console.log("parseReleaseSprint function")
    if(releaseSP != null && changelog != null)
    {
        let log = changelog['histories'];
        let today = moment().locale('ko');
        today = moment(today).add(9, 'Hour');
        for(let i = 0; i < changelog.total; i++)
        {
            for(let j = 0; j < log[i]['items'].length; j++)
            {
                let item = log[i]['items'][j];
                if(item['field'] == 'Release Sprint') // Status - Release Sprint
                {
                    let item_created = log[i]['created'];
                    item_created = item_created.split('+');
                    item_created = moment(item_created[0]).add(9, 'Hour');                    
        
                    let from = item['fromString'];
                    let to = item['toString'];
                    console.log("[Release SP] Changed Date : ", item_created, "From : ", from, " ==> To : ", to);

                    // find first original 
                    if(from != null || to != null) 
                    { 
                        to = conversionReleaseSprintToSprint(to);
                        releaseSP['RescheduleCnt']++; 
                        if(releaseSP['RescheduleCnt'] == 1)
                        {
                            releaseSP['OrgRelease_SP'] = to; 
                        }
                        let sp = item_created.format("YYYY-MM-DDTHH:MM:SS");
                        sp = sp.split("T");
                        sp = sp[0];
                        releaseSP['History'].push({ 'ChangeSP' : conversionDuedateToSprint(sp), 'ChangeDate' : sp, "ReleaseSP" : to });
                        console.log("[Logged][Release SP] Changed SP : ", conversionDuedateToSprint(sp), " Changed Date : ", sp, "ReleaseSP : ", to);
                    }
                }
            }
        }
        return releaseSP;
    }
    console.log("[Exception] : parseWorkflow")
    return null;
}


//===========================================================================
// parseStatusSummary : check statsummary contents from changelog
// [param] changelog, status
// [return] the last of status summary contents from changelog [created date, count, contents]
//===========================================================================
function parseStatusSummary(changelog, status)
{
    console.log("parseStatusSummary function")
    if(changelog != null)
    {
        let isfound = false;
        let from = 0, to = "None";
        let item_created = null;
        let log = changelog['histories'];
        let today = moment().locale('ko');
        today = moment(today).add(9, 'Hour');
        for(let i = 0; i < changelog.total; i++)
        {
            for(let j = 0; j < log[i]['items'].length; j++)
            {
                let item = log[i]['items'][j];
                if(item['field'] == 'Status Summary') // Status Summary
                {
                    isfound = true;
                    item_created = log[i]['created'];
                    item_created = item_created.split('+');
                    //item_created = moment(item_created[0]).add(9, 'Hour');                    
        
                    from = item['fromString'];
                    to = item['toString'];
                    //console.log("[Status Summary] Changed Date : ", item_created, "From : ", from, " ==> To : ", to);
                }
            }
        }
        if(isfound)
        {
            to = "[" + String(item_created[0]) + "]\n" + to;
            let count = 0;
            let update_elapsed = 0;
            update_elapsed = getElapsedDays(item_created[0], today);
            count = (update_elapsed / 7); 
            if(checkIsDelivered(status) == true) { count = 0; }
            console.log("[Status Summary] Changed Date : ", item_created, "누락회수 = ", count, " Status Summary : ", to);
            let result = { 'UpdateDate' : item_created[0], 'count' : count, 'Description' : to };
            return result;
        }
    }
    console.log("[Exception] : parseStatusSummary")
    return { 'UpdateDate' : 'None', 'count' : 'None', 'Description' : "None" };
}



//===========================================================================
// getPersonalInfo : get Personal Info (Name, Position, Department, email)
// [param] Key, LDAP-displayName
// [return] [Name, Position, Department, email]
//===========================================================================
function getPersonalInfo(displayName, dpcode)
{
    //return new Promise(function (resolve, reject){
        let parse = displayName.split('/');
        let name = "----";
        let position = "----";
        let temp = 0; 
        let department = "----";
        let email = "----";

        switch(parse.length)
        {
            case 0: 
                break;
            case 1:
                name = parse[0];
                break;
            case 2: 
                name = parse[0];
                position = "----";
                temp = parse[1].replace(')', '');
                temp = temp.split('(');
                department = temp[0];
                departmemt = department.replace('.', '-'); // if key has a value of CS-2. case... mongodb insert error need to verify....
                email = temp[1];
                break;
            case 3:
                name = parse[0];
                position = parse[1];
                temp = parse[2].replace(')', '');
                temp = temp.split('(');
                department = temp[0];
                email = temp[1];
                break;
        }
        console.log("name = ", name, " position = ", position, " department = ", department, " email = ", email, " DepartmentCode = ", dpcode);
        return ([ name, position, department, email, dpcode ]);
        //resolve([ name, position, department, email, dpcode ]);
    //});
}


//===========================================================================
// getRemainDays : check remain days base on specific date
// [param] targetdate, base date (string format : "2018-04-03" or "2018-04-14T19:00:00")
// [return] delayed or due date is null : true, not delayed : false
//===========================================================================
function getRemainDays(targetdate, basedate)
{
    let diff = 0;
    if(targetdate == "SP_UNDEF") 
    { 
        console.log("[Target] = ", targetdate, " [Base] = ", basedate, " [Remain Days] = ", diff);
        return diff; 
    }
    let target = moment(targetdate).add(9, 'Hour');
    let base = moment(basedate).add(9, 'Hour');
    diff = (target - base) / (1000*60*60*24); 
    console.log("getRemainDays : [Target] = ", target, " [Base] = ", base, " [Remain Days] = ", diff);
    return diff;
}


//===========================================================================
// getElapsedDays : get elapsed days
// [param] start(moment), end (moment)
// [return] diff = end - start
//===========================================================================
function getElapsedDays(start, end)
{
    let diff = 0;
    if(end == 'SP_UNDEF')
    { 
        console.log("getElapsedDays : [start] = ", start, " [end] = ", end, " [Elapsed Days] = ", diff);
        return diff; 
    }

    start = moment(start);
    end = moment(end);
    diff = (end - start)/(1000*60*60*24);
    console.log("getElapsedDays : [Start] = ", start, " [End] = ", end, " [Elapsed Days] = ", diff);
    return diff;
}


module.exports = { 
    // var
    HE_SP_Schedule,
    // function
    getKey,
    getSummary,
    getStatus,
    getIssuetype,
    getResolution,
    getComponents,
    checkGovDeployComponents,
    getReleaseSprint,
    conversionDateToDatetime,
    conversionDuedateToSprint,
    conversionSprintToDate,
    conversionReleaseSprintToSprint,
    getStatusSummary,
    getStatusColor,
    getSE_Delivery,
    getSE_Quality,
    getD_Comment,
    getQ_Comment,
    getSTEList,
    getSTESDET_Support,
    getInitiativeOrder,
    getInitiativeScore,
    getCreatedDate,
    getUpdatedDate,
    getDueDate,
    getResolutionDate,
    getLabels,
    getDescription,
    getFixVersions,
    getScopeOfChange,
    getIssueLinks,
    getReporter,
    getAssignee,
    getWatchers,
    checkLabels,
    checkRMSInitiative,
    getZephyrExeinfo_ID,
    getZephyrExeinfo_Status,
    getZephyrExeinfo_Date,
    getZephyrExeinfo_Tester,
    getZephyrExeinfo_cycleId,
    getZephyrExeinfo_cycleName,
    checkAbnormalSP,
    checkIsDelivered,
    checkIsDelayed,
    parseWorkflow,
    parseReleaseSprint,
    parseStatusSummary,
    getElapsedDays,
    getRemainDays,
    getPersonalInfo,
    parseWorkflow2, // test....
    parseArchEpicWorkflow,
    parseArchStoryWorkflow,
   };
  
  