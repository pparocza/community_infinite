function partTemplate(startTime, stopTime, gainVal, paramArray){

	var startTime = startTime;
	var stopTime = stopTime;
	var paramArray = paramArray;

	var output = audioCtx.createGain();
	output.gain.value = gainVal;

	//

	//

	output.connect(masterGain);

	setTimeout(function(){}, startTime*1000);
	setTimeout(function(){}, stopTime*1000);

}

//--------------------------------------------------------------

var tPad1;
var fx1;

function troutPad1Init(){

	var output = audioCtx.createGain();
	output.gain.value = 0.07;

	tPad1 = new TroutPad([1, 0.8, 1, 4, 0, 3.2]);
	tPad1.start();

	var fx1G = new MyGain(1);

	// make this an effect?
	var dly = new MyStereoDelay(0.5, 0.6, 0.3, 1);
	var dW = new MyWaveShaper();
	dW.makeAm(randomInt(11, 20), randomInt(5, 15), 1);
	var dWG = new MyGain(0.1);

	var f = new MyBiquad("highpass", 31, 1);
	var f2 = new MyBiquad("highpass", 200, 0);

  tPad1.connect(fx1G);

	output.connect(f.input);
	f.connect(f2);
	f2.connect(masterGain);

	f2.connect(dWG.input);
	dWG.connect(dW);
	dW.connect(dly);
	dly.connect(masterGain);

	// fx1 TAPS

	var nfx1 = 6;

	fx1 = new MultiEffect(nfx1);
	fx1.effects[0].effect.shortDelay();
	fx1.effects[1].effect.shortDelay();
	fx1.effects[2].effect.echo();
	fx1.effects[3].effect.echo();
	fx1.effects[4].effect.slap();
	fx1.effects[5].effect.slap();

	for(var i=0; i<nfx1; i++){
		fx1G.connect(fx1.effects[i].effect);
		fx1.effects[i].effect.output.gain.value = 1/nfx1;
		fx1.effects[i].effect.connect(output);
	}

}

//--------------------------------------------------------------

var tPad2;
var fx2;

function troutPad2Init(){

	var output = audioCtx.createGain();
	output.gain.value = 0.07;

	tPad2 = new TroutPad([1, 0.8, 1, 4, 0, 3.2]);
	tPad2.start();

	var fxG = new MyGain(1);

	// make this an effect?
	var dly = new MyStereoDelay(0.5, 0.6, 0.3, 1);
	var dW = new MyWaveShaper();
	dW.makeAm(randomInt(11, 20), randomInt(5, 15), 1);
	var dWG = new MyGain(0.1);

	var f = new MyBiquad("highpass", 31, 1);
	var f2 = new MyBiquad("lowshelf", 200, 0);
	// f2.biquad.gain.value = -12;

  tPad2.connect(fxG);
	output.connect(f.input);
	f.connect(f2);
	f2.connect(masterGain);

	f2.connect(dWG.input);
	dWG.connect(dW);
	dW.connect(dly);
	dly.connect(masterGain);


	// FX TAPS

	var nFX = 6;

	fx2 = new MultiEffect(nFX);
	fx2.effects[0].effect.shortDelay();
	fx2.effects[1].effect.shortDelay();
	fx2.effects[2].effect.slap();
	fx2.effects[3].effect.slap();
	fx2.effects[4].effect.echo();
	fx2.effects[5].effect.echo();

	for(var i=0; i<nFX; i++){
		fxG.connect(fx2.effects[i].effect);
		fx2.effects[i].effect.output.gain.value = 1/nFX;
		fx2.effects[i].effect.connect(output);
	}

}

//--------------------------------------------------------------

var tPad3;
var fx3;

function troutPad3Init(){

	var output = audioCtx.createGain();
	output.gain.value = 0.1;

	tPad3 = new TroutPad([1, 0.8, 1, 4, 0, 3.2]);
	tPad3.start();

	var fxG = new MyGain(1);

	// make this an effect?
	var dly = new MyStereoDelay(0.5, 0.6, 0.3, 1);
	var dW = new MyWaveShaper();
	dW.makeAm(randomInt(11, 20), randomInt(5, 15), 1);
	var dWG = new MyGain(0.1);

	var f = new MyBiquad("highpass", 31, 1);
	var f2 = new MyBiquad("lowshelf", 201.47, 1);
	f2.biquad.gain.value = -9;

  tPad3.connect(fxG);
	output.connect(f.input);
	f.connect(f2);
	f2.connect(masterGain);

	f2.connect(dWG.input);
	dWG.connect(dW);
	dW.connect(dly);
	dly.connect(masterGain);


	// FX TAPS

	var nFX = 6;

	fx3 = new MultiEffect(nFX);
	fx3.effects[0].effect.shortDelay();
	fx3.effects[1].effect.shortDelay();
	fx3.effects[2].effect.slap();
	fx3.effects[3].effect.slap();
	fx3.effects[4].effect.echo();
	fx3.effects[5].effect.echo();

	for(var i=0; i<nFX; i++){
		fxG.connect(fx3.effects[i].effect);
		fx3.effects[i].effect.output.gain.value = 1/nFX;
		fx3.effects[i].effect.connect(output);
	}

}

//--------------------------------------------------------------

var tPad4;
var fx4;

function troutPad4Init(){

	var output = audioCtx.createGain();
	output.gain.value = 0.06;

	tPad4 = new TroutPad([1, 0.8, 1, 4, 0, 3.2]);
	tPad4.start();

	var fxG = new MyGain(1);

	// make this an effect?
	var dly = new MyStereoDelay(0.5, 0.6, 0.3, 1);
	var dW = new MyWaveShaper();
	dW.makeAm(randomInt(11, 20), randomInt(5, 15), 1);
	var dWG = new MyGain(0.1);

	var f = new MyBiquad("highpass", 31, 1);
	var f2 = new MyBiquad("lowshelf", 200, 0);
	// f2.biquad.gain.value = -12;

  tPad4.connect(fxG);
	output.connect(f.input);
	f.connect(f2);
	f2.connect(masterGain);

	f2.connect(dWG.input);
	dWG.connect(dW);
	dW.connect(dly);
	dly.connect(masterGain);


	// FX TAPS

	var nFX = 6;

	fx4 = new MultiEffect(nFX);
	fx4.effects[0].effect.shortDelay();
	fx4.effects[1].effect.shortDelay();
	fx4.effects[2].effect.slap();
	fx4.effects[3].effect.slap();
	fx4.effects[4].effect.echo();
	fx4.effects[5].effect.echo();

	for(var i=0; i<nFX; i++){
		fxG.connect(fx4.effects[i].effect);
		fx4.effects[i].effect.output.gain.value = 1/nFX;
		fx4.effects[i].effect.connect(output);
	}

}

//--------------------------------------------------------------

var tPad5;
var fx5;

function troutPad5Init(){

	var output = audioCtx.createGain();
	output.gain.value = 0.028;

	tPad5 = new TroutPad([1, 0.8, 1, 4, 0, 3.2]);
	tPad5.start();

	var fxG = new MyGain(1);

	// make this an effect?
	var dly = new MyStereoDelay(0.5, 0.6, 0.3, 1);
	var dW = new MyWaveShaper();
	dW.makeAm(randomInt(11, 20), randomInt(5, 15), 1);
	var dWG = new MyGain(0.1);

	var f = new MyBiquad("highpass", 31, 1);
	var f2 = new MyBiquad("lowshelf", 200, 0);
	// f2.biquad.gain.value = -12;

  tPad5.connect(fxG);
	output.connect(f.input);
	f.connect(f2);
	f2.connect(masterGain);

	f2.connect(dWG.input);
	dWG.connect(dW);
	dW.connect(dly);
	dly.connect(masterGain);


	// FX TAPS

	var nFX = 6;

	fx5 = new MultiEffect(nFX);
	fx5.effects[0].effect.shortDelay();
	fx5.effects[1].effect.shortDelay();
	fx5.effects[2].effect.slap();
	fx5.effects[3].effect.slap();
	fx5.effects[4].effect.echo();
	fx5.effects[5].effect.echo();

	for(var i=0; i<nFX; i++){
		fxG.connect(fx5.effects[i].effect);
		fx5.effects[i].effect.output.gain.value = 1/nFX;
		fx5.effects[i].effect.connect(output);
	}

}

//--------------------------------------------------------------

function troutPadExponential(startTime, fund, iArrayBase, iArrayVals, nChords, oArrayVals, pad, fx){

	var startTime = startTime;
	var fund = fund;
	var iArrayBase = iArrayBase;
	var iArrayVals = iArrayVals;
	var nChords = nChords;
	var oArrayVals = oArrayVals;
	var pad = pad;
	var fx = fx;

	var eArray = [1, 0.8, 1, 4, 0, 3.2];

	var chordArray = [];
	var cL = 6;
	var iArray = new Sequence();

	iArray.randomPowers(cL, iArrayBase, iArrayVals);

	iArray = iArray.add(1);

	var oArray = new Sequence();
	oArray = oArray.additive(nChords, oArrayVals);

	chordArray[0] = new Sequence();
	chordArray[0] = chordArray[0].randomSelect(cL, iArray);
	troutPadPlay(startTime, fund, chordArray[0], pad, fx);

}

//--------------------------------------------------------------

function troutPadPlay(time, fund, iArray, pad, fx){

	var time = time;
	var fund = fund;
	var iArray = new MyArray(iArray);
	var pad = pad;
	var fx = fx;

	iArray.multiply(fund);
	iArray = iArray.array;

	pad.playAtTime(time);
	pad.setFreqsAtTime(iArray, time);
	fxSequence(fx, 200, time);

}

//--------------------------------------------------------------

function fxSequence(fxObject, sequenceLength, time){

	var fxSL = sequenceLength;
	var fxObject = fxObject;
	var time = time;

	var oSeqArray = [];
	var divArray = new MyArray([0.8, 0.4, 0.31]);
	divArray.multiply(0.1);

	for(var i=0; i<fxObject.nEffects; i++){
		// create a new onset sequence
		oSeqArray[i] = new Sequence();
		oSeqArray[i].additive(fxSL, divArray.array);

		for(var j=0; j<fxSL; j++){
			// implement onset sequence
			fxObject.effects[i].effect.switchAtTime(randomInt(0, 2), time+oSeqArray[i].sequence[j]);
		}
	}

}

//--------------------------------------------------------------
