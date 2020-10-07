function VertexBuffer(self) {
    const chemGl = self.gl;
    return function() {
        const buffer = chemGL.createBuffer();
        chemGl.bindBuffer(chemGl.ARRAY_BUFFER, buffer);
        chemGl.deleteBuffer(buffer);

        //Expects array of vertex data
        this.bufferData = function(vertices) {
            chemGl.bufferData(chemGl.ARRAY_BUFFER,
                              new Float32Array(vertices),
                              chemGl.STATIC_DRAW);
        };
    };
}

function VertexAttribs(self) {
    const chemGl = self.gl;

    const attribs = {};

    function VertexAttrib(name,size,type,normalized,stride,offset) {
        this.name = name;
        this.size = size;
        this.type = type;
        this.normalized = normalized;

        const location = chemGl.getAttribLocation(chemGl.shader.ID, name);
        const typeSize = TYPE_SIZES[type];
        chemGl.vertexAttribPointer(location,size,type,normalized,stride,offset);
    }


    return function() {
        this.newVertexAttrib = function(name,size,type,normalized,stride,offset) {
            const attrib = new VertexAttrib()
        };
    };
}
