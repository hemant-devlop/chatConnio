import config from "../../config/index.js";
import ApiError from "../../error/errorHelper.js";
import { connectDb, disconnectDb } from "./database.connection.js";
import { registerMongooseEvents } from "./database.events.js";
import { getDatabaseHealth } from "./database.helth.js";

class DatabaseManager {
    isConnected = false;

    async initialize() {
        if (this.isConnected) {
            return;
        }

        registerMongooseEvents();

        let attempts = 0;
        while (attempts < config.database.db_retry) {
            try {
                await connectDb();

                this.isConnected = true;

                return;
            } catch (error) {
                attempts++;

                console.log(
                    `Database Connection Failed (${attempts}/${config.database.db_retry})`
                );

                if (attempts >= config.database.db_retry) {

                 throw new ApiError(500,'database error',error)

                }

                await new Promise(resolve =>
                    setTimeout(resolve, config.database.db_retry)
                );
            }
        }
    }

    async disconnect(){
        if(!this.isConnected){
            return;
        }
        await disconnectDb();
         this.isConnected=false;
         return;
    }

    helth(){
        return getDatabaseHealth()
    }

    get isDbConnected(){
        return this.isConnected;
    }
}

export const database = new DatabaseManager()
