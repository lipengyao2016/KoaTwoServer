var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString} = require('graphql');
const common = require('../common');
const request = common.request;


const books = [
    {
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
        merchantHref:'http://192.168.7.210:5006/api/v1.0.0/merchants/XG0kPVMoNL8djloC3tGJXQ',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
        merchantHref:'http://192.168.7.210:5006/api/v1.0.0/merchants/nlYZxGo88irDXxgewi8uwQ',
    },
];


function getBooks(id) {

    if(id != null)
    {
        let singleBook = books[id];
        console.log(singleBook);
        let bookArrays = [];
        bookArrays.push(singleBook);
        return bookArrays;
    }
    else
    {
        return books;
    }

}

const typeDefs = `
  type Query { 
  books(id:Int): [Book]   resolveFunc:
  }
  
  type Book { title: String resolveFunc:, author: String resolveFunc:, merchant: Merchant  resolveFunc: }
  
  type Merchant { name: String resolveFunc:, id: String,companyName: String }
`;

var schema = buildSchema(typeDefs);

var root = {
    books: ({id},b,c,d) => {
      return getBooks(id);
    },

    merchant:(Book) => {
        return request.getRequest(Book.merchantHref)( ( { res, body} )=>{
            console.log('bankAccount test get   :' + JSON.stringify(body));
            return body;
        });
    },
};



graphql(schema, '{ books(id:1){title author merchant{id name companyName } } }', root).then((response) => {

    let curData = schema;

    console.log(JSON.stringify(response,null,2));
});



