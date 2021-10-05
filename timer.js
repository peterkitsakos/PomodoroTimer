window.onload = () => {

	let timer = document.getElementById('timer');
	console.log("loaded");
	let timerMin = 20;
	let timerSec = 11;
	
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
}