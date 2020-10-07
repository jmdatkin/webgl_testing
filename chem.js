// import VertexBuffer from 'vertexBuffer.js';
// import Shader from 'shader.js';

(function(module) {
    function VertexBuffer(self) {
        const chemGl = self.gl;
        return function() {
            const buffer = chemGl.createBuffer();
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

    function VertexAttrib(self) {
        const chemGl = self.gl;
        return function() {
            this.newVertexAttrib = function(name,size,type,normalized,stride,offset) {
                if (!chemGl.shader.isLinked())
                    alert("[VertexAttrib] Error: shader program is not linked "+chemGl.getProgramInfoLog(chemGl.shader.ID));
                const location = chemGl.getAttribLocation(chemGl.shader.ID, name);
                chemGl.vertexAttribPointer(location,size,type,normalized,stride,offset);
                chemGl.enableVertexAttribArray(location);
            };
        };
    }

    function Uniform(self) {
        const chemGl = self.gl;

        const getLoc = (name) => chemGl.glGetUniformLocation(chemGl.shader.ID,name);

        return function() {
            this.setFloat = function(name,value) {
                chemGl.glUniform1f(getLoc(name),value);
            };

            this.setFloat2v = function(name,value) {
                chemGl.glUniform2fv(getLoc(name),value);
            };
        };
    }

    //const _Chem = (function(canvas) {
    //function _Chem(canvas) {
    const _Chem = function(canvas) {
        //this = _Chem;
        console.log(this);
        _Chem.canvas = null;
        _Chem.gl = null;
        _Chem.width = null;
        _Chem.height = null;
        _Chem.shader = (() => {let s = Shader(_Chem); console.log(s); return s;})();
        console.log(_Chem.shader);
        _Chem.vertexBuffer = VertexBuffer(_Chem);
        _Chem.vertexAttrib = VertexAttrib(_Chem);
        _Chem.Uniform = Uniform(_Chem);

        function setGlContext() {
            _Chem.gl = _Chem.canvas.getContext("webgl");
        }

        //Helper fxn to set dims
        function updateDims(width,height) {
            _Chem.width = width;
            _Chem.height = height;
        }

        function updateCanvasSize() {
            _Chem.canvas.setAttribute("width",_Chem.width+"px");
            _Chem.canvas.setAttribute("height",_Chem.height+"px");
        }

        function updateGlViewport() {
            _Chem.gl.viewport(0,0,_Chem.width,_Chem.height);
        }

        //Updates stored canvas element
        _Chem.bindCanvas = function(canvas) {
            _Chem.canvas = canvas;
            setGlContext();
            updateDims(_Chem.canvas.getAttribute("width"),
                       _Chem.canvas.getAttribute("height"));
            updateGlViewport();
        };

        //Sets canvas size and GL viewport size
        _Chem.resize = function(width, height) {
            updateDims(width,height);
            updateCanvasSize();
            updateGlViewport();
        };

        _Chem.draw = function() {
            _Chem.gl.drawArrays(gl.TRIANGLES,0,18);
        };

        //User custom actions
        _Chem.Actions = (function() {
            var actions = [];

            var _Actions = function() {
                
                _Chem.addAction = function(action) {
                    actions.push(action);
                };

                _Chem.runAction = function(idx,timestamp) {
                    actions[idx]();
                };

                _Chem.runAllActions = function(timestamp) {
                    for (var i=0; i<actions.length; i++)
                        parent.runAction(i);
                };
            };

            return _Actions;
        })();


        //Loop control
        _Chem.Loop = (function(self) {
            var requestID, timestamp;

            var _Loop = function() {
                _Chem.start = function() {
                    const loop = (timestamp) => {
                        self.Actions.runAllActions(timestamp);
                        self.draw();
                        requestID = window.requestAnimationFrame(loop);
                    };
                    requestID = window.requestAnimationFrame(loop);
                };

                _Chem.stop = function() {
                    window.cancelAnimationFrame(requestID);
                };
            };

            return _Loop;
        })(_Chem);

        //Check if canvas arg passed
        if (typeof canvas !== 'undefined')
            _Chem.bindCanvas(canvas);
    };
    module.Chem = _Chem;
})(window);
