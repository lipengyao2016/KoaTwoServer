'use strict';

var _require = require('graphql'),
    graphql = _require.graphql,
    buildSchema = _require.buildSchema;

const books = [{
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling'
}, {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
}];

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

const typeDefs = `
  type Query { books(id:Int): [Book] }
  type Book { title: String, author: String }
`;

var schema = buildSchema(typeDefs);

var root = { books: (_ref, b, c, d) => {
        let id = _ref.id;

        return getBooks(id);
    } };

/*graphql(schema, '{ books(id:1){title author} }', root).then((response) => {
    console.log(JSON.stringify(response,null,2));
});*/