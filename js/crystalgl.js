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

	structure = new CrystalGL.createSC();
	scene.add(structure.getObject3D());	
}
			
function setupCamera() {
	camera = new THREE.PerspectiveCamera(35, CANVAS_WIDTH / CANVAS_HEIGHT, .1, 10000);
	camera.position.set(2.5, 2.5, 2.5);			
	camera.lookAt(scene.position);			
	scene.add(camera);

	controls = new THREE.OrbitControls(camera, renderer.domElement);
}
			
function addMesh() {	
	var material = new THREE.LineBasicMaterial({
		color: 0x0000ff
	});

	var geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3( -1, 1, -1 ),
			new THREE.Vector3( 1, 1, -1 ),
			new THREE.Vector3( 1, -1, -1 ),
			new THREE.Vector3( -1, -1, -1 ),
			new THREE.Vector3( -1, 1, -1 )
	);

	var back = new THREE.Line(geometry, material);

	var geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3( -1, 1, 1 ),
			new THREE.Vector3( 1, 1, 1 ),
			new THREE.Vector3( 1, -1, 1 ),
			new THREE.Vector3( -1, -1, 1 ),
			new THREE.Vector3( -1, 1, 1 )
	);

	var front = new THREE.Line(geometry, material);

	var geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3( -1, 1, -1 ),
			new THREE.Vector3( -1, 1, 1 ),
			new THREE.Vector3( 1, 1, 1 ),
			new THREE.Vector3( 1, 1, -1 ),
			new THREE.Vector3( -1, 1, -1 )
	);

	var top = new THREE.Line(geometry, material);
	
	var geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3( -1, -1, -1 ),
			new THREE.Vector3( -1, -1, 1 ),
			new THREE.Vector3( 1, -1, 1 ),
			new THREE.Vector3( 1, -1, -1 ),
			new THREE.Vector3( -1, -1, -1 )
	);

	var bottom = new THREE.Line(geometry, material);

	object = new THREE.Object3D();

	object.add(back);
	object.add(front);
	object.add(top);
	object.add(bottom);

	scene.add(object);
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
		default: 	console.log(e.keyCode); 
	};
}