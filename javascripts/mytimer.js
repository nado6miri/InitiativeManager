
/*
function updateInitiativeStatus(arg)
{
  console.log('arg --> ', arg);
}

function updateInitiativeStatus1()
{
  console.log('arg --> ');
}


setTimeout(updateInitiativeStatus, 2000, 'nsb');
Timer_Setting(12, 05, 00, updateInitiativeStatus, 'cccc bbbb');
Timer_Setting(12, 06, 00, updateInitiativeStatus1);
*/

function Timer_Setting(hour, min, sec, callback, arg)
{
		var x = {
					hours: hour,
					minutes: min,
					seconds: sec
				};

		var dtAlarm = new Date();
		dtAlarm.setHours(x.hours);
		dtAlarm.setMinutes(x.minutes);
    dtAlarm.setSeconds(x.seconds);
    
		var dtNow = new Date();
    var diff = dtAlarm - dtNow;

		if (diff > 0) {
			console.log("[today] callback will be called after ", diff);
		}
		else {
			dtAlarm.setDate(dtAlarm.getDate() + 1);
      diff = dtAlarm - dtNow;
			console.log("[Next day] callback will be called after ", diff);
		}

    console.log(diff);
		setTimeout(callback, diff, arg);
}


module.exports = { Timer_Setting, };
