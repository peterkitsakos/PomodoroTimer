let running = false;
let interval = null;

let focusTime = 20; //Focus duration
let breakTime = 5; //Short Break duration
let longBreakTime = 15;
let longBreakSessions = 3; //Number of sessions between long breaks

//Variables used for timer values (timerMin:timerSec)
let timerMin = focusTime;
let timerSec = 0;

let sessionNumber = 0; //Number of focuses since last long break
let justFocused = true;

const alarmSound = new Audio('./sounds/alarm.mp3');

window.onload = document.getElementById('timer').innerHTML = `${focusTime}:00`;

document.getElementById('start_button').addEventListener('click', () => {

	changeButtonLabel();

	if(running == false){
		running = true;
		let timer = document.getElementById('timer');
		console.log("loaded");
		
		interval = setInterval(runTimer, 1000);
	}else{
		running = false;
		clearInterval(interval);
	}
});

runTimer = () => {
	if(timerSec == 0){
		timerMin--;
		if(timerMin == -1){
			alarmSound.play();
			clearInterval(interval);
			running=false;
			changeButtonLabel();
			timerMin = setTimer();
			timerSec = 1;
		}else{
			timerSec = 60;
		}
	}

	timerSec--;
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
			return longBreakTime;
		}

		return breakTime;
	}

	//justFocused will be true after time runs out
	justFocused = true;
	return focusTime;
}