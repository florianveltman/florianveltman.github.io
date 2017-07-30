var i, win, winstate, AnimSpeed;

function scene_4_intro_setup() {
	// prevent click from previous scene to pass through
	clicking = false;
	win = true;
	// Set up the Scene colors
	renderer.setClearColor(0x00110);
	scene.fog = new THREE.Fog(0x00110, 0, 10);
	// Set up the Camera
	camera = new THREE.PerspectiveCamera(30, W / H, 1, 100);
	camera.position.set(5, 0, 5);
	camera.rotation.set(0, 0.8, 0);
	startTime = new Date().getTime();
	MaxTime = document.getElementById("timer").max;
	document.getElementById("IntroTextSpan")
		.style.visibility = "visible";
	if (mobile) document.getElementById("IntroTextSpan")
		.innerHTML = "Touch<br>&<br>Follow";
	else document.getElementById("IntroTextSpan")
		.innerHTML = "Click<br>&<br>Follow";
	// Add assets to Scene
	scene.add(Scene_4_intro);
	// run the Scene
	scene_4_intro_run();
}

function scene_4_intro_draw() {
	function Timer() {
		var time = new Date().getTime() - startTime;
		var Timer = document.getElementById("timer");
		MaxTime = Timer.max - time*3;
		Timer.value = MaxTime;
		Timer.style.visibility="hidden";
	}
	Timer();
	if (MaxTime > 0) {
		// update image
		requestAnimationFrame(scene_4_intro_draw);
		// move camera out
		camera.translateZ(0.008);
		// camera.rotateZ(-0.0008);
		// render scene
		renderer.render(scene, camera);
		// call windowresize script
		THREEx.WindowResize(renderer, camera);
	} else {
		scene.remove(Scene_4_intro);
		document.getElementById("IntroTextSpan")
			.style.visibility = "hidden";
		scene_4_setup();
	}
}

function scene_4_intro_run() {
	scene_4_intro_draw();
}