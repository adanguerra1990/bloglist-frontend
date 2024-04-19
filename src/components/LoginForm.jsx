import React from 'react'
import PropType from 'prop-types'

const LoginForm = ({onSubmit, handleUsernameChange, handlePasswordChange, username, password}) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username
                    <input
                        type='text'
                        value={username}
                        name='Usename'
                        autoComplete='current-username'
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        autoComplete='current-password'
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

LoginForm.PropType = {
    onSubmit: PropType.func.isRequired,
    handleUsernameChange: PropType.func.isRequired,
    handlePasswordChange: PropType.func.isRequired,
    username: PropType.string.isRequired,
    password: PropType.string.isRequired,
}

export default LoginForm;
