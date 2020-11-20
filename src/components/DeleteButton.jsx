import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../utils/graphql'

const DeleteButton = ({ postId, callback }) => {
    const [confirmOpen, setConfirmOpen] = useState(false)

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables: {
            postId
        },
        update(proxy) {
            setConfirmOpen(false)
            let data = proxy.readQuery({ query: FETCH_POSTS_QUERY })
            const newData = data.getPosts.filter(p => p.id !== postId)
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: { getPosts: newData }
            })
            if (callback) callback()
        }
    })

    return (
        <>
            <Button
                as='div'
                color='red'
                floated='right'
                onClick={() => setConfirmOpen(true)}>
                <Icon name='trash' style={{ margin: 0 }} />
            </Button>
            <Confirm
                open={confirmOpen}
                content="Delete Post?"
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
            />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

export default DeleteButton
