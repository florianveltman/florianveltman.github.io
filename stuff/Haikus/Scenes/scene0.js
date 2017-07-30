var Start;

function scene_0_setup() {
	// prevent click from previous scene to pass through
	clicking = false;
	// Set up the Scene colors
	renderer.setClearColor(0x000000);
	// Set up the Camera
	camera = new THREE.PerspectiveCamera(30, W / H, 1, 10);
	camera.position.set(2, 0, 0);
	camera.rotation.set(0, 1, 2);
	// Start button
	document.getElementById("timer")
		.style.visibility = "hidden";
	Start = document.getElementById("Start");
	Start.style.visibility = "visible";
	Start.style.left = (window.innerWidth / 2) - (Start.offsetWidth / 2) + "px";
	Start.style.top = (window.innerHeight / 2) - (Start.offsetHeight / 2) + "px";
	// run the Scene
	scene_0_run();
}

function scene_0_draw() {
	// update image
	if (clicking) {
		document.getElementById("timer")
			.style.visibility = "visible";
		Start.style.visibility = "hidden";
		scene_1_setup();
	} else {
		requestAnimationFrame(scene_0_draw);
	}
	// render scene
	renderer.render(scene, camera);
	// call windowresize script
	THREEx.WindowResize(renderer, camera);
	// animate meshes
	THREE.AnimationHandler.update(clock.getDelta() * 0.15);
}

function scene_0_run() {
	scene_0_draw();
}