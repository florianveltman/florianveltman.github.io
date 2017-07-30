var i, o, Dial, DialTarget, DialTargetOffset, winstate, AnimSpeed;

function scene_4_setup() {
	win = false;
	// prevent click from previous scene to pass through
	clicking = false;
	// Set up the Scene colors
	renderer.setClearColor(0x00110);
	scene.fog = new THREE.Fog(0x00110, 0, 20);
	// Set up the Camera
	camera = new THREE.PerspectiveCamera(30, W / H, 1, 100);
	camera.position.set(0, 1.5, 10.5);
	camera.rotation.set(0, 0, 0);
	startTime = new Date().getTime();
	MaxTime = document.getElementById("timer").max;
	// get Circle div
	Dial = document.getElementById("Dial");
	i = 0;
	Dial.style.visibility = "visible";
	DialTarget = document.getElementById("DialTarget");
	// Add assets to Scene
	scene.add(Character3);
	scene_4_animation.play();
	// run the Scene
	scene_4_run();
}

function scene_4_draw() {
	deltaTime = new Date().getTime();
	function Timer() {
		var time = new Date().getTime() - startTime;
		var Timer = document.getElementById("timer");
		Timer.style.visibility="visible";
		Timer.value = MaxTime;
	}
	Timer();
	if (MaxTime > 0) {
		Audio1.setVolume(0);
		Audio2.setVolume(1);
		Audio3.setVolume(1);
		// update image
		requestAnimationFrame(scene_4_draw);
		Dial.style.left = window.innerWidth * 0.7 + (-Dial.offsetWidth / 2) + "px";
		Dial.style.top = window.innerHeight * 0.4 + (-Dial.offsetHeight / 2) + "px";
		Dial.style.webkitTransform = "rotate(" + i + "deg)";
		Dial.style.mozTransform = "rotate(" + i + "deg)";
		Dial.style.msTransform = "rotate(" + i + "deg)";
		Dial.style.oTransform = "rotate(" + i + "deg)";
		Dial.style.transform = "rotate(" + i + "deg)";
		DialTargetOffset = DialTarget.getBoundingClientRect();
		if (scene_4_animation.currentTime <= 0.06 || scene_4_animation.currentTime ==
			false) {
			if (((((mouse.x || touch.x) * window.innerWidth) + window.innerWidth / 2) >
				window.innerWidth * (DialTargetOffset.left + DialTarget.offsetWidth / 2) /
				window.innerWidth + (-DialTarget.offsetWidth / 2)) && ((((mouse.x ||
					touch.x) * window.innerWidth) + window.innerWidth / 2) < window.innerWidth *
				(DialTargetOffset.left + DialTarget.offsetWidth / 2) / window.innerWidth +
				(DialTarget.offsetWidth / 2)) && ((((mouse.y || touch.y) * window.innerHeight) +
				window.innerHeight / 2) > window.innerHeight * (DialTargetOffset.top +
				DialTarget.offsetHeight / 2) / window.innerHeight + (-DialTarget.offsetHeight /
				2)) && ((((mouse.y || touch.y) * window.innerHeight) + window.innerHeight /
				2) < window.innerHeight * (DialTargetOffset.top + DialTarget.offsetHeight /
				2) / window.innerHeight + (DialTarget.offsetHeight / 2)) && clicking) {
				i = i - (new Date().getTime() - deltaTime) * 1.5;
				AnimSpeed = 0.05;
			} else {
				AnimSpeed = 0;
				i = i + (clock.getDelta() * 10);
			}
			MaxTime = document.getElementById("timer").max - (new Date().getTime() - startTime);
		} else {
			Dial.style.visibility = "hidden";
			AnimSpeed = 0.2;
			win = true;
		}
		if (scene_4_animation.currentTime >= 0.365) {
			MaxTime = 0;
		}
		//move camera out
		camera.translateZ(0.008);
		camera.rotateZ(-0.0008);
		// animate meshes
		THREE.AnimationHandler.update(clock.getDelta() * AnimSpeed);
		// render scene
		renderer.render(scene, camera);
		// call windowresize script
		THREEx.WindowResize(renderer, camera);
	} else {
		scene.remove(Character3);
		Dial.style.visibility = "hidden";
		if (win) {
			scene_4_setup();
		} else {
			scene_3_setup();
			return;
		}
	}
}

function scene_4_run() {
	scene_4_draw();
}