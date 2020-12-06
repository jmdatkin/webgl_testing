window.onload = function() {
    const canvasEl = document.querySelector(".canvas-wrapper");

    const resize = () => {
    canvasEl.setAttribute("width",`${window.innerWidth}px`);
    canvasEl.setAttribute("height",`${window.innerHeight}px`);
    };

    resize();
    window.addEventListener("resize",resize);

    Chem(canvasEl);


    Chem.actions.add('a1', () => {
        Chem.uniforms.set("u_globalTime",Chem.time() / 1000);
        Chem.uniforms.set("u_offset",Chem.uniforms.get("u_offset").value.add(new THREE.Vector2(
            0.003,
            Math.sin(Chem.time()/100)*0.02+0.006)
        ));

        //Chem.uniforms.set("u_distort",Math.sin(((Math.sin(Chem.time()) * 3) - Chem.time()) / 3));
    });

    const gui = new dat.GUI({name: 'My GUI'});

    gui.add(Chem.uniforms.get('u_scale'),'value');
    gui.add(Chem.uniforms.get('u_distort'),'value');
};
 
 