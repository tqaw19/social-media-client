import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { Grid, Transition } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

const Home = () => {
    const { user } = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h2>Recent Posts</h2>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? (
                    <h2>Loading posts...</h2>
                ) : (
                        <Transition.Group animation='scale' duration={500}>
                            {data.getPosts && data.getPosts.map(post => (
                                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            ))}
                        </Transition.Group>
                    )}
            </Grid.Row>
        </Grid>
    )
}

export default Home
