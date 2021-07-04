function InstrumentConstructorTemplate(){

	this.output = audioCtx.createGain();

}

InstrumentConstructorTemplate.prototype = {

	output: this.output,

	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

}

//--------------------------------------------------------------

function Instrument(){

	this.input = audioCtx.createGain();
	this.output = audioCtx.createGain();
	this.startArray = [];

}

Instrument.prototype = {

	input: this.input,
	output: this.output,
	startArray: this.startArray,

	start: function(){
		for(var i=0; i<this.startArray.length; i++){
			this.startArray[i].start();
		}
	},

	stop: function(){
		for(var i=0; i<this.startArray.length; i++){
			this.startArray[i].stop();
		}
	},

	startAtTime: function(startTime){

		var startArray = this.startArray;
		var startTime = startTime;

		setTimeout(function(){
			for(var i=0; i<startArray.length; i++){
				startArray[i].start();
			}
		}, startTime*1000);

	},

	stopAtTime: function(stopTime){

		var startArray = this.startArray;
		var stopTime = stopTime;

		setTimeout(function(){
			for(var i=0; i<startArray.length; i++){
				startArray[i].stop();
			}
		}, startTime*1000);

	},

	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

}

//--------------------------------------------------------------

function SawSines(freqArray, rateArray){

	this.output = audioCtx.createGain();

	this.freqArray = freqArray;
	this.rateArray = rateArray;

	this.nNodes = this.freqArray.length;

	this.osc = {};
	this.saw = {};
	this.amFilter = {};
	this.amGain = {};

	for(var i=0; i<this.nNodes; i++){

		this.osc[i] = {osc: new MyOsc("sine", this.freqArray[i])};

		this.saw[i] = {saw: new MyBuffer(1, 1, audioCtx.sampleRate)};
		this.saw[i].saw.makeInverseSawtooth(4);
		this.saw[i].saw.loop = true;
		this.saw[i].saw.playbackRate = this.rateArray[i];

		this.amFilter[i] = {filter: new MyBiquad("lowpass", 500, 0)};

		this.amGain[i] = {gain: new MyGain(0)};

		this.saw[i].saw.connect(this.amFilter[i].filter);

		this.osc[i].osc.connect(this.amGain[i].gain); this.amFilter[i].filter.connect(this.amGain[i].gain.gain.gain);

	}

}

SawSines.prototype = {

	output: this.output,
	nNodes: this.nNodes,
	osc: this.osc,
	saw: this.saw,
	amFilter: this.amFilter,
	amGain: this.amGain,

	setFreq: function(freq, idx){

		var freq = freq;
		var idx = idx;

		this.osc[idx].osc.osc.frequency.value = freq;

	},

	setFreqs: function(freqArray){

		var freqArray = freqArray;

		for(var i=0; i<this.nNodes; i++){
			this.osc[i].osc.osc.frequency.value = freqArray[i];
		}

	},

	start: function(){

		for(var i=0; i<this.nNodes; i++){
			this.osc[i].osc.start();
			this.saw[i].saw.start();
		}

	},

	stop: function(){

		for(var i=0; i<this.nNodes; i++){
			this.osc[i].osc.stop();
			this.saw[i].saw.stop();
		}

	},

	connectOutput: function(audioNode, idx){

		var idx = idx;

		if (audioNode.hasOwnProperty('input') == 1){
			this.amGain[idx].gain.connect(audioNode.input);
		}
		else {
			this.amGain[idx].gain.connect(audioNode);
		}

	},

	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

}

//--------------------------------------------------------------

function ElectricPiano(){

	this.output = audioCtx.createGain();

	// src
	this.osc = new MyOsc("sine", 0);

	// envelope
	this.e = new MyBuffer(1, 1, audioCtx.sampleRate);
	this.e.makeInverseSawtooth(4);
	this.e.loop = false;
	this.f = new MyBiquad("lowpass", 500, 0);
	this.eG = new MyGain(0);

	// shapers
	this.s = {};
	this.timbreGain = new MyGain(0.2);
	this.sOG = new MyGain(0.3);

	for(var i=0; i<3; i++){

		this.s[i] = {shaper: new MyWaveShaper()};
		this.s[i].shaper.makeFm(randomFloat(5, 8.1), randomFloat(0.1, 0.31), 1);

		this.timbreGain.connect(this.s[i].shaper);
		this.s[i].shaper.connect(this.sOG);

	}

	// highpass
	this.hp = new MyBiquad("highpass", 20, 0);

	this.e.connect(this.f);

	this.osc.connect(this.eG);	this.f.connect(this.eG.gain.gain);
	this.eG.connect(this.timbreGain);
	this.sOG.connect(this.hp);
	this.hp.connect(this.output);

}

ElectricPiano.prototype = {

	output: this.output,
	osc: this.osc,
	e: this.e,
	eG: this.eG,
	timbreGain: this.timbreGain,

	playAtTime: function(startTime, freq, duration){

		this.startTime = startTime;

		var freq = freq;
		var duration = 1/duration;

		var e = this.e;
		var osc = this.osc;
		var e = this.e;

		setTimeout(function(){

			osc.osc.frequency.value = freq;
			e.playbackRate = duration;

			e.start();

		}, this.startTime*1000);

	},

	start: function(){

		this.osc.start();

	},

	stop: function(){

		this.osc.stop();

	},

	connectOutput: function(audioNode, idx){

		var idx = idx;

		if (audioNode.hasOwnProperty('input') == 1){
			this.amGain[idx].gain.connect(audioNode.input);
		}
		else {
			this.amGain[idx].gain.connect(audioNode);
		}

	},

	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

}

//--------------------------------------------------------------

function ShaperBank(inGainArray, outGainArray){

	this.inGainArray = inGainArray;
	this.outGainArray = outGainArray;

	this.nShapers = inGainArray.length;

	this.onGain = {};
	this.onConstant = new BufferConstant(1);
	this.on = new MyGain(0);
	this.onFilter = new MyBiquad("lowpass", 100, 0);

	this.inGain = {};
	this.shaper = {};
	this.outGain = {};

	this.cFreq;
	this.mFreq;

	for(var i=0; i<this.nShapers; i++){

		this.onGain[i] = {gain: new MyGain(0)};

		this.inGain[i] = {gain: new MyGain(this.inGainArray[i])};
		this.shaper[i] = {shaper: new MyWaveShaper()};
		this.shaper[i].shaper.makeFm(randomFloat(5, 8.1), randomFloat(0.1, 0.31), 1);
		this.outGain[i] = {gain: new MyGain(this.outGainArray[i])};

		this.onConstant.connect(this.on);
		this.on.connect(this.onFilter);
		this.onFilter.connect(this.onGain[i].gain.gain.gain);
		this.onGain[i].gain.connect(this.inGain[i].gain);
		this.inGain[i].gain.connect(this.shaper[i].shaper);
		this.shaper[i].shaper.connect(this.outGain[i].gain);

	}

	this.onConstant.start();

}

ShaperBank.prototype = {

	outGain: this.outGain,
	shaper: this.shaper,
	on: this.on,

	connectOutput: function(audioNode, idx){

		var idx = idx;

		if (audioNode.hasOwnProperty('input') == 1){
			this.outGain[idx].gain.connect(audioNode.input);
		}
		else {
			this.outGain[idx].gain.connect(audioNode);
		}

	},

	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

}

//--------------------------------------------------------------

function Effect(){

	this.input = audioCtx.createGain();
	this.filterFade = new FilterFade(0);
	this.output = audioCtx.createGain();
	this.startArray = [];

	this.input.connect(this.filterFade.input);

}

Effect.prototype = {

	input: this.input,
	output: this.output,
	filterFade: this.filterFade,
	startArray: this.startArray,

	effectMethod: function(){
		this.startArray = [];
	},

	thru: function(){

		this.filterFade.connect(this.output);

	},

	shortDelay: function(){

		this.dly = new MyStereoDelay(randomFloat(0.01, 0.035), randomFloat(0.01, 0.035), randomFloat(0, 0.1), 1);

		this.filterFade.connect(this.dly);
		this.dly.connect(this.output);

	},

	slap: function(){

		this.dly = new MyStereoDelay(randomFloat(0.08, 0.15), randomFloat(0.08, 0.15), randomFloat(0, 0.1), 1);

		this.filterFade.connect(this.dly);
		this.dly.connect(this.output);

	},

	echo: function(){

		this.dly = new MyStereoDelay(randomFloat(0.5, 1), randomFloat(0.5, 1), randomFloat(0, 0.2), 1);

		this.filterFade.connect(this.dly);
		this.dly.connect(this.output);

	},

	wSlap: function(){

		this.dly = new MyStereoDelay(randomFloat(0.08, 0.15), randomFloat(0.08, 0.15), randomFloat(0, 0.1), 1);
		this.w = new MyWaveShaper();
		this.w.makeFm(100, 21, 1);
		this.wG = new MyGain(0.001);

		this.filterFade.connect(this.dly);
		this.dly.connect(this.wG);
		this.wG.connect(this.output);

	},

	switch: function(switchVal){

		var switchVal = switchVal;

		this.filterFade.start(switchVal, 30);

	},

	switchAtTime: function(switchVal, time){

		this.switchVal = switchVal;
		this.time = time;

		this.filterFade.startAtTime(this.switchVal, randomInt(2, 20), this.time);

	},

	on: function(){

		this.filterFade.start(1, 30);

	},

	off: function(){

		this.filterFade.start(0, 20);

	},

	onAtTime: function(time){

		var filterFade = this.filterFade;

		setTimeout(function(){filterFade.start(1, 20);}, time*1000);

	},

	offAtTime: function(time){

		var filterFade = this.filterFade;

		setTimeout(function(){filterFade.start(0, 20);}, time*1000);

	},

	start: function(){

		for(var i=0; i<this.startArray.length; i++){
			this.startArray[i].start();
		}

	},

	stop: function(){

		for(var i=0; i<this.startArray.length; i++){
			this.startArray[i].stop();
		}

	},

	startAtTime: function(startTime){

		var startArray = this.startArray;
		var startTime = startTime;

		setTimeout(function(){
			for(var i=0; i<startArray.length; i++){
				startArray[i].start();
			}
		}, startTime*1000);

	},

	stopAtTime: function(stopTime){

		var startArray = this.startArray;
		var stopTime = stopTime;

		setTimeout(function(){
			for(var i=0; i<startArray.length; i++){
				startArray[i].stop();
			}
		}, startTime*1000);

	},

	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

}

//--------------------------------------------------------------

function TroutPad(eArray){

	this.output = audioCtx.createGain();

	this.eArray = eArray;

	this.iArray = [];
	this.tArray = [];
	this.gArray = [];
	this.lArray = [];
	this.wArray = [];
	this.wGArray = [];
	this.oArray = [];

	for(var i=0; i<6; i++){

		this.iArray[i] = 0;
		this.tArray[i] = "sine";
		this.gArray[i] = new MyGain(0);

		this.lArray[i] = new LFO(0, randomFloat(0.1, 0.3), randomFloat(0.1, 0.2));
		this.lArray[i].buffer.makeTriangle();
		this.lArray[i].start();

		this.wArray[i] = new MyWaveShaper();
		this.wArray[i].makeFm(randomInt(20, 70), randomInt(20, 70), 1);
		this.wGArray[i] = new MyGain(randomFloat(0.05, 0.1));

	}

	this.mOsc = new MultiOsc(this.tArray, this.iArray);

	this.f1 = new MyBiquad("highshelf", 3000, 0);
	this.f1.biquad.gain.value = -14;
	this.f2 = new MyBiquad("lowpass", 5000, 0);
	this.f3 = new MyBiquad("lowshelf", 100, 0);
	this.f3.biquad.gain.value = 2;

	for(var i=0; i<6; i++){

		this.mOsc.connect(this.gArray[i], i); this.lArray[i].connect(this.gArray[i].gain.gain);
		this.gArray[i].connect(this.wGArray[i]);
		this.wGArray[i].connect(this.wArray[i]);
		this.wArray[i].connect(this.f1);

	}

	this.e = new Envelope(this.eArray);
	this.eG = new MyGain(0);

	this.f1.connect(this.f2);
	this.f2.connect(this.f3);
	this.f3.connect(this.eG); this.e.connect(this.eG.gain.gain);
	this.eG.connect(this.output);

}

TroutPad.prototype = {

	output: this.output,
	mOsc: this.mOsc,
	e: this.e,
	gArray: this.gArray,

	playAtTime: function(time){

		this.time = time;

		this.e.startAtTime(this.time);

	},

	setFreqs: function(valueArray){

		this.valueArray = valueArray;

		for(var i=0; i<6; i++){
			this.mOsc.oscs[i].osc.osc.frequency.value = this.valueArray[i];
		}

	},

	setFreqsAtTime: function(valueArray, time){

		this.valueArray = valueArray;
		this.time = time;

		for(var i=0; i<6; i++){
			this.mOsc.oscs[i].osc.osc.frequency.setValueAtTime(this.valueArray[i], this.time);
		}

	},

	setGains: function(valueArray){

		this.valueArray = valueArray;

		for(var i=0; i<6; i++){
			this.gArray[i] = this.valueArray[i];
		}

	},

	start: function(){

		this.mOsc.startAll();

	},

	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

}

//--------------------------------------------------------------
