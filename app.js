const express = require('express')
const mongoose = require('mongoose')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const fs = require('fs');
const path = require('path');
require('dotenv').config()

const userTypeDefs = fs.readFileSync(path.join(__dirname, 'typeDefs/userTypeDefs.graphql'), 'utf-8');
const mailTypeDefs = fs.readFileSync(path.join(__dirname, 'typeDefs/mailTypeDefs.graphql'), 'utf-8');
const userResolver = require('./resolvers/userResolver');
const mailResolver = require('./resolvers/mailResolver');
const authenticateUser = require('./middleware/auth');
const PORT = process.env.PORT || 80002

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function startServer(){
    const server = new ApolloServer({
        typeDefs: [userTypeDefs,mailTypeDefs],
        resolvers: [userResolver,mailResolver],
        context: async ({ req }) => {
            await authenticateUser(req);
            return { user: req.user };
          },
      })

    await server.start()

    app.use('/graphql',expressMiddleware(server))
}

 startServer()
app.get('/',(req,res) =>{
    res.send('Home Page')
})

app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`)
})