import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { useUserAuth } from '../context/UserAuthContext'

const Signup = () => {
    const { signUp } = useUserAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await signUp(email, password)
            navigate('/home')
        } catch (err) {
            setError(err.message)
        }
    }

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
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='submit__btn'>Log In</button>
                </form>
            </div>
            <div className='login__link'>
                Already have an account ? <Link to='/'>Login</Link>
            </div>
        </>
    )
}

export default Signup
