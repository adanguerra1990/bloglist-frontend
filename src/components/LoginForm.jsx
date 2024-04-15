import React from 'react';

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

export default LoginForm;
