'use strict';

const express = require('express');
const bodyParser = require('body-parser');

var _require = require('apollo-server-express');

const graphqlExpress = _require.graphqlExpress,
      graphiqlExpress = _require.graphiqlExpress;

var _require2 = require('graphql-tools');

const makeExecutableSchema = _require2.makeExecutableSchema;

// Some fake data

const books = [{
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling'
}, {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
}];

console.log(books[1]);

// The GraphQL schema in string form
const typeDefs = `
  type Query { books(id:Int): [Book] }
  type Book { title: String, author: String }
`;

function getBooks(id) {

    if (id != null) {
        let singleBook = books[id];
        console.log(singleBook);
        let bookArrays = [];
        bookArrays.push(singleBook);
        return bookArrays;
    } else {
        return books;
    }
}

// The resolvers
const resolvers = {
    Query: { books: (root, _ref, c, d) => {
            let id = _ref.id;

            return getBooks(id);
        } }
};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
});