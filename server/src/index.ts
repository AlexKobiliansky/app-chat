import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http';
import createRoutes from "./core/routes";
import createSocket from "./core/socket";

import "./core/db";

import dotenv from 'dotenv';

dotenv.config();
const app = express();
const http = createServer(app);
const io = createSocket(http);

createRoutes(app, io);

app.get('/socket', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

http.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})