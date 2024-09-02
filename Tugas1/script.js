const canvas = document.getElementById('glCanvas');

const gl = canvas.getContext('webgl');


if(!gl){
    console.error('WebGL not supported, falling back on experimental-webgl');
    gl = canvas.getContext('experimental-webgl');
}


if(!gl) alert('Your browser does not support WebGL');


const vertices = new Float32Array([
    // Segitiga 1
    -0.9,  0.9, 
    -0.5,  0.3, 
    -0.9,  0.3, 

    // Segitiga 2
    0.9,  0.9, 
    0.9,  0.3, 
    0.5,  0.3, 

    // Segitiga 3
    -0.9, -0.5, 
    -0.5, -0.7, 
    -0.9, -0.7, 

    // Segitiga 4
    0.9, -0.5, 
    0.9, -0.7, 
    0.5, -0.7,
]);

const vertexBuffer = gl.createBuffer();


gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vertexShaderCode = `
    attribute vec2 coordinates;
    void main(void){
        gl_Position = vec4(coordinates, 0.0, 1.0);
    }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderCode);
gl.compileShader(vertexShader);

const fragmentShaderCode = `
    void main(void){
        gl_FragColor = vec4(0.0, 0.4, 0.8, 1.0);
    }
`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(fragmentShader, fragmentShaderCode);

gl.compileShader(fragmentShader);

const shaderProgram = gl.createProgram();

gl.attachShader(shaderProgram, vertexShader);

gl.attachShader(shaderProgram, fragmentShader);

gl.linkProgram(shaderProgram);

gl.useProgram(shaderProgram);

const coord = gl.getAttribLocation(shaderProgram, 'coordinates');

gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(coord);

gl.clearColor(1.0, 1.0, 1.0, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);