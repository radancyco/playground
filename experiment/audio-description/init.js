(function(){

	var videoWrapper = document.getElementById("video-wrapper");
	var pauseDescription = document.createElement("button");
	pauseDescription.setAttribute("id", "pause-button");
	pauseDescription.textContent = "Toggle Audio Description";
	videoWrapper.appendChild(pauseDescription);
	
	//get references to the video and audio elements
	
	var video = document.getElementById('video');
	var audio = document.getElementById('audio');
	
	
	//if media controllers are supported,
	//create a controller instance for the video and audio
	
	if(typeof(window.MediaController) === 'function') {
	
		var controller = new MediaController();
		audio.controller = controller;
		video.controller = controller;
	
	} else {
	
		//else create a null controller reference for comparison
	
		controller = null;
	
	}
	
	//reduce the video volume slightly to emphasise the audio
	
	audio.volume = 1;
	video.volume = 0.8;
	
	//when the video plays
	
	video.addEventListener('play', function() {
	
		//if we have audio but no controller
		//and the audio is paused, play that too
	
		if(!controller && audio.paused) {
	
			audio.play();
	
		}
	
	}, false);
	
	//when the video pauses
	
	video.addEventListener('pause', function() {
	
		//if we have audio but no controller
		//and the audio isn't paused, pause that too
	
		if(!controller && !audio.paused) {
	
			audio.pause();
	
		}
	
	}, false);
	
	//when the video ends
	
	video.addEventListener('ended', function() {
	
		//if we have a controller, pause that
	
		if(controller) {
	
			controller.pause();
	
		} else {
	
		//otherwise pause the video and audio separately
	
			video.pause();
			audio.pause();
	
		}
	
	}, false);
	
	
	//when the video time is updated
	
	video.addEventListener('timeupdate', function(){
	
		//if we have audio but no controller,
		//and the audio has sufficiently loaded
	
		if(!controller && audio.readyState >= 4) {
	
			//if the audio and video times are different,
			//update the audio time to keep it in sync
	
			if(Math.ceil(audio.currentTime) != Math.ceil(video.currentTime)) {
	
				audio.currentTime = video.currentTime;
	
			}
	
		}
	
	}, false);
	
	var pauseButton = document.getElementById("pause-button");
	
	var isPlaying = false;
	
	function togglePlay() {
	
		return audio.paused ? audio.play() : audio.pause();
	
	};
	
	pauseButton.addEventListener('click', function() {
	
		togglePlay();
	
	});
	
	video.addEventListener('ended', setAttr, false);
	video.addEventListener('pause', setAttr, false);
	
	function setAttr(e) {
	
		pauseButton.setAttribute("disabled", "disabled");
	
	}
	
	video.addEventListener('play', removeAttr,false);
	
	function removeAttr(e) {
	
		if(video.muted) {
	
			pauseButton.setAttribute("disabled", "disabled");
	
		} else {
	
			pauseButton.removeAttribute("disabled");
	
		}
	
	}
	
	video.addEventListener('volumechange', detectVolume, false);
	
	function detectVolume(e) {
	
		if(video.muted) {
	
			pauseButton.setAttribute("disabled", "disabled");
			audio.muted = true;
	
		} else {
	
			pauseButton.removeAttribute("disabled");
			audio.muted = false;
	
		}
	
	}
	
	video.addEventListener('loadstart', loadUp, false);
	
	function loadUp(e) {
	
		pauseButton.setAttribute("disabled", "disabled");
	
	}
	
})();   