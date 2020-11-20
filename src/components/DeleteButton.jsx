import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../utils/graphql'
import { MyPopup } from '../utils/MyPopup'

const DeleteButton = ({ postId, commentId, callback }) => {
    const [confirmOpen, setConfirmOpen] = useState(false)

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePostOrMutation] = useMutation(mutation, {
        variables: {
            postId,
            commentId
        },
        update(proxy) {
            setConfirmOpen(false)
            if (!commentId) {
                let data = proxy.readQuery({ query: FETCH_POSTS_QUERY })
                const newData = data.getPosts.filter(p => p.id !== postId)
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: { getPosts: newData }
                })
            }
            if (callback) callback()
        }
    })

    return (
        <>
            <MyPopup
                content={commentId ? 'Delete comment' : 'Delete post'}>
                <Button
                    as='div'
                    color='red'
                    floated='right'
                    onClick={() => setConfirmOpen(true)}>
                    <Icon name='trash' style={{ margin: 0 }} />
                </Button>
            </MyPopup>
            <Confirm
                open={confirmOpen}
                content="Delete Post?"
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
            />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId:$commentId){
            id
            comments{
                id username body createdAt
            }
            commentCount
        }
    }
`

export default DeleteButton
