var Chem = (function(_Chem) {

    //VERTEX BUFFER
    var _VertexBuffer = {};
    _VertexBuffer.init = function() {
        const buffer = _Chem.gl.createBuffer();
        _Chem.gl.bindBuffer(_Chem.gl.ARRAY_BUFFER, buffer);
        //_Chem.gl.deleteBuffer(buffer); 
    };

    //Expects array of vertex data
    _VertexBuffer.bufferData = function(vertices) {
        _Chem.gl.bufferData(_Chem.gl.ARRAY_BUFFER,
                            new Float32Array(vertices),
                            _Chem.gl.STATIC_DRAW);
    };


    //VERTEX ATTR
    var _VertexAttrib = {};

    _VertexAttrib.newVertexAttrib = function(name,size,type,normalized,stride,offset) {
        if (!_Chem.shader.isLinked())
            alert("[VertexAttrib] Error: shader program is not linked "+_Chem.gl.getProgramInfoLog(_Chem.shader.ID));
        const location = _Chem.gl.getAttribLocation(_Chem.shader.ID, name);
        _Chem.gl.vertexAttribPointer(location,size,type,normalized,stride,offset);
        _Chem.gl.enableVertexAttribArray(location);
    };


    var _Uniform = {};

    const getLoc = (name) => _Chem.gl.getUniformLocation(_Chem.shader.ID,name);

    _Uniform.setFloat = function(name,value) {
        _Chem.gl.uniform1f(getLoc(name),value);
    };

    _Uniform.setFloat2v = function(name,value) {
        _Chem.gl.uniform2fv(getLoc(name),value);
    };

    _Uniform.setMat3fv = function(name,value) {
        _Chem.gl.uniformMatrix3fv(getLoc(name),false,value);
    };

    _Chem.VertexBuffer = _VertexBuffer;
    _Chem.VertexAttrib = _VertexAttrib;
    _Chem.Uniform = _Uniform;

    return _Chem;
})(Chem || {});
