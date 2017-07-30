var i, o, Circle, posX, posY, Phase, isPlaying = false;

function scene_1_setup() {
	// prevent click from previous scene to pass through
	clicking = false;
	win = false;
	Phase = 0;
	// Set up the Scene colors
	renderer.setClearColor(0xf1937a);
	scene.fog = new THREE.Fog(0xf1937a, 0, 25);
	// Set up the Camera
	camera = new THREE.PerspectiveCamera(30, W / H, 1, 100);
	camera.position.set(12, 6.5, -6.5);
	camera.rotation.set(0, 2, 0);
	MaxTime = document.getElementById("timer")
		.max;
	document.getElementById("timer").value = MaxTime;
	// get Circle div
	Circle = document.getElementById("Circle");
	posX = (Math.floor(Math.random() * (90 - 10 + 1)) + 10)/100; posY = (Math.floor(Math.random() * (90 - 10 + 1)) + 10)/100;
	i = 50;
	o = 0.01;
	// Add assets to Scene
	scene.add(Scene_1_prop);
	scene.add(Scene_1_character);
	// run the Scene
	scene_1_run();
}

function scene_1_draw() {
	function Timer() {
		var time = new Date()
			.getTime() - startTime;
		var Timer = document.getElementById("timer");
		MaxTime = Timer.max - time/3;
		Timer.style.visibility="visible";
		Timer.value = MaxTime;
	}
	
	if (MaxTime > 0) {
		Audio1.setVolume(1);
		Audio3.setVolume(0);
		Audio2.setVolume(0);
		Circle.style.left = window.innerWidth * posX + (-Circle.offsetWidth / 2) +
				"px";
			Circle.style.top = window.innerHeight * posY + (-Circle.offsetHeight / 2) +
				"px";
		
		CircleOffset = Circle.getBoundingClientRect();

		Circle.style.visibility = "visible";
		var red = (Math.sin(Date.now() * 0.005) * 128) + 188;
		Circle.style.height = Circle.style.width = ((Math.sin(Date.now() * o)) + (i /
			10)) + "vw";
		if (((((mouse.x || touch.x) * window.innerWidth) + window.innerWidth / 2) >
			window.innerWidth * (CircleOffset.left + Circle.offsetWidth / 2) / window
			.innerWidth + (-Circle.offsetWidth / 2)) && ((((mouse.x || touch.x) *
			window.innerWidth) + window.innerWidth / 2) < window.innerWidth * (
			CircleOffset.left + Circle.offsetWidth / 2) / window.innerWidth + (
			Circle.offsetWidth / 2)) && ((((mouse.y || touch.y) * window.innerHeight) +
			window.innerHeight / 2) > window.innerHeight * (CircleOffset.top +
			Circle.offsetHeight / 2) / window.innerHeight + (-Circle.offsetHeight /
			2)) && ((((mouse.y || touch.y) * window.innerHeight) + window.innerHeight /
				2) < window.innerHeight * (CircleOffset.top + Circle.offsetHeight / 2) /
			window.innerHeight + (Circle.offsetHeight / 2)) && clicking) {
			Circle.style.borderColor = "white";
			Circle.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
			i = i + 1;
			o = 0.01;
		} else {
			Circle.style.borderColor = "rgb(" + Math.floor(red) + ", 255, 255)";
			Circle.style.backgroundColor = "transparent";
			o = 0.005;
		}
		if (Circle.offsetWidth > (window.innerWidth * 0.15)){
			i = 50;
			o = 0.01;
			posX = (Math.floor(Math.random() * (90 - 10 + 1)) + 10)/100; posY = (Math.floor(Math.random() * (90 - 10 + 1)) + 10)/100;
			Phase = Phase + 1;
		}
		
		if (Phase == 1) {
			startTime = new Date()
		.getTime();
			Timer();
			if (!isPlaying) {
				Audio1.play();
				Audio2.play();
				Audio3.play();
				isPlaying = true;
			}
			Phase = 2;
			win = false;
		}
		if (Phase >= 1.1 && Phase < 3) {
			Timer();
			win = false;
		}
		if (Phase >= 3) {
			Timer();
			win = true;
		}
		
		// update image
		requestAnimationFrame(scene_1_draw);
		camera.translateZ(Math.sin(Date.now() * -0.0001) * -0.00325);
		// render scene
		renderer.render(scene, camera);
		// call windowresize script
		THREEx.WindowResize(renderer, camera);
		// animate meshes
		THREE.AnimationHandler.update(clock.getDelta() * 0.15);
	} else {
		scene.remove(Scene_1_prop, Scene_1_character);
		Circle.style.visibility = "hidden";
		if (win) {
			Phase = 0;
			scene_2_setup();
		} else {
			scene_1_setup();
			return;
		}
	}
}

function scene_1_run() {
	// launch the scene and draw it on screen
	scene_1_draw();
}