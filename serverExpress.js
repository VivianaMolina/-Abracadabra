// 1. Crear un servidor con Express en el puerto 3000.

const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto ${PORT}`)
});

// 2. Definir la carpeta “assets” como carpeta pública del servidor

app.use(express.static("assets"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de 
//    la ruta /abracadabra/usuarios.
const nombres = {
    usuarios: [
        "Juan",
        "Jocelyn",
        "Astrid",
        "Maria",
        "Ignacia",
        "Javier",
        "Brian"
    ]
}

app.get("/abracadabra/usuarios", (req, res) => {
    res.json(nombres);
});

// 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el 
// usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en el servidor. 

app.use("/abracadabra/juego/:usuario", (req, res, next) => {

    const paramUsuario = req.params.usuario;

    let Auth = nombres.usuarios.includes(paramUsuario);

    Auth ? next()
        : res.sendFile(__dirname + '/assets/img/who.jpeg');

});

app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado 
//de forma aleatoria.
// En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort.

app.get("/abracadabra/conejo/:n", (req, res, next) => {

    const numRandom = Math.floor(Math.random() * (5 - 1)) + 1;

    const numero = req.params.n;

    numero == numRandom
        ? res.sendFile(__dirname + '/assets/img/conejito.jpg')
        : res.sendFile(__dirname + '/assets/img/voldemort.jpg')

});

// 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al 
// consultar una ruta que no esté definida en el servidor.

app.get("*", (req, res) => {
    res.send("<h2>Esta página no existe </h2>");
});