let context, analyser, dataArray;
const circleLow = document.getElementById('lowCircle');
const circleMedium = document.getElementById('mediumCircle');
const circleHigh = document.getElementById('highCircle');

const audio = document.getElementById('audio');
// audio.crossOrigin = "anonymous";

const audioVisualizer = () => {
	if(!context){
		preparation();
	}
	if(!isPlay){
		playAudio();
	} else {
		pauseAudio();
	}
}

const playAudio = () => {
	audio.play();
	loop();
	plate.style.animationPlayState = 'running';
}

const pauseAudio = () => {
	audio.pause();
	plate.style.animationPlayState = 'paused';
}

const preparation = () => {
	context = new AudioContext();
	analyser = context.createAnalyser();
	const src = context.createMediaElementSource(audio);
	src.connect(analyser);
	analyser.connect(context.destination);
	loop();
}

const loop = () => {
	if(audio.paused){
		return;
	}

	window.requestAnimationFrame(loop);

	dataArray = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(dataArray);

	changeCircles(circleLow, 20);
	changeCircles(circleMedium, 40);
	changeCircles(circleHigh, 60);

	setTimeout(() => {
		resetBorder(circleLow, circleMedium, circleHigh);
	}, 200);
}

const changeCircles = (circle, frequency) => {
	circle.style.height = `calc(50% + ${dataArray[frequency]}px)`;
	circle.style.backgroundColor = `rgba(${dataArray[frequency] / 2}, 58, 183, .55)`;
	// circle.style.transform = `translate(-${dataArray[frequency]}px, -${dataArray[frequency]}px)`;
	circle.style.borderRadius = generateBorderRadius();
}

const resetBorder = (...circles) =>{
	circles.forEach(circle => circle.style.borderRadius = '50%');
}

const generateBorderRadius = () => {
	const randomizeAngle = () => Math.floor(Math.random() * (85 - 15) + 15);

	const top = randomizeAngle();
	const bottom = randomizeAngle();
	const left = randomizeAngle();
	const right = randomizeAngle();

	return `${top}% ${100-top}% ${bottom}% ${100-bottom}% / ${left}% ${right}% ${100-right}% ${100-left}%`;
}
