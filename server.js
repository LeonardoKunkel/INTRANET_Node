const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/db');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'
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
        
        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    
    routes() {
        
        this.app.use(this.paths.auth, require('./routes/auth.routes'));
        this.app.use(this.paths.buscar, require('./routes/buscar.routes'));
        this.app.use(this.paths.usuarios, require('./routes/usuario.routes'));
        this.app.use(this.paths.uploads, require('./routes/uploads.routes'));
    
    }
    
    listen() {
        this.app.listen( this.port, () => {
            console.log('Esta vivo');
        });
    }
}

module.exports = Server;
