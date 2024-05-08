import { 
    ApolloClient, 
    InMemoryCache, 
    ApolloProvider, 
    HttpLink 
} from '@apollo/client';

const httpLink = new HttpLink({
    uri: "https://youassignserver-production.up.railway.app"
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

function ApolloConnection({children}) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default ApolloConnection;