window.onload = function() {
    const width = 0.7;
    const height = 1.7;
    const length = 1.0;

    const centerX = 0.0;
    const centerY = 0.0;
    const centerZ = 0.0;

    const vertTest = [
        -1.5,-0.5,0.0,
        0.5,-0.5,0.0,
        0.0,0.5,0.0
    ];

    const vert2 = [
        -width/2, 0.0, length/2, 1.0, 0.0, 0.0,
        width/2, 0.0, length/2, 0.0, 1.0, 0.0,
        0.0, height, 0.0, 0.5, 0.0, 1.0,

        -width/2, 0.0, length/2, 0.5, 0.5, 0.0,
        -width/2, 0.0, -length/2, 0.25, 0.75, 0.0,
        0.0, height, 0.0, 0.0, 0.0, 1.0,

        -width/2, 0.0, -length/2, 1.0, 0.0, 0.0,
        width/2, 0.0, -length/2, 0.0, 1.0, 0.0,
        0.0, height, 0.0, 0.5, 0.0, 1.0,

        width/2, 0.0, -length/2, 0.0, 1.0, 0.0,
        width/2, 0.0, length/2, 1.0, 0.0, 0.0,
        0.0, height, 0.0, 0.0, 0.0, 1.0,

        //back1
        -width/2, 0.0, -length/2, 1.0, 0.0, 0.0,
        width/2, 0.0, -length/2, 0.0, 1.0, 0.0,
        width/2, 0.0, length/2, 0.0, 0.0, 1.0,

        //back2
        -width/2, 0.0, -length/2, 1.0, 0.0, 0.0,
        -width/2, 0.0, length/2, 0.0, 1.0, 0.0,
        width/2, 0.0, length/2, 0.0, 0.0, 1.0

    ];

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

    const testVs = `
attribute vec3 b_position;
void main() {
gl_Position = vec4(b_position,0.0);
}`

    const testFs = `
void main() {
gl_FragColor = vec4(1.0);
}`


    //Vertex shader
    const vsSource = `
attribute vec3 a_position;
varying lowp vec4 vertexColor;
attribute vec3 a_vertColor;
uniform vec2 u_offset;
uniform float theta;
float theta2 = -0.5;
void main() {
vec3 rotVec = vec3(a_position.x*cos(theta) + a_position.z*sin(theta),
a_position.y,
a_position.x*-1.*sin(theta) + a_position.z*cos(theta));

rotVec = vec3(rotVec.x,
rotVec.y*cos(theta2)+rotVec.z*-1.*sin(theta2),
rotVec.y*sin(theta2) + rotVec.z*cos(theta2));

gl_Position = vec4(rotVec+vec3(u_offset,0.0),1.0);
vertexColor = vec4(a_vertColor,1.0);
//vertexColor = gl_Position + vec4(u_offset,0.0,0.0);//vec4(0.5,0.0,0.0,0.1);
//vertexColor = vec4(0.1,0.5,0.0,1.0);
}`;

    //Fragment shader
    const fsSource = `varying lowp vec4 vertexColor;
//attribute vec3 a_vertColor;
void main() {
gl_FragColor = vertexColor;//vec4(a_vertColor,1.0);
}`;

    Chem.bindCanvas(document.getElementById("canv"));
    Chem.initGLProps();

    Chem.resize(800,600);


    Chem.VertexBuffer.init();
    Chem.VertexBuffer.bufferData(vert2);

    Chem.shader.attachSource(vsSource,fsSource);;
    //Chem.shader.attachSource(testVs,testFs);
    Chem.shader.useProgram();
    Chem.VertexAttrib.newVertexAttrib("a_position",3,Chem.gl.FLOAT,true,6*4,0);

    Chem.VertexAttrib.newVertexAttrib("a_vertColor",3,Chem.gl.FLOAT,false,6*4,3*4);
    //var location = Chem.gl.getAttribLocation(Chem.shader.ID, "a_position");
    //Chem.gl.vertexAttribPointer(location,3,Chem.gl.FLOAT,false,0,0);
    //Chem.gl.enableVertexAttribArray(location);


    Chem.clear();

    //Chem.Uniform.setFloat2v("u_offset", [0.0,-1.0]);
    Chem.Uniform.setFloat("theta", 0.0);
    Chem.Actions.addAction((timestamp) => {
        var theta = timestamp/1000;
        Chem.Uniform.setFloat("theta",theta);
        Chem.Uniform.setFloat2v("u_offset",[Math.sin(timestamp/1000),-0.6]);
    });

    Chem.Loop.start();

};
