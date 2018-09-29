/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

var { graphql, buildSchema,GraphQLSchema, GraphQLObjectType,
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,GraphQLInt} = require('graphql');

const common = require('../common');
const request = common.request;

/**
 * This is designed to be an end-to-end test, demonstrating
 * the full GraphQL stack.
 *
 * We will create a GraphQL schema that describes the major
 * characters in the original Star Wars trilogy.
 *
 * NOTE: This may contain spoilers for the original Star
 * Wars trilogy.
 */

/**
 * Using our shorthand to describe type systems, the type system for our
 * Star Wars example is:
 *
 * enum Episode { NEWHOPE, EMPIRE, JEDI }
 *
 * interface Character {
 *   id: String!
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 * }
 *
 * type Human implements Character {
 *   id: String!
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 *   homePlanet: String
 * }
 *
 * type Droid implements Character {
 *   id: String!
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 *   primaryFunction: String
 * }
 *
 * type Query {
 *   hero(episode: Episode): Character
 *   human(id: String!): Human
 *   droid(id: String!): Droid
 * }
 *
 * We begin by setting up our schema.
 */

/**
 * The original trilogy consists of three movies.
 *
 * This implements the following type system shorthand:
 *   enum Episode { NEWHOPE, EMPIRE, JEDI }
 */

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


async function getBooks(id) {
   /* if(id != null)
    {
        var singleBook = books[id];
        console.log(singleBook);

        return singleBook;
    }
    else
    {
        return books;
    }*/

    let {res,body} = await request.getRequest('http://192.168.7.210:5003/api/v1.0.0/userOrganizations',{uuid:id});

    return body.items[0];

}

async function  getMerchants(data) {
    /*return {
        id:'234534',
        name:'kaifashang',
        companyName:'huawei',
    }*/

    let {res,body} = await request.getRequest(data.merchant.href);

    return body;
}


/**
 * We define our human type, which implements the character interface.
 *
 * This implements the following type system shorthand:
 *   type Human : Character {
 *     id: String!
 *     name: String
 *     friends: [Character]
 *     appearsIn: [Episode]
 *     secretBackstory: String
 *   }
 */
const bookType = new GraphQLObjectType({
  name: 'Book',
  description: 'A humanoid creature in the Star Wars universe.',
  fields: () => ({
      name: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The id of the human.',
    },
      status: {
      type: GraphQLString,
      description: 'The name of the human.',
    },
      merchant: {
      type: merchantType,
      description:
        'The friends of the human, or an empty list if they have none.',
      resolve: async (books) => await getMerchants(books),
    },
  }),
});

/**
 * The other type of character in Star Wars is a droid.
 *
 * This implements the following type system shorthand:
 *   type Droid : Character {
 *     id: String!
 *     name: String
 *     friends: [Character]
 *     appearsIn: [Episode]
 *     secretBackstory: String
 *     primaryFunction: String
 *   }
 */
const merchantType = new GraphQLObjectType({
  name: 'Merchant',
  description: 'A mechanical creature in the Star Wars universe.',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The id of the droid.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the droid.',
    },
      companyName: {
      type: GraphQLString,
      description:
        'The friends of the droid, or an empty list if they have none.',
    },
  }),
});

/**
 * This is the type that will be the root of our query, and the
 * entry point into our schema. It gives us the ability to fetch
 * objects by their IDs, as well as to fetch the undisputed hero
 * of the Star Wars trilogy, R2-D2, directly.
 *
 * This implements the following type system shorthand:
 *   type Query {
 *     hero(episode: Episode): Character
 *     human(id: String!): Human
 *     droid(id: String!): Droid
 *   }
 *
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    books: {
      type: bookType,
      args: {
        id: {
          description:
            'If omitted, returns the hero of the whole saga. If ' +
            'provided, returns the hero of that particular episode.',
          type: GraphQLString,
        },
      },
      resolve: async (root, {id}) => await getBooks(id),
    },

  }),
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
const merchantSchema = new GraphQLSchema({
  query: queryType,
  //types: [bookType,merchantType],
});


let uuid = 'ThAh2vlVJHcM2qCQ0FfirA';

const query = `
        query bookQuery {
          books(id:"ThAh2vlVJHcM2qCQ0FfirA"){
          name status merchant
          {
          id name companyName 
          } 
          }
        }
      `;
graphql(merchantSchema, query).then((response) => {

    let curData = merchantSchema;

    console.log(JSON.stringify(response,null,2));
});

