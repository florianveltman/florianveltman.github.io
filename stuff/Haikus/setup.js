if (!Detector.webgl) Detector.addGetWebGLMessage();
var camera, scene, renderer, clock, FadeOut, mobile;
var geometry, material, mesh, animation;
var level = 2,
	oldMouse = {
		x: 0,
		y: 0
	},
	oldTouch = {
		x: 0,
		y: 0
	},
	mouse = {
		x: 0,
		y: 0
	},
	touch = {
		x: 0,
		y: 0
	},
	MaxTime, W, H, win, startTime, Timer;

// Setting up the scene
function Setup() {
		document.body.style.overflow = "hidden";
		document.body.style.cursor = "none";
		clock = new THREE.Clock();
		W = window.innerWidth, H = window.innerHeight; // Width and Height variables.
		if (!Detector.webgl) {
			renderer = new THREE.CanvasRenderer;
			console.log("using CanvasRenderer");
		} else {
			renderer = new THREE.WebGLRenderer({antialias:true});
			console.log("using WebGLRenderer");
		}
		renderer.setSize(W, H); // Set renderer size to fill browser.
		document.body.appendChild(renderer.domElement); // attach Renderer to HTML Body.
		scene = new THREE.Scene();
		// detect if touch device or not
		if (Modernizr.touch) {
			mobile = true;
		} else {
			mobile = false;
		}
		Assets();
		scene_1_setup();
	}


// detecting mouse
if (!mobile) {
	var clicking, moving;
	var Cursor = document.getElementById("Cursor");
	Cursor.style.visibility = "visible";
	document.addEventListener("mousemove", function(event) {
		event.preventDefault();
		Cursor.style.top = (event.pageY - (Cursor.offsetHeight / 2)) + "px";
		Cursor.style.left = (event.pageX - (Cursor.offsetWidth / 2)) + "px";
		mouse.x = (event.pageX / window.innerWidth) - 0.5
		mouse.y = (event.pageY / window.innerHeight) - 0.5
		if (clicking) {
			moving = true;
		} else {
			moving = false;
		}
	}, false);
	document.addEventListener("mousedown", function(event) {
		clicking = true; 
		oldMouse.x = (event.pageX / window.innerWidth) - 0.5
		oldMouse.y = (event.pageY / window.innerHeight) - 0.5
		document.getElementById("ActiveCursor")
			.style.visibility = "visible";
	}, false);
	document.addEventListener("mouseup", function(event) {
		clicking = false;
		document.getElementById("ActiveCursor")
			.style.visibility = "hidden";
	}, false);
}


// detecting touch
document.body.addEventListener("touchstart", function(event) {
	event.preventDefault();
	oldTouch.x = (event.touches[0].pageX / window.innerWidth) - 0.5
	oldTouch.y = (event.touches[0].pageY / window.innerHeight) - 0.5
	Cursor.style.top = (event.touches[0].pageY - (Cursor.offsetHeight / 2)) +
		"px";
	Cursor.style.left = (event.touches[0].pageX - (Cursor.offsetWidth / 2)) +
		"px";
	document.getElementById("ActiveCursor")
		.style.visibility = "visible";
	document.getElementById("Cursor")
		.style.visibility = "visible";
	clicking = true;
	Silence.play();
});
document.body.addEventListener("touchmove", function(event) {
	event.preventDefault();
	touch.x = (event.touches[0].pageX / window.innerWidth) - 0.5
	touch.y = (event.touches[0].pageY / window.innerHeight) - 0.5
	Cursor.style.top = (event.touches[0].pageY - (Cursor.offsetHeight / 2)) +
		"px";
	Cursor.style.left = (event.touches[0].pageX - (Cursor.offsetWidth / 2)) +
		"px";
	document.getElementById("ActiveCursor")
		.style.visibility = "visible";
	document.getElementById("Cursor")
		.style.visibility = "visible";
	if (clicking) {
		moving = true;
	} else {
		moving = false;
	}
});
document.body.addEventListener("touchend", function(event) {
	event.preventDefault();
	document.getElementById("ActiveCursor")
		.style.visibility = "hidden";
	document.getElementById("Cursor")
		.style.visibility = "hidden";
	clicking = false;
});