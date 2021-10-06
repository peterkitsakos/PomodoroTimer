let started = false;

document.getElementById('start_button').addEventListener('click', () => {

	if(started == false){
		started = true;
		changeButtonLabel();
		let timer = document.getElementById('timer');
		console.log("loaded");
		let timerMin = 20;
		let timerSec = 00;
		
		setInterval(runTimer, 1000);

		function runTimer() {
			if(timerSec == 0){
				timerMin--;
				timerSec = 60;
			}
			timerSec--;
			if(timerSec < 10){
				timer.innerHTML = `${timerMin}:0${timerSec}`;
			}else{
				timer.innerHTML = `${timerMin}:${timerSec}`;
			}
		}
	}else{
		started = false;
		clearInterval(runTimer);
	}
});

function changeButtonLabel(){
	let button = document.getElementById('start_button');
	if(button.innerHTML == "Start"){
		button.innerHHTML = "Stop"
	}else{
		button.innerHTML = "Start"
	}
}