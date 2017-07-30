var i, o, Circle, win;

function scene_3_setup() {
	// prevent click from previous scene to pass through
	clicking = false; win = false;
	// Set up the Scene colors
	renderer.setClearColor(0x801537);
	scene.fog = new THREE.Fog(0x801537, 0, 15);
	// Set up the Camera
	camera = new THREE.PerspectiveCamera(30, W / H, 1, 100);
	camera.position.set(0.6, 2.5, 7.5);
	camera.rotation.set(0, 0.157, 0);
	startTime = new Date().getTime();
	MaxTime = document.getElementById("timer").max;
	// get Circle div
	Circle = document.getElementById("Circle");
	i = 250;
	o = 0.02;
	// Add assets to Scene
	scene.add(Character1);
	scene.add(Character2);
	// run the Scene
	scene_3_run();
}

function scene_3_draw() {
	function Timer() {
		var time = new Date().getTime() - startTime;
		var Timer = document.getElementById("timer");
		MaxTime = Timer.max - time;
		Timer.style.visibility="visible";
		Timer.value = MaxTime;
	}
	if (MaxTime > 0) {
		// update image
		requestAnimationFrame(scene_3_draw);
		// place Circle div on neck bone
		Circle.style.visibility = "visible";
		var red = (Math.sin(Date.now() * 0.005) * 128) + 188;
		Circle.style.left = window.innerWidth * 0.65 + (-Circle.offsetWidth / 2) +
			"px";
		Circle.style.top = window.innerHeight * 0.4 + (-Circle.offsetHeight / 2) +
			"px";
		Circle.style.height = Circle.style.width = ((Math.sin(Date.now() * o)) + (i /
			10)) + "vw";
		if (((((mouse.x || touch.x) * window.innerWidth) + window.innerWidth / 2) >
			window.innerWidth * 0.65 + (-Circle.offsetWidth / 2)) && ((((mouse.x ||
				touch.x) * window.innerWidth) + window.innerWidth / 2) < window.innerWidth *
			0.65 + (Circle.offsetWidth / 2)) && ((((mouse.y || touch.y) * window.innerHeight) +
			window.innerHeight / 2) > window.innerHeight * 0.4 + (-Circle.offsetHeight /
			2)) && ((((mouse.y || touch.y) * window.innerHeight) + window.innerHeight /
			2) < window.innerHeight * 0.4 + (Circle.offsetHeight / 2)) && clicking) {
			Circle.style.borderColor = "white";
			Circle.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
			i = i + 0.1;
			o = 10;
			// animate meshes
			THREE.AnimationHandler.update(clock.getDelta() * 0.05);
		} else {
			Circle.style.borderColor = "rgb(255," + Math.floor(red) + "," + Math.floor(
				red) + ")";
			Circle.style.backgroundColor = "transparent";
			i = i - (clock.getDelta() * 100);
			i--;
			o = 0.02;
			// animate meshes
			THREE.AnimationHandler.update(clock.getDelta() * 0.15);
		}
		if ((Circle.offsetWidth < (window.innerWidth * 0.03))) {
			MaxTime = 0;
			win = false;
		} else {
			Audio1.setVolume(1);
			Audio2.setVolume(1);
			Audio3.setVolume(1);
			win = true;
			Timer();
		}
		//move camera out
		camera.translateZ(0.008);
		camera.rotateZ(0.0008);
		// render scene
		renderer.render(scene, camera);
		// call windowresize script
		THREEx.WindowResize(renderer, camera);
	} else {
		scene.remove(Character1, Character2);
		Circle.style.visibility = "hidden";
		if (win) {
			scene_4_intro_setup();
			return;
		} else {
			scene_2_setup();
			return;
		}
	}
}

function scene_3_run() {
	// launch the scene and draw it on screen
	scene_3_draw();
}