import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import MasterRouter from './routers/MasterRouter';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

dotenv.config({
  path: '.env'
});

/**
 * Connecting to database
 */
mongoose.connect(process.env.DB_CONN_STRING || "");
const db = mongoose.connection

db.on("error", (err) => { console.error(err) })
db.once("open", () => { console.log("DB started successfully") })

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
  public router = MasterRouter;
  public jsonParser = bodyParser.json()
  public urlencodedParser = bodyParser.urlencoded({ extended: false })
}

// initialize server app
const server = new Server();

// make server app handle any route starting with '/api'
server.app.use('/api', server.jsonParser, server.router);

// make server listen on some port
((port = process.env.PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();