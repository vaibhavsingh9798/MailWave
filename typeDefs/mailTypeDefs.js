const gql = require('graphql-tag')

const mailTypeDefs = gql`
type Mail {
  id: ID!
  sender: String!
  recipient: String!
  subject: String!
  body: String!
}

input CreateMailInput {
  sender: String!
  recipient: String!
  subject: String!
  body: String!
}

type Query {
  getAllMails: [Mail!]!
}

type Mutation {
  createMail(input: CreateMailInput!): Mail!
}

`

module.exports = mailTypeDefs
