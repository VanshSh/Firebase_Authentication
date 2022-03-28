import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useUserAuth } from '../context/UserAuthContext'

const Home = () => {
    const { logOut, user } = useUserAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logOut()
            navigate('/')
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className='home'>
                <h1>Home</h1>
                <h5>
                    {' '}
                    Welcome{' '}
                    <span className='userName'>
                        {(user && user.email) || 'Guest'} !
                    </span>
                </h5>

                <Button className='btn__logout' onClick={handleLogout}>
                    Log out
                </Button>
            </div>
        </>
    )
}

export default Home
