
var CrystalGL = CrystalGL || {};

CrystalGL.Structure = function(name, a1, a2, a3) {
	this.name = name;
	this.a = [ a1, a2, a3 ];

	this.mainObj = new THREE.Object3D();

	this.axes = new THREE.Object3D();

	this.toogleDrawPrimitives = function() {
		this.axes.visible = !this.axes.visible;
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

	this.getObject3D = function() {
		return this.mainObj;
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