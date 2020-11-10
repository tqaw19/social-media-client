import { gql, useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'

const Login = (props) => {
    const { login } = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    // Declaring function to access addUser method or else won't work
    function loginUserCallback() {
        loginUser()
    }

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            login(result.data.login)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit}
                noValidate className={loading ? 'loading' : ''}>
                <h2>Login Page</h2>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange} />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.username ? true : false}
                    onChange={onChange} />
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const LOGIN_USER = gql`
mutation login($username: String!,$password: String!){
    login(username: $username password: $password){
        id email username createdAt token
    }
}
`

export default Login
