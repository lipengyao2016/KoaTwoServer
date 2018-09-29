const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');




const koaRouter = require('koa-router');
const koa = require('koa');
const koaBody = require('koa-bodyparser');
const { graphqlKoa ,graphiqlKoa } = require('apollo-server-koa');


const common = require('../common');
const request = common.request;


// Some fake data
const books = [
    {
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
        merchantHref:'http://192.168.7.210:5006/api/v1.0.0/merchants/XG0kPVMoNL8djloC3tGJXQ',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
        merchantHref:'http://192.168.7.210:5006/api/v1.0.0/merchants/XG0kPVMoNL8djloC3tGJXQ',
    },
];

console.log(books[1]);

// The GraphQL schema in string form
const typeDefs = `
  type Query { books(id:Int): Book }
  type Book { title: String, author: String,merchant: Merchant }
  type Merchant { name: String , id: String,companyName: String }
`;

function getBooks(id) {

    if(id != null)
    {
        let singleBook = books[id];
        console.log(singleBook);
        return singleBook;
    }
    else
    {
        return books[0];
    }


}


async function  getMerchants(data) {
    /*return {
        id:'234534',
        name:'kaifashang',
        companyName:'huawei',
    }*/

    let i = 0;

    let {res,body} = await request.getRequest(data.merchantHref);

    return body;
}

// The resolvers
const resolvers = {
    Query: { books: (root,{id},c,d)=> {
        return getBooks(id);
        } },
    Book:{
        merchant:async (book)=>await getMerchants(book),
    },
};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});


const app = new koa();
const router = new koaRouter();
const PORT = 3000;

// koaBody is needed just for POST.
app.use(koaBody());

app.use(function* (next){
    if(this.method == 'POST' || this.method == 'PUT'){
        console.log(this.request.body);
    }
    else if(this.method == 'GET')
    {
        console.log(this.query);
    }
    yield* next;
});

router.post('/graphql', graphqlKoa({
    schema: schema,
    context:
        {
        value: 'lishi',
    },
    rootValue:
        {
            name:'rootdd',
        }
}));


router.get('/graphql', graphqlKoa({ schema: schema }));

router.get('/graphiql', graphiqlKoa({
        endpointURL: '/graphql', // a POST endpoint that GraphiQL will make the actual requests to
    }),
);

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);

/*
// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
});*/
