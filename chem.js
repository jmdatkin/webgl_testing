//const Chem = (function(canvas) {
//function Chem(canvas) {
var Chem = (function(_Chem) {
    
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
        _Chem.gl.viewport(0,0,_Chem.canvas.width,_Chem.canvas.height);
    }

    _Chem.canvas = null;
    _Chem.gl = null;
    _Chem.width = null;
    _Chem.height = null;

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

    _Chem.initGLProps = function() {
        _Chem.gl.enable(_Chem.gl.DEPTH_TEST);
        _Chem.gl.clearColor(1.0, 0.95, 1.0, 1.0);
    };

    _Chem.clear = function() {
        _Chem.gl.clear(_Chem.gl.COLOR_BUFFER_BIT);
    };

    _Chem.draw = function() {
        _Chem.clear();
        _Chem.gl.drawArrays(_Chem.gl.TRIANGLES,0,18);
    };

    //User custom actions
    _Chem.Actions = (function() {
        var actions = [];

        var _Actions = {};
            _Actions.addAction = function(action) {
                actions.push(action);
            };

            _Actions.runAction = function(idx,timestamp) {
                actions[idx](timestamp);
            };

        _Actions.runAllActions = function(timestamp) {
                for (var i=0; i<actions.length; i++)
                    _Actions.runAction(i,timestamp);
            };

        return _Actions;
    })();


    //Loop control
    _Chem.Loop = (function() {
        var requestID, timestamp;

        var _Loop = {};//function() {
            _Loop.start = function() {
                const loop = (timestamp) => {
                    _Chem.Actions.runAllActions(timestamp);
                    _Chem.draw();
                    requestID = window.requestAnimationFrame(loop);
                };
                requestID = window.requestAnimationFrame(loop);
            };

            _Loop.stop = function() {
                window.cancelAnimationFrame(requestID);
            };

        return _Loop;
    })()
    return _Chem;
})(Chem || {});
