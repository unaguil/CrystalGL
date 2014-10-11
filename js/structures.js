
var CrystalGL = CrystalGL || {};

CrystalGL.Structure = function(name, a1, a2, a3) {
	this.name = name;
	this.a = [ a1, a2, a3 ];

	this.mainObj = new THREE.Object3D();

	this.axes = new THREE.Object3D();

	this.tooglePrimitives = function() {
		this.axes.visible = !this.axes.visible;
	}

	this.createLattice = function(maxN) {
		var lattice = new THREE.Object3D();

		for (i = -maxN; i <= maxN; i++) {
			for (j = -maxN; j <= maxN; j++) {
				for (k = -maxN; k <= maxN; k++) {
					var base = createDefaultBase(); // object mesh should be shared

					var pBase = this.a[0].clone().multiplyScalar(i);
					pBase.add(this.a[1].clone().multiplyScalar(j));
					pBase.add(this.a[2].clone().multiplyScalar(k));
					
					lattice.add(base);
					base.position.copy(pBase);
				}
			}
		}

		return lattice;
	}

	// prepare axis objects
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

	this.axes.add(createAxis("a1", this.a[0]));
	this.axes.add(createAxis("a2", this.a[1]));
	this.axes.add(createAxis("a3", this.a[2]));

	this.mainObj.add(this.axes);

	this.lattice = this.createLattice(1);

	this.mainObj.add(this.lattice);

	function createDefaultBase() {
		var geometry = new THREE.SphereGeometry(0.025, 16, 16);
		var material = new THREE.MeshBasicMaterial({color: 0xFFFF00});
		var sphere = new THREE.Mesh(geometry, material);

		return sphere;
	}

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