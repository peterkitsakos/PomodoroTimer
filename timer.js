let running = false;
let interval = null;

let focusTime = 20; //Focus duration
let breakTime = 5; //Short Break duration
let longBreakTime = 15;
let longBreakSessions = 3; //Number of sessions between long breaks

//Variables used for timer values (timerMin:timerSec)
let targetTime = 0;
let timerMin = focusTime;
let timerSec = 0;

let sessionNumber = 0; //Number of focuses since last long break
let justFocused = true;

const alarmSound = new Audio('./sounds/alarm.mp3');

window.onload = document.getElementById('timer').innerHTML = `${focusTime}:00`;

document.getElementById('start_button').addEventListener('click', () => {

	console.log(`Start button says: ${timerMin}`);
	changeButtonLabel();

	if(running == false){
		running = true;
		let timer = document.getElementById('timer');
		//console.log("loaded");
		
		if(targetTime == 0){
			targetTime = Date.now() + (timerMin * 60000) + (timerSec * 1000);
		}

		//console.log(`Target Time: ${targetTime}`);
		interval = setInterval(runTimer, 100);
	}else{
		running = false;
		clearInterval(interval);
	}
});

runTimer = () => {
	//console.log(targetTime);
	remaining = targetTime - Date.now()
	if(remaining < 0){
		alarmSound.play(); //Play alarm sound

		//Stop the timer
		clearInterval(interval);
		changeButtonLabel();
		running = false;

		//Set Timer to correct values
		timerMin = setTimer();
		timerSec = 0;
		targetTime = 0;
	}else{
		timerMin = Math.floor(remaining / 60000);
		timerSec = Math.floor((remaining / 1000) % 60)
	}

		timer.innerHTML = (timerSec < 10) ? `${timerMin}:0${timerSec}` : `${timerMin}:${timerSec}`;
}

changeButtonLabel = () => {
	let button = document.getElementById('start_button');
	button.innerHTML = (button.innerHTML == "Start") ? "Stop" : "Start";
}

setTimer = () => {
	//If we just finished focus
	if(justFocused == true){
		sessionNumber++;
		justFocused = false;
		
		//If completed longBreakSessions, time for long break
		if(sessionNumber == longBreakSessions){
			sessionNumber = 0;
			return longBreakTime;
		}

		return breakTime;
	}

	//justFocused will be true after time runs out
	justFocused = true;
	return focusTime;
}

document.getElementById('skip_button').addEventListener('click', () => {
	if(running == true){
		running = false;
		changeButtonLabel();
		clearInterval(interval);
		timerMin = setTimer();
		timerSec = 0;
		targetTime = 0;
		timer.innerHTML = `${timerMin}:00`;
	}
});