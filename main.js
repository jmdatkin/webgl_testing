window.onload = function() {
    const canvasEl = document.querySelector(".canvas-wrapper");

    const resize = () => {
    canvasEl.setAttribute("width",`${window.innerWidth}px`);
    canvasEl.setAttribute("height",`${window.innerHeight}px`);
    };

    resize();
    window.addEventListener("resize",resize);

    Chem(canvasEl);
};
 
