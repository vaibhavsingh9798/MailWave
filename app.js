const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
require('dotenv').config()
const PORT = process.env.PORT || 80002

const app = express()
app.use(express.json())

async function startServer(){
    const server = new ApolloServer({
        typeDefs:`
        type Todo{
            id: ID!
            title: String!
        }

        type Query {
            getTodos : [Todo]
        }
        `,
        resolvers:{
            Query :{
                getTodos : () => [{id:1,title:'my name is vaibhav'}]
            }
        }
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