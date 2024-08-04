const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { resolveProduct } = require('./resolvers');

// Define the schema using gql tag
const typeDefs = gql`
   type Query {
    checkout: Checkout
  }
  
  type Checkout {
    product: Product
    shippingOptions: [Shipping]
    tax: Tax
    membership: Membership
  }

  type Product {
    name: String
    price: String
    count: Int
    color: String
  }

  type Shipping {
    name: String
    price: String
    eta: String
  }

  type Tax {
    price: String
    isInclude: Boolean
  }

  type Membership {
    isMember: Boolean
    coins: String
  }
`;

// Define resolvers
const resolvers = {
    Query: {
        checkout: () => ({
            product: resolveProduct
        })
    },
};


// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Create Express app
const app = express();
const cors = require('cors');
app.use(cors());

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer();