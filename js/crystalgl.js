var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT= 480;

renderer = null,
scene = null,
camera = null;

object = null;

function initWebGL() {
	setupRenderer();
	setupScene();
	setupCamera();
	renderer.render(scene, camera);

	window.addEventListener("keypress", doKeyPress, false);

	(function animLoop(){	
		updateGeometry();		
		renderer.render(scene, camera);	
		requestAnimationFrame(animLoop);
	})();
}

function setupRenderer() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);

	renderer.setClearColor(0x0F0F0F, 1.0);

	document.getElementById('glCanvas').appendChild(renderer.domElement);
}
		
function setupScene() {
	scene = new THREE.Scene();				
	//addMesh();
	addLight();

	structure = CrystalGL.createSC();
	scene.add(structure.getObject3D());	
}
			
function setupCamera() {
	camera = new THREE.PerspectiveCamera(35, CANVAS_WIDTH / CANVAS_HEIGHT, .1, 10000);
	camera.position.set(2.5, 2.5, 2.5);			
	camera.lookAt(scene.position);			
	scene.add(camera);

	controls = new THREE.OrbitControls(camera, renderer.domElement);
}	

function addLight() {
	var light = new THREE.PointLight(0xFFFFFF);
	light.position.set(20, 20, 20);
	scene.add(light);
}

function updateGeometry() {
	//object.rotation.y += 0.05;
}

function doKeyPress(e) {
	switch (e.keyCode) {
		case 118: 	structure.tooglePrimitives();
					break;

		case 108: 	structure.toogleLattice();
					break;

		case 117: 	structure.toogleUnitCube();
					break;

		default: 	console.log(e.keyCode); 
	};
}

function handleClick(button) {
    switch (button.id) {
		case 'sc-lattice': 	scene.remove(structure.getObject3D());
							structure = CrystalGL.createSC();
							scene.add(structure.getObject3D());
		break;

		case 'bcc-lattice': scene.remove(structure.getObject3D());
							structure = CrystalGL.createBCC();
							scene.add(structure.getObject3D());
		break;

		case 'fcc-lattice': scene.remove(structure.getObject3D());
							structure = CrystalGL.createFCC();
							scene.add(structure.getObject3D());
		break;
    }
}