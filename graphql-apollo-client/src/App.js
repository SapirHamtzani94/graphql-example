import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

// Create Apollo Client
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

// Define query
const GET_CHECKOUT = gql`
  query GetCheckout {
    checkout {
      product {
        name
        price
        count
        color
      }
    }
  }
`;

// Checkout component
function CheckoutData() {
    const { loading, error, data } = useQuery(GET_CHECKOUT);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { checkout } = data;
    console.log('Checkout data: ', checkout);

    return (
        <ul>
            <li>{checkout.product.name}</li>
            <li>{checkout.product.price}</li>
            <li>{checkout.product.count}</li>
            <li>{checkout.product.color}</li>
        </ul>
    );
}

// App component
function App() {
    console.log('Inside App component');
    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Checkout Information</h1>
                <CheckoutData />
            </div>
        </ApolloProvider>
    );
}

export default App;