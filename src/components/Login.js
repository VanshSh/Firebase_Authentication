import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import {
    BsGoogle,
    BsGithub,
    BsPerson,
    BsFillEyeFill,
    BsFillEyeSlashFill,
} from 'react-icons/bs'
import { useUserAuth } from '../context/UserAuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const navigate = useNavigate()
    const { logIn, googleSignIn, githubSignIn, anonymousSignIn } = useUserAuth()

    //  Email and Passoword Login
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await logIn(email, password)
            navigate('/home')
        } catch (err) {
            setError(err.message)
        }
    }

    // Google Sign In
    const handleGoogleSignIn = async (e) => {
        e.preventDefault()
        try {
            await googleSignIn()
            navigate('/home')
        } catch (err) {
            setError(err.message)
        }
    }
    // Github Sign In
    const handleGithubSignIn = async (e) => {
        e.preventDefault()
        try {
            await githubSignIn()
            navigate('/home')
        } catch (err) {
            setError(err.message)
        }
    }
    // Anonymous Sign In
    const handleAnonymousSignIn = async (e) => {
        e.preventDefault()
        try {
            await anonymousSignIn()
            navigate('/home')
        } catch (err) {
            setError(err.message)
        }
    }

    const passwordVisibleHandler = () => {
        setPasswordVisible(!passwordVisible)
    }

    const passwordShow = passwordVisible ? 'text' : 'password'
    return (
        <>
            <div className='login'>
                <h2 className='login__title'>Firebase Authentication</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <form onSubmit={handleSubmit} className='form'>
                    <input
                        type='email'
                        placeholder='Email address'
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type={passwordShow}
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <h5
                        className='passwordHandle'
                        onClick={passwordVisibleHandler}
                    >
                        {passwordVisible ? 'Hide' : 'Show'} password
                        {passwordVisible ? (
                            <BsFillEyeSlashFill />
                        ) : (
                            <BsFillEyeFill />
                        )}
                    </h5>

                    <button className='submit__btn'>Log In</button>
                </form>
                <div className='signup'>
                    Don't have an account? <Link to='/signup'>Sign up</Link>
                </div>
                <br />
                <div className='underline'></div>
                <div className='btns'>
                    <div className='google' onClick={handleGoogleSignIn}>
                        <BsGoogle />
                    </div>
                    <div className='github' onClick={handleGithubSignIn}>
                        <BsGithub />
                    </div>
                    <div className='anonymous' onClick={handleAnonymousSignIn}>
                        <BsPerson />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

// <div className='twitter'>
//<BsTwitter onClick={handleTwitterSignIn} />
//</div>
