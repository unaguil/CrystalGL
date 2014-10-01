var gl = null; // global variable to store WebGL context

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

function initWebGL(canvas) {
	var gl = null;
	
	try {
		// Try to grab the standard context. If it fails, fallback to experimental.
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	} catch(e) {}
	
	// If we don't have a GL context, give up now
	if (!gl) {
		alert("Unable to initialize WebGL. Your browser may not support it.");
		gl = null;
	}
	
	return gl;
}

function start(do_callback) {
	var canvas = document.getElementById("glcanvas");

	gl = initWebGL(canvas);      // Initialize the GL context
	
	// Only continue if WebGL is available and working
	if (gl) {
		do_callback(gl);
	}
}

function getShader(gl, id) {
	var shaderScript, theSource, currentChild, shader;
	
	shaderScript = document.getElementById(id);
	
	if (!shaderScript) {
		return null;
	}
	
	theSource = "";
	currentChild = shaderScript.firstChild;
	
	while(currentChild) {
		if (currentChild.nodeType == currentChild.TEXT_NODE) {
			theSource += currentChild.textContent;
		}
		
		currentChild = currentChild.nextSibling;
	}

	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		 // Unknown shader type
		 return null;
	}

	gl.shaderSource(shader, theSource);
		
	// Compile the shader program
	gl.compileShader(shader);  
		
	// See if it compiled successfully
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
			alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));  
			return null;  
	}
		
	return shader;
}

function setMatrixUniforms() {
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	gl.uniformMatrix4fv(pUniform, false, pMatrix);

	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	gl.uniformMatrix4fv(mvUniform, false, mvMatrix);
}