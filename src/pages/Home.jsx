import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/PostCard'

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h2>Recent Posts</h2>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h2>Loading posts...</h2>
                ) : (
                        data.getPosts && data.getPosts.map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
{
    getPosts {
        id body createdAt username likeCount
        likes {
            username
        }
        commentCount 
        comments {
            id username createdAt body 
        }
    }
}
`

export default Home
