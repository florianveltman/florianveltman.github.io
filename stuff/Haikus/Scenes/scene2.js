function scene_2_setup() {
	startTime = new Date().getTime();
	// prevent click from previous scene to pass through
	clicking = false;
	moving = false;
	// Set up the Scene colors
	renderer.setClearColor(0xff9b55);
	scene.fog = new THREE.Fog(0xff9b55, 0, 15);
	// Set up the Camera
	camera = new THREE.PerspectiveCamera(30, W / H, 1, 100);
	camera.position.set(0.6, 2.5, 7.8);
	camera.rotation.set(0, 0.157, 0);
	bike.rotation.z = -0.25;
	MaxTime = document.getElementById("timer").max;
	// Add assets to Scene
	scene.add(Particle);
	scene.add(bike);
	scene.add(marker);
	scene.add(pavement);
	// run the Scene
	scene_2_draw();
}

function scene_2_draw() {
	function Timer() {
		var time = new Date().getTime() - startTime;
		var Timer = document.getElementById("timer");
		MaxTime = Timer.max - time/2;
		Timer.style.visibility="visible";
		Timer.value = MaxTime;
	}
	
	if (win)
		Timer();
	
	if (MaxTime > 0) {
		// update image
		requestAnimationFrame(scene_2_draw);
		//move camera out
		camera.translateZ(0.007);
		// move particles for movement effect
		Particle.translateX(0.5);
		// render scene
		renderer.render(scene, camera);
		// call windowresize script
		THREEx.WindowResize(renderer, camera);
		//bike.rotation.z = bike.rotation.z + Math.sin(Date.now() * 0.007) * 0.01;
		if (!mobile) {
			if (moving) {
				bike.rotation.z = bike.rotation.z + ((mouse.x) * 0.1);
			}
			if (bike.rotation.z < 0) {
				bike.rotation.z = bike.rotation.z + (Math.sin(bike.rotation.z) / 50);
			}
			if (bike.rotation.z > 0) {
				bike.rotation.z = bike.rotation.z + (Math.sin(bike.rotation.z) / 50);
			}
		}
		if (mobile) {
			if (moving) {
				bike.rotation.z = bike.rotation.z + ((touch.x - oldTouch.x) * 0.1); // taking into account the fact that on a touch screen,
				// the user does not have a mouse, only gestures,
				// regardless of their position on screen.
			}
			if (bike.rotation.z < 0) {
				bike.rotation.z = bike.rotation.z + (Math.sin(bike.rotation.z) / 50);
			}
			if (bike.rotation.z > 0) {
				bike.rotation.z = bike.rotation.z + (Math.sin(bike.rotation.z) / 50);
			}
		}
		if (bike.rotation.z < -1.2 || bike.rotation.z > 1.2) {
			// game over!
			win = false;
			MaxTime = 0;
		} else {
			// animate meshes
			Audio1.setVolume(1);
			Audio2.setVolume(1);
			Audio3.setVolume(0);
			win = true;
			THREE.AnimationHandler.update(clock.getDelta() * 0.15);
		}
	} else {
		scene.remove(bike, pavement, Particle, marker);
		if (win) {
			scene_3_setup();
		} else {
			scene_1_setup();
			return;
		}
	}
}

function scene_2_run() {
	// launch the scene and draw it on screen
	scene_2_draw();
}