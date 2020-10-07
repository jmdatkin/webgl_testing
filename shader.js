var Chem = (function(_Chem) {

    var _Shader = {};

    _Shader.ID = null;
    //Helper fxn for compiling individual shader
    const loadShader = function(type,source) {
        const iShader = _Chem.gl.createShader(type);
        _Chem.gl.shaderSource(iShader,source);
        _Chem.gl.compileShader(iShader);
        if (!_Chem.gl.getShaderParameter(iShader, _Chem.gl.COMPILE_STATUS)) {
            alert("[Shader] Compilation error: "+_Chem.gl.getShaderInfoLog(iShader));
            _Chem.gl.deleteShader(iShader);
            return null;
        }
        return iShader;
    };



    //Side effects: updates shader program within instance
    _Shader.attachSource = function(vsSource, fsSource) {
        const vShader = loadShader(_Chem.gl.VERTEX_SHADER,vsSource);
        const fShader = loadShader(_Chem.gl.FRAGMENT_SHADER,fsSource);

        const program = _Chem.gl.createProgram();
        _Chem.gl.attachShader(program, vShader);
        _Chem.gl.attachShader(program, fShader);
        _Chem.gl.linkProgram(program);


        if (!_Chem.gl.getProgramParameter(program, _Chem.gl.LINK_STATUS)) {
            alert("[Shader] Unable to initialize the shader program: "+_Chem.gl.getProgramInfoLog(program));
            _Shader.ID = null;
        }
        else
            _Shader.ID = program;
        return _Shader.ID;
    };

    _Shader.useProgram = function() {
        console.log(_Shader.ID);
        if (_Shader.isLinked())
            _Chem.gl.useProgram(_Shader.ID);
        else
            alert("[Shader] Error: no shader program linked");
    };

    _Shader.isLinked = () => _Shader.ID != null;

    _Chem.shader = _Shader;
    return _Chem;
})(Chem || {});
