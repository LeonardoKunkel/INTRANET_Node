const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios'
        }
        
        this.conectarBD()
        
        this.middlewares();
        
        this.routes();
    }
    
    async conectarBD() {
        await dbConnection();
    }

    middlewares() {
    
        this.app.use( cors() );
        
        
        this.app.use( express.json() );
        
    }
    
    routes() {
        
        this.app.use(this.paths.auth, require('./routes/auth.routes'));
        this.app.use(this.paths.usuarios, require('./routes/usuario.routes'));
    
    }
    
    listen() {
        this.app.listen( this.port, () => {
            console.log('Esta vivo');
        });
    }
}

module.exports = Server;
