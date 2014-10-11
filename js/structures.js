
var CrystalGL = CrystalGL || {};

function createDefaultBase() {
	var geometry = new THREE.SphereGeometry(0.025, 16, 16);
	var material = new THREE.MeshBasicMaterial({color: 0xFFFF00});
	var sphere = new THREE.Mesh(geometry, material);

	return sphere;
}

function createAxis(label, direction) {
	var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(direction);

  	var material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    var axis = new THREE.Line(geometry, material);

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

function createUnitCube() {
	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});
	var cube = new THREE.Mesh(geometry, material);

	return cube;
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

	this.unitCube = createUnitCube();

	this.mainObj.add(this.unitCube);
	this.unitCube.position.set(0.5, 0.5, 0.5);

	this.getObject3D = function() {
		return this.mainObj;
	}  

	this.toogleLattice = function() {
		this.lattice.visible = !this.lattice.visible;
	} 

	this.toogleUnitCube = function() {
		this.unitCube.visible = !this.unitCube.visible;
	}
}

CrystalGL.createSC = function() {
	a1 = new THREE.Vector3(1, 0, 0);
	a2 = new THREE.Vector3(0, 1, 0);
	a3 = new THREE.Vector3(0, 0, 1);
	return new CrystalGL.Structure("Simple Cubic", a1, a2, a3); 
}

CrystalGL.createBCC = function() {
	a1 = new THREE.Vector3(-0.5, 0.5, 0.5);
	a2 = new THREE.Vector3(0.5, -0.5, 0.5);
	a3 = new THREE.Vector3(0.5, 0.5, -0.5);
	return new CrystalGL.Structure("Body Centered Cubic", a1, a2, a3); 
}

CrystalGL.createFCC = function() {
	a1 = new THREE.Vector3(0, 0.5, 0.5);
	a2 = new THREE.Vector3(0.5, 0, 0.5);
	a3 = new THREE.Vector3(0.5, 0.5, 0);
	return new CrystalGL.Structure("Face Centered Cubic", a1, a2, a3); 
}

function degToRad(deg) {
	return 2 * Math.PI * deg / 360;
}