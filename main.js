window.onload = function() {
    const getCanvasEl = () => document.getElementById("canv");
    const gl = getCanvasEl().getContext("webgl");
    function initCanvasStyle() {
        getCanvasEl().setAttribute("width",`${window.innerWidth}px`);
        getCanvasEl().setAttribute("height",`${window.innerHeight}px`);
    }

    function initGLProps() {
        gl.clearColor(1.0,1.0,1.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    // const vertices = [
    //     -0.5, -0.5, 0.0,
    //     0.5, -0.5, 0.0,
    //     0.0,0.5,0.0
    // ];
    // const vertices = [
    //     -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
    //     0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
    //     0.0,0.5,0.0, 0.0, 0.0, 1.0
    // ];
    const vertices = [
        //Front face
        -0.5, -0.5, 0.5, 1.0, 0.0, 0.0,
        0.5,  -0.5, 0.5, 0.0, 1.0, 0.0,
        0.0,0.5,0.0, 0.5, 0.0, 1.0,

        //Left face
        -0.5,-0.5,0.5, 0.5, 0.5, 0.0,
        -0.5, -0.5, -0.5, 0.25, 0.75, 0.0,
        0.0,0.5,0.0,  0.0,0.0,1.0,

        //Back face
        -0.5,-0.5,-0.5, 0.25, 0.75, 0.0,
        0.5,-0.5,-0.5, 0.33, 0.66, 0.0,
        0.0,0.5,0.0, 0.0, 0.0, 1.0,

        //Right face
        0.5, -0.5, -0.5, 0.6, 0.4, 0.0,
        0.5, -0.5, 0.5, 0.2, 0.3, 0.4,
        0.0, 0.5, 0.0, 0.0, 0.0, 1.0
    ];




    const vertColor = [
        1.0,0.0,0.0,
        0.0,1.0,0.0,
        0.0,0.0,1.0
    ];


    //Vertex shader
    const vsSource = `attribute vec3 a_position;
varying lowp vec4 vertexColor;
attribute vec3 a_vertColor;
uniform vec2 u_offset;
uniform float theta;
void main() {
vec3 rotVec = vec3(a_position.x*cos(theta) + a_position.z*sin(theta),
a_position.y,
a_position.x*-1.*sin(theta) + a_position.z*cos(theta));

gl_Position = vec4(rotVec,1.0);
vertexColor = vec4(a_vertColor,1.0);
//vertexColor = gl_Position + vec4(u_offset,0.0,0.0);//vec4(0.5,0.0,0.0,0.1);
//vertexColor = vec4(0.0,0.5,0.0,1.0);
}`;

    //Fragment shader
    const fsSource = `varying lowp vec4 vertexColor;
//attribute vec3 a_vertColor;
void main() {
gl_FragColor = vertexColor;//vec4(a_vertColor,1.0);
}`;

    var shaderProgram = Shader(gl, vsSource, fsSource);
    console.log(shaderProgram);

    gl.useProgram(shaderProgram);
     
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    //gl.bindBuffer(gl.ARRAY_BUFFER, null);
//    gl.bindBuffer(gl.ARRAY_BUFFER,buf);
    var positionLoc = gl.getAttribLocation(shaderProgram, "a_position");
    var vertColorLoc = gl.getAttribLocation(shaderProgram,"a_vertColor");

    var offsetLoc = gl.getUniformLocation(shaderProgram, "u_offset");
    var rotLoc = gl.getUniformLocation(shaderProgram,"theta");


    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, true, 6*4, 0);
    gl.vertexAttribPointer(vertColorLoc, 3, gl.FLOAT, false, 6*4,3*4);
    gl.enableVertexAttribArray(positionLoc);
    gl.enableVertexAttribArray(vertColorLoc);

    initCanvasStyle();
    gl.viewport(0,0,getCanvasEl().width, getCanvasEl().height);

    document.body.onmousemove = function(e) {
        // console.log(`${e.pageX}, ${e.pageY}`);
        gl.uniform2fv(offsetLoc, [e.pageX/1000, -1*e.pageY/1000]);
    };

    function draw(timestamp) {
        // console.log(timestamp);
        var theta = timestamp/1000;
        gl.uniform1f(rotLoc, theta);
        //gl.uniform2fv(offsetLoc, [Math.cos(1.0*scaling),Math.sin(2.0*scaling)]);
        initGLProps();
        gl.drawArrays(gl.TRIANGLES,0,12);
        window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);

};
