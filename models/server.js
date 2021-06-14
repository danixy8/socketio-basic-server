//servidor express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors/');

class Server {
      
    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer(this.app);

        // configuraciones de sockets
        this.io = socketio(this.server, { /* configuraciones */});

        this.corsOptions = {
            origin: 'https://socket-basic-demo.netlify.app/',
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        }

    }

    middlewares(){
        //desplegar el directorio publico
        this.app.use( express.static(path.resolve(__dirname, '../public') ) );

        //CORS
        this.app.use( cors(this.corsOptions) );
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