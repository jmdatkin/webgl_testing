//Will generate array of vertex data
function diamondSquare(width,height,c1,c2,c3,c4) {
    var vertices = [];
    const arrWidth = Math.pow(2,width)+1;
    const arrHeight = Math.pow(2,height)+1;

    for (var i=0; i<arrHeight; i++) {
        vertices.push([]);
        for (var j=0; i<arrWidth; j++)
            vertices[i].push(0.0);
    }

    vertices[0][0] = c1;
    vertices[0][1] = c2;
    vertices[1][0] = c3;
    vertices[1][1] = c4;

    diamondSquareRecur(vertices,0,0,arrWidth,arrHeight,1.0);
}

function diamondSquareRecur(arr,x0,y0,x1,y1,randLimit) {
    //Square step
    let midX = Math.floor((x1-x0)/2);
    let midY = Math.floor((y1-y0)/2);
    let rand = Math.random()*randLimit;
    let avg = (
        arr[y0][x0]+
        arr[y0][x1]+
        arr[y1][x0]+
            arr[y1][x1])/4;

    arr[midY][midX] = avg+rand;

    //Diamond step
    let dmdMidX = Math.floor(midX/2);
    let dmdMidY = Math.floor(midY/2);
}
