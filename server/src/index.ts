import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import UserController from './controllers/UserController';
import DialogController from './controllers/DialogController';
import MessageController from './controllers/MessageController';

import dotenv from 'dotenv';

import updateLastSeen from './middleware/updateLastSeen';
import checkAuth from './middleware/checkAuth';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(updateLastSeen);
app.use(checkAuth);

const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();

mongoose.connect('mongodb+srv://alex:632748@cluster0.iqw5e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.get('/user/:id', User.show);
app.post('/user/registration', User.create);
app.post('/user/login', User.login);
app.delete('/user/:id', User.delete);


app.get('/dialogs/:id', Dialog.index);
app.post('/dialogs', Dialog.create);
app.delete('/dialogs/:id', Dialog.delete);

app.get('/messages', Message.index);
app.post('/messages', Message.create);
app.delete('/messages/:id', Message.delete);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})