import React from 'react'
import App from './App'
import {
    ApolloClient, ApolloProvider, createHttpLink,
    InMemoryCache
} from '@apollo/client'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_BACKEND_URL
})

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken')
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
