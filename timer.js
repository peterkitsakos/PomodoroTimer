let started = false;
let interval = null;
let timerMin = 20;
let timerSec = 00;

document.getElementById('start_button').addEventListener('click', () => {

	changeButtonLabel();

	if(started == false){
		started = true;
		let timer = document.getElementById('timer');
		// console.log("loaded");
		
		interval = setInterval(runTimer, 1000);

		function runTimer() {
			if(timerSec == 0){
				timerMin--;
				timerSec = 60;
			}

			timerSec--;
			(timerSec < 10) ? timer.innerHTML = `${timerMin}:0${timerSec}` : timer.innerHTML = `${timerMin}:${timerSec}`;
		}
	}else{
		started = false;
		clearInterval(interval);
	}
});

function changeButtonLabel(){
	let button = document.getElementById('start_button');
	button.innerHTML = (button.innerHTML == "Start") ? "Stop" : "Start";
}