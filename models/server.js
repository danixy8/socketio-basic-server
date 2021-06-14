//servidor express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer(this.app);

        // configuraciones de sockets
        this.io = socketio(this.server, { /* configuraciones */});

    }

    middlewares(){
        //desplegar el directorio publico
        this.app.use( express.static(path.resolve(__dirname, '../public') ) );
    }

    socketsSettings(){
        new Sockets( this.io );
    }

    execute() {
        // inicializar middlewares
        this.middlewares();

        // inicializar sockets
        this.socketsSettings();

        // inicializar el server
        this.server.listen(this.port, () => {
            console.log(`servidor corriendo en el puerto: ${this.port}`)
        });
    }

}

module.exports = Server;