import mongoose from 'mongoose';
import express from 'express';
const app = express();
const port = 4000;

import User from './schemas/User';

mongoose.connect('mongodb+srv://alex:632748@cluster0.iqw5e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (_:any, res:any) => {
    res.send('Hello World!');

    const user = new User({
        email: 'hello@google.com',
        fullName: 'first user'
    });

    user.save().then(()=> console.log('user created!'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})