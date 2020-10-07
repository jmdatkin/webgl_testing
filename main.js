const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;

window.onload = function() {

    // const MTX = {
    //     translation: function(tx,ty) {
    //         return [
    //             1, 0, 0,
    //             0, 1, 0,
    //             tx,ty,1
    //         ];
    //     },

    //     rotation: function(angle,axis) {
    //         var c = Math.cos(angle);
    //         var s = Math.sin(angle);
    //         switch(axis) {
    //         case 'x':
    //             return [1,0,0,
    //                     0,c,-s,
    //                     0,s,c];
    //         case 'y':
    //             return [c,0,s,
    //                     0,1,0,
    //                     -s,0,c];
    //         case 'z':
    //             return [c,-s,0,
    //                     s,c,0,
    //                     0,0,1];
    //         default:
    //             console.log("improper axis");
    //             return;
    //         }
    //     },

    //     scaling: function(sx,sy) {
    //         return [
    //             sx,0,0,
    //             0,sy,0,
    //             0,0,1
    //         ];
    //     }
    // };

    const MTX = {
        translation: function(tx,ty) {
            return glMatrix.mat3.fromValues(
                1, 0, 0,
                0, 1, 0,
                tx,ty,1
            );
        },

        rotation: function(angle,axis) {
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            switch(axis) {
            case 'x':
                return glMatrix.mat3.fromValues(1,0,0,
                        0,c,-s,
                                                0,s,c);
            case 'y':
                return glMatrix.mat3.fromValues(c,0,s,
                        0,1,0,
                                                -s,0,c);
            case 'z':
                return glMatrix.mat3.fromValues(c,-s,0,
                        s,c,0,
                                                0,0,1);
            default:
                console.log("improper axis");
                return;
            }
        },

        scaling: function(sx,sy) {
            return glMatrix.mat3.fromValues(
                sx,0,0,
                0,sy,0,
                0,0,1
            );
        }
    };

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


    //Vertex shader
    const vsSource = `
attribute vec3 a_position;
varying lowp vec4 vertexColor;
attribute vec3 a_vertColor;
uniform vec2 u_offset;
uniform mat3 u_matrix;
uniform vec2 u_rotation;
uniform float theta;
float theta2 = -0.5;
void main() {

gl_Position = vec4(u_matrix*a_position, 1.0);

vertexColor = vec4(a_vertColor,1.0);
}`;

    //Fragment shader
    const fsSource = `varying lowp vec4 vertexColor;
//attribute vec3 a_vertColor;
void main() {
gl_FragColor = vertexColor;//vec4(a_vertColor,1.0);
}`;

    var cube = genCubeGeom(-0.5,-0.5,-0.5,
                           1.0, 1.0, 1.0);
    
    Chem.bindCanvas(document.getElementById("canv"));
    Chem.initGLProps();

    var minDim = Math.min(window.innerWidth,window.innerHeight);
    Chem.resize(minDim,minDim);

    window.onresize = () => {minDim = Math.min(window.innerWidth, window.innerHeight);console.log(minDim);Chem.resize(minDim,minDim);};


    Chem.VertexBuffer.init();
    Chem.VertexBuffer.bufferData(cube);

    Chem.shader.attachSource(vsSource,fsSource);;
    //Chem.shader.attachSource(testVs,testFs);
    Chem.shader.useProgram();


    Chem.VertexAttrib.newVertexAttrib("a_position",3,Chem.gl.FLOAT,true,0,0);

    Chem.VertexAttrib.newVertexAttrib("a_vertColor",3,Chem.gl.FLOAT,false,6*4,3*4);
    //var location = Chem.gl.getAttribLocation(Chem.shader.ID, "a_position");
    //Chem.gl.vertexAttribPointer(location,3,Chem.gl.FLOAT,false,0,0);
    //Chem.gl.enableVertexAttribArray(location);


    Chem.clear();

    var mouseVector = glMatrix.vec2.create();
    var px,py;


    var wrapper = document.querySelector(".wrapper");

    var mouseDown = function(e) {
       // glMatrix.mat3.identity(tempMtx);
        px = e.pageX;
        py = e.pageY;
        wrapper.addEventListener("mousemove",mouseMove);
    };

    var mouseMove = function(e) {
        mouseVector = glMatrix.vec2.fromValues(mouseTransform(e.pageX-px),
                                               mouseTransform(e.pageY-py));
       
        console.log(mouseVector);
    };

    var mouseUp = function() {
        wrapper.removeEventListener("mousemove",mouseMove);
        glMatrix.vec2.copy(mouseVector,zeroVector);
    };

    Chem.canvas.addEventListener("mousedown",mouseDown);
    wrapper.addEventListener("mouseup",mouseUp);

    var mouseTransform = (n) => Math.cbrt(n)/100;

    var rotInertia = glMatrix.vec2.create();
    var rotBuf = glMatrix.vec2.create();
    var tempMtx = glMatrix.mat3.create();
    var rotMtx = glMatrix.mat3.create();
    var zeroVector = glMatrix.vec2.create();
    Chem.Actions.addAction((timestamp) => {
        glMatrix.vec2.add(rotInertia,rotInertia,mouseVector);
        glMatrix.vec2.min(rotInertia, rotInertia, glMatrix.vec2.fromValues(0.2,0.2));
        glMatrix.vec2.lerp(rotInertia,rotInertia,zeroVector,0.08);
        glMatrix.vec2.multiply(rotBuf,rotBuf,rotInertia);
        var rotX = MTX.rotation(rotInertia[0],'y');
        var rotY = MTX.rotation(rotInertia[1],'x');
        glMatrix.mat3.multiply(tempMtx,rotX,rotY);
        glMatrix.mat3.multiply(rotMtx,rotMtx,tempMtx);
        //glMatrix.mat3.multiply(rotMtx,rotMtx,rotMtx);
        Chem.Uniform.setMat3fv("u_matrix",rotMtx);
    });

    Chem.Loop.start();

};
