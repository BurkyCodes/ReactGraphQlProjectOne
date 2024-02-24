const express = require('express');
require('dotenv').config()
const port = process.env.PORT || 5000;
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV === 'development'
}));

mongoose.connect(process.env.MONGO_URI);
mongoose.connection
    .once('open', () => console.log("Connected to mongo Db"))
    .on('error', (e) => console.log(`Failed with error ${e}`))


app.listen(port,console.log(`Server running on port ${port}`))