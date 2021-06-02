import mongoose from "mongoose";

mongoose.connect('mongodb+srv://alex:632748@cluster0.iqw5e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});