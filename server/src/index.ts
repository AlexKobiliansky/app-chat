import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import UserController from './controllers/UserController';
import DialogController from './controllers/DialogController';

const app = express();
const port = 4000;

app.use(bodyParser.json());

const User = new UserController();
const Dialog = new DialogController();

mongoose.connect('mongodb+srv://alex:632748@cluster0.iqw5e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.get('/user/:id', User.show);
app.post('/user/registration', User.create);
app.delete('/user/:id', User.delete);

app.get('/dialogs', Dialog.index);
app.post('/dialogs', Dialog.create);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})