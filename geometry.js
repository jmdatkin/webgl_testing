//Should accept one of WebGL types
function TypedArray(type) {
    this.type = type;
    this.values = [];
}

function Attribute(name,type) {
    this.name = name;
    this.array = new TypedArray(type);
}

function Geometry() {
    this.attributes = {}
    this.nVertices = Math.floor(vertices.length/3);
}

Geometry.prototype.addAttribute = function(name,type,values) {
    const attr = new Attribute(name,type);
    if (typeof values !== 'undefined')
        attr.array.values = values.slice();
    this.attributes[name] = attr;
};

function genCubeGeom(x0,y0,z0,w,h,l) {
    var x1 = x0+w,
        y1 = y0+h,
        z1 = z0+l;

    var geom = [];
    //Front face
    geom.push(x0,y0,z0);
    geom.push(x1,y0,z0);
    geom.push(x0,y1,z0);
    
    geom.push(x0,y1,z0);
    geom.push(x1,y0,z0);
    geom.push(x1,y1,z0);

    //Back face
    geom.push(x0,y0,z1);
    geom.push(x0,y1,z1);
    geom.push(x1,y1,z1);

    geom.push(x0,y0,z1);
    geom.push(x1,y0,z1);
    geom.push(x1,y1,z1);

    //Left face
    geom.push(x0,y0,z0);
    geom.push(x0,y1,z0);
    geom.push(x0,y1,z1);
    
    geom.push(x0,y0,z0);
    geom.push(x0,y1,z1);
    geom.push(x0,y0,z1);

    //Right face
    geom.push(x1,y0,z0);
    geom.push(x1,y1,z1);
    geom.push(x1,y1,z0);
    
    geom.push(x1,y0,z0);
    geom.push(x1,y0,z1);
    geom.push(x1,y1,z1);

    //Top face
    geom.push(x0,y0,z0);
    geom.push(x0,y0,z1);
    geom.push(x1,y0,z1);
    
    geom.push(x0,y0,z0);
    geom.push(x1,y0,z1);
    geom.push(x1,y0,z0);
    
    //Bottom face
    geom.push(x0,y1,z0);
    geom.push(x0,y1,z1);
    geom.push(x1,y1,z1);
    
    geom.push(x0,y1,z0);
    geom.push(x1,y1,z1);
    geom.push(x1,y1,z0);

    //var geometry = new Geometry();
    //geometry.addAttribute("a_pos",Chem.gl.FLOAT,geom);
    return geom;//etry;
}
