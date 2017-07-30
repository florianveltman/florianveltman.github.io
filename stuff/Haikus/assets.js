
// contient tous les assets
var Audio1,
	Audio2,
	Silence;

var scene_4_animation;

function Assets() {
	
	Audio1 = new Sound("sounds/track1.mp3");
	Audio2 = new Sound("sounds/track2.mp3");
	Audio3 = new Sound("sounds/track3.mp3");
	Silence = new Sound("sounds/silence.mp3");
	
	var geometry, material;
	// SCENE 1 — PERSONNAGE
	Scene_1_character = new THREE.Object3D();
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load('Assets/scene1_character.dae', function(collada) {
		geometry = collada.scene;
		geometry.traverse(function(child) {
			if (child instanceof THREE.SkinnedMesh) {
				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();
			}
		});
		geometry.updateMatrix();
		Scene_1_character.add(geometry);
		Scene_1_character.position.set(0, 0.75, 1);
		Scene_1_character.scale.set(0.6, 0.7, 0.8);
	});
	// SCENE 1 — OBJET
	Scene_1_prop = new THREE.Object3D();
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load('Assets/scene1_prop.dae', function(collada) {
		geometry = collada.scene;
		geometry.traverse(function(child) {
			if (child instanceof THREE.SkinnedMesh) {
				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();
			}
		});
		geometry.updateMatrix();
		Scene_1_prop.add(geometry);
	});
	// SCENE 2 — VÉLO
	bike = new THREE.Object3D();
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load('Assets/bike_character.dae', function(collada) {
		geometry = collada.scene;
		geometry.traverse(function(child) {
			if (child instanceof THREE.SkinnedMesh) {
				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();
			}
		});
		geometry.updateMatrix();
		bike.add(geometry);
	});
	loader.load('Assets/bike_wheel1.dae', function(collada) {
		geometry = collada.scene;
		geometry.traverse(function(child) {
			if (child instanceof THREE.SkinnedMesh) {
				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();
			}
		});
		geometry.updateMatrix();
		bike.add(geometry);
	});
	loader.load('Assets/bike_wheel2.dae', function(collada) {
		geometry = collada.scene;
		geometry.traverse(function(child) {
			if (child instanceof THREE.SkinnedMesh) {
				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();
			}
		});
		geometry.updateMatrix();
		bike.add(geometry);
	});
	loader.load('Assets/bike_frame.dae', function(collada) {
		geometry = collada.scene;
		geometry.traverse(function(child) {
			if (child instanceof THREE.SkinnedMesh) {
				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();
			}
		});
		geometry.updateMatrix();
		bike.add(geometry);
	});
	loader.load('Assets/bike_pedals.dae', function(collada) {
		geometry = collada.scene;
		geometry.traverse(function(child) {
			if (child instanceof THREE.SkinnedMesh) {
				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();
			}
		});
		geometry.updateMatrix();
		bike.add(geometry);
	});
	bike.rotation.y = -Math.PI;
	// SCENE 2 — MARQUEUR
	geometry = new THREE.PlaneBufferGeometry(2.05, 0.05, 4, 4);
	material = new THREE.MeshBasicMaterial({
		shading: THREE.FlatShading,
		color: 0xffffff,
		side: THREE.DoubleSide
	});
	marker = new THREE.Mesh(geometry, material);
	marker.position.z = -1.17;
	marker.position.y = 0.00001;
	marker.rotation.x = -Math.PI / 2;
	// SCENE 2 — PARTICULES
	Particle = new THREE.Object3D();
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load('Assets/particle.dae', function(collada) {
		geometry = collada.scene;
		geometry.traverse(function(child) {
			if (child instanceof THREE.SkinnedMesh) {
				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();
			}
		});
		geometry.updateMatrix();
		Particle.add(geometry);
		Particle.scale.x = 5;
		Particle.scale.z = 5;
		Particle.scale.y = 5;
		Particle.position.z = -3;
		Particle.rotation.y = 1.57;
	});
	// SCENE 2 — SOL
	geometry = new THREE.PlaneBufferGeometry(50, 500, 4, 4);
	material = new THREE.MeshBasicMaterial({
		shading: THREE.FlatShading,
		color: 0x805b4d,
		side: THREE.DoubleSide
	});
	pavement = new THREE.Mesh(geometry, material);
	pavement.rotation.x = -Math.PI / 2;
	// SCENE 3 — PERSONNAGE 1
	Character1 = new THREE.Object3D();
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load('Assets/scene3_character1.dae', function(collada) {
		geometry = collada.scene;
		geometry.traverse(function(child) {
			if (child instanceof THREE.SkinnedMesh) {
				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();
			}
		});
		geometry.updateMatrix();
		Character1.add(geometry);
	});
	Character1.position.set(-1, -17, 0);
	Character1.rotation.set(0, -1, 0);
	// SCENE 3 — PERSONNAGE 2
	Character2 = new THREE.Object3D();
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load('Assets/scene3_character2.dae', function(collada) {
		geometry = collada.scene;
		geometry.traverse(function(child) {
			if (child instanceof THREE.SkinnedMesh) {
				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();
			}
		});
		geometry.updateMatrix();
		Character2.add(geometry);
	});
	Character2.position.set(-1, -17, 0);
	Character2.rotation.set(0, -1, 0);
	// SCENE 4 — PERSONNAGE + LETTRE
	Character3 = new THREE.Object3D();
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load('Assets/scene4_character.dae', function(collada) {
		geometry = collada.scene;
		geometry.traverse(function(child) {
			if (child instanceof THREE.SkinnedMesh) {
				scene_4_animation = new THREE.Animation(child, child.geometry.animation);
				scene_4_animation.loop = false;
			}
		});
		geometry.updateMatrix();
		Character3.add(geometry);
	});
	Character3.position.set(1, -14, -10);
	Character3.rotation.set(0.5, 0, -0.1);
	// SCENE 4 — INTRO
	Scene_4_intro = new THREE.Object3D();
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load('Assets/scene4_intro.dae', function(collada) {
		geometry = collada.scene;
		geometry.traverse(function(child) {
			if (child instanceof THREE.SkinnedMesh) {
				var animation = new THREE.Animation(child, child.geometry.animation);
				animation.play();
			}
		});
		geometry.updateMatrix();
		Scene_4_intro.add(geometry);
	});
}