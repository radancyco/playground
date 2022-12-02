const btnAudio = document.getElementById("btn-audio");

btnAudio.onclick = function() {

	btnAudio.classList.toggle("on");

}

const video = document.getElementById("video-1");
const trackDisplay = document.getElementById("track-display");

if (video.textTracks) {

	const track = video.textTracks[0];
	track.mode = 'hidden';

	track.oncuechange = function(e) {

		const cue = this.activeCues[0];

		if (cue) {

			trackDisplay.innerHTML = '';
			trackDisplay.appendChild(cue.getCueAsHTML());

		}

	}

}
