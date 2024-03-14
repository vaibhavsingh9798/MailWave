const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
require('dotenv').config()
const connectDB = require('./config/db')
const userTypeDefs =  require("./typeDefs/userTypeDefs")
const mailTypeDefs = require("./typeDefs/mailTypeDefs")
const userResolver = require('./resolvers/userResolver');
const mailResolver = require('./resolvers/mailResolver');
const { authenticateUser } = require('./middleware/auth');

const PORT = process.env.PORT || 80002

const app = express()
app.use(express.json())

connectDB();

async function startServer(){
    const server = new ApolloServer({
        typeDefs: [userTypeDefs,mailTypeDefs],
        resolvers: [userResolver,mailResolver],
        context: async ({ req }) => {
            const currentUser = await authenticateUser(req);
            return { currentUser };
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