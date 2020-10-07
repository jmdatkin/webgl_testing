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
    var geom = [];
    //Front face
    geom.push(x0,y0,z0);
    geom.push(x1,y0,z0);
    geom.push(x0,y1,z0);
    
    geom.push(x1,y0,z0);
    geom.push(x1,y1,z0);
    geom.push(x0,y1,z0);
    
    geom.push(x0,y0,z0);
    geom.push(x0,y0,z0);
    geom.push(x0,y0,z0);
    
    geom.push(x0,y0,z0);
    geom.push(x0,y0,z0);
    geom.push(x0,y0,z0);
    
    geom.push(x0,y0,z0);
    geom.push(x0,y0,z0);
    geom.push(x0,y0,z0);
    
    geom.push(x0,y0,z0);
    geom.push(x0,y0,z0);
    geom.push(x0,y0,z0);
    
    geom.push(x0,y0,z0);
}
