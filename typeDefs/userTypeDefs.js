const gql = require('graphql-tag')

const userTypeDefs = gql`

type Query {
  currentUser: User
}

type User {
  id: ID
  username: String!
  email: String!
  password: String!
}

type AuthPayload {
  token: String!
  user: User!
}



type Mutation {
  signup(username: String!, email: String!, password: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
}

`

module.exports = userTypeDefs;
