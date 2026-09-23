
import { initializeSocket } from './socket/index.js';
import config from './config/index.js';
import http from 'http'
import app from './app.js';
import { database } from './lib/database/database.manager.js';

const server = http.createServer(app);

initializeSocket(server);

async function bootstrap() {
    await database.initialize();

    new Promise((res)=>{
        server.listen(config.app.port,res)
    }) 

    console.log('app started on',config.app.port)
}

bootstrap().catch((error)=>{
    console.error('bootstrap app failed',error)
    process.exit(1)
})
