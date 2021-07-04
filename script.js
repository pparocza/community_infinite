var masterGain;
var fadeFilter;
var offlineBuffer;

setTimeout(function(){bufferLoaded();}, 1000);

function bufferLoaded(){

	var gain = audioCtx.createGain();
	gain.gain.value = 1.2;

	fadeFilter = new FilterFade(0);

	var f1 = new MyBiquad("highpass", 30, 1);
	var f2 = new MyBiquad("lowpass", 16000, 1);

	masterGain = audioCtx.createGain();
	masterGain.connect(gain);
	gain.connect(fadeFilter.input);
	fadeFilter.connect(f1);
	f1.connect(f2);
	f2.connect(audioCtx.destination);

	// INITS

	troutPad1Init();
	troutPad2Init();
	troutPad3Init();
	troutPad4Init();
	troutPad5Init();

	if(onlineButton.innerHTML == "online"){
		setTimeout(function(){onlineBufferLoaded();}, 1000);
	}

	else if(onlineButton.innerHTML == "offline"){
		offlineBufferLoaded();
	}

}

//--------------------------------------------------------------

function runPatch(){

	// START FADE

	fadeFilter.start(1, 50);

	// PLAYS

	var fund = 43.2;
	var now = audioCtx.currentTime;

	troutPadExponentialSection(fund, now);

}

//--------------------------------------------------------------

function stopPatch(){

	var now = audioCtx.currentTime;
	fadeFilter.start(0, 20);
	setTimeout(function(){masterGain.disconnect();}, 100);
	startButton.innerHTML = "reset";

	if(onlineButton.innerHTML=="offline"){
		offlineBuffer.stop();
	}

}

//--------------------------------------------------------------

function onlineBufferLoaded(){

	startButton.disabled = false;
	startButton.innerHTML = "start";

}

//--------------------------------------------------------------

function offlineBufferLoaded(){

	runPatch();

	audioCtx.startRendering().then(function(renderedBuffer){

		offlineBuffer = onlineCtx.createBufferSource();
		offlineBuffer.buffer = renderedBuffer

		startButton.disabled = false;
		startButton.innerHTML = "start";

		offlineBuffer.connect(onlineCtx.destination);

	})

}
