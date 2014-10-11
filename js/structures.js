
var CrystalGL = CrystalGL || {};

function createDefaultBase() {
	var geometry = new THREE.SphereGeometry(0.025, 16, 16);
	var material = new THREE.MeshBasicMaterial({color: 0xFFFF00});
	var sphere = new THREE.Mesh(geometry, material);

	return sphere;
}

function createAxis(label, direction) {
	var axis = new THREE.ArrowHelper(
		direction, 
		new THREE.Vector3(0, 0, 0),
		1, 
		0x0000FF
	);

  	var label = new THREE.Mesh(
  		new THREE.TextGeometry(label, { size: 0.1, height: 0.05 }), 
  		new THREE.MeshNormalMaterial({color: 0x0000FF})
	);

	//axis.add(label);

	label.position.set(-0.1, 0.1, 0);

	label.rotation.set(0, 0, degToRad(90));

	return axis;
}

function walkLattice(vectors, minN, maxN, pointFunc, funcData) {
	for (i = minN; i <= maxN; i++) {
		for (j = minN; j <= maxN; j++) {
			for (k = minN; k <= maxN; k++) {
				var point = vectors[0].clone().multiplyScalar(i);
				point.add(vectors[1].clone().multiplyScalar(j));
				point.add(vectors[2].clone().multiplyScalar(k));
				
				pointFunc(point, funcData);
			}
		}
	}
}

function walkPrimitiveCell(vectors, pointFunc, funcData) {
	walkLattice(vectors, 0, 1, pointFunc, funcData);
}

function savePoints(point, savedPoints) {
	savedPoints.push(point);
}

function addBase(point, lattice) {
	var base = createDefaultBase(); // object mesh should be shared
	lattice.add(base);
	base.position.copy(point);
}

CrystalGL.Structure = function(name, a1, a2, a3) {
	this.name = name;
	this.a = [ a1, a2, a3 ];

	this.mainObj = new THREE.Object3D();

	this.axes = new THREE.Object3D();

	this.tooglePrimitives = function() {
		this.axes.visible = !this.axes.visible;
	}

	this.axes.add(createAxis("a1", this.a[0]));
	this.axes.add(createAxis("a2", this.a[1]));
	this.axes.add(createAxis("a3", this.a[2]));

	this.mainObj.add(this.axes);

	this.lattice = new THREE.Object3D();
	walkLattice(this.a, -1, 1, addBase, this.lattice);

	this.mainObj.add(this.lattice);

	var primitiveCellPoints = [];
	walkPrimitiveCell(this.a, savePoints, primitiveCellPoints);

	console.log(primitiveCellPoints);

	this.getObject3D = function() {
		return this.mainObj;
	}  

	this.toogleLattice = function() {
		this.lattice.visible = !this.lattice.visible;
	} 
}

CrystalGL.createSC = function() {
	a1 = new THREE.Vector3(1, 0, 0);
	a2 = new THREE.Vector3(0, 1, 0);
	a3 = new THREE.Vector3(0, 0, 1);
	return new CrystalGL.Structure("Simple Cubic", a1, a2, a3); 
}

function degToRad(deg) {
	return 2 * Math.PI * deg / 360;
}