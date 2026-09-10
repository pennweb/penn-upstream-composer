import $ from "jquery";
import debug from 'bows/dist/bows.min.js';
import fitvid from '../../assets/js/base/_fitvid';

const log = debug("video-vimeo");

let vimeo_videos = document.querySelectorAll('[data-vimeo]');
let players = [];


function add_api() {
	var tag = document.createElement('script'),
		firstScriptTag = document.getElementsByTagName('script')[0];

	tag.src = "https://player.vimeo.com/api/player.js";
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}



function load_videos() {
	vimeo_videos.forEach(vid => {

		//Play button
		const play_button = vid.querySelector('.video-button--play');


		//Id of Vimeo Video
		let vimeo_id = vid.getAttribute('data-vimeo');

		const player_id = `vimeo_${vimeo_id}`;
		// element that vimeo will be loaded into
		let vimeo_div = vid.querySelector('.video-vimeo__vimeo');

		// Vimeo options
		let options = {
			id: vimeo_id,
			width: 1450,
			autoplay: false,
			dnt: true
		}


		//Adds a unique ID to video div to attach player
		vimeo_div.setAttribute('id', player_id);

		// Create a new Vimeo.Player and load video with options
		let video_player = new Vimeo.Player(player_id, options);

		//Add Player to array for use later
		players.push(video_player);

		//When the video has loaded fir fitvid for responsive videos
		video_player.ready().then(function () {
			fitvid();
		});

		if (play_button) {
			play_button.addEventListener('click', function () {
				vid.classList.remove('video-vimeo--poster');
				vid.classList.add('video-vimeo--hide-buttons');
				video_player.play();
			});
		}
	});

}

export function init() {
	log("video vimeo");
	if (vimeo_videos.length) {
		add_api();

		$(window).on('load', function () {
			load_videos();
		});
	}
}

export default {
	init
};
