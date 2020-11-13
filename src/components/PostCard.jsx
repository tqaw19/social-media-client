import React, { useContext } from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'

const PostCard = ({ post: {
    body, createdAt, id, username, likeCount,
    commentCount, likes
} }) => {
    const { user } = useContext(AuthContext)

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {/* Like Button */}
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                {/* Commnent Button */}
                <Button
                    labelPosition='right'
                    as={Link}
                    to={`/posts/${id}`}>
                    <Button color='blue' basic >
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentCount}</Label>
                </Button>
                {/* Delete Button */}
                {user && user.username === username && (
                    <Button
                        as='div'
                        color='red'
                        floated='right'
                        onClick={() => console.log('Delete Post')}>
                        <Icon name='trash' style={{ margin: 0 }} />
                    </Button>
                )}
            </Card.Content>
        </Card>
    )
}

export default PostCard
