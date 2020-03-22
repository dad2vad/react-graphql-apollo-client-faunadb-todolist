#Todo list application using React, GraphQL, Apollo Client and FaunaDB

Used serverless database Fauna.

This project did not need a backend server running, only a Fauna Database connection through fauna.com

Most difficult part was the update cache function in the useMutation hook using Apollo client. FaunaDB's returned queries objects had different key names than usual.

Cool learning project using FaunaDB!

Live Demo: [https://react-graphql-apollo-client-faunadb-todolist.netlify.com/](https://react-graphql-apollo-client-faunadb-todolist.netlify.com/)