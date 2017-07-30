var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

function Sound(source,level) {
	var that = this;
	that.source = source;
	that.buffer = null;
	that.isLoaded = false;
	that.volume = audioContext.createGain();
	if (!level) {
		that.volume.gain.value = 1;	
	} else {
		that.volume.gain.value = level;
	}
		
	var getSound = new XMLHttpRequest();
	getSound.open("GET", that.source, true);
	getSound.responseType = "arraybuffer";
	getSound.onload = function() {
		audioContext.decodeAudioData(getSound.response, function(buffer) {
			that.buffer = buffer;
			that.isLoaded = true;
		});
	}
	getSound.send();
}

Sound.prototype.play = function() {
	if (!audioContext.createGain) {
		audioContext.createGain = audioContext.createGainNode;
	}
	if (this.isLoaded === true) {
		var playSound = audioContext.createBufferSource();
		playSound.buffer = this.buffer;
		playSound.connect(this.volume);
		this.volume.connect(audioContext.destination);
		if (!playSound.start)
    		playSound.start = playSound.noteOn;
		playSound.start(0);
		playSound.loop = true;
	}
}

Sound.prototype.setVolume = function(level) {
	this.volume.gain.value = level;
}