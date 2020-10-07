function Shader(self) {
    //Retrieve context reference from parent obj
    var chemGl = self.gl;
    //return function() {
    const _Shader = function() {
        _Shader.ID = null;
        //Helper fxn for compiling individual shader
        const loadShader = function(type,source) {
            const iShader = chemGl.createShader(type);
            chemGl.shaderSource(iShader,source);
            chemGl.compileShader();
            if (!chemGl.getShaderParameter(iShader, chemGl.COMPILE_STATUS)) {
                alert("[Shader] Compilation error: "+chemGl.getShaderInfoLog(iShader));
                chemGl.deleteShader(iShader);
                return null;
            }
            return iShader;
        };

        //Side effects: updates shader program within instance
        _Shader.attachSource = function(vsSource, fsSource) {
            const vShader = loadShader(chemGl.VERTEX_SHADER,vsSource);
            const fShader = loadShader(chemGl.FRAGMENT_SHADER,fsSource);

            const program = gl.createProgram();
            chemGl.attachShader(program, vShader);
            chemGl.attachShader(program, fShader);
            chemGl.linkProgram(program);

            if (!chemGl.getProgramParameter(program, gl.LINK_STATUS)) {
                alert("[Shader] Unable to initialize the shader program: "+chemGl.getProgramInfoLog(program));
                _Shader.ID = null;
            }
            else
                _Shader.ID = program;
            return _Shader.ID;
        };

        _Shader.useProgram = function() {
            if (_Shader.isLinked())
                chemGl.useProgram(_Shader.ID);
            else
                alert("[Shader] Error: no shader program linked");
        };

        _Shader.isLinked = () => _Shader.ID != null;
    };
    return _Shader;
}
