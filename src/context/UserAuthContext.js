import React, { useState, useEffect, createContext, useContext } from 'react'

import { auth } from '../firebase'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    GithubAuthProvider,
    TwitterAuthProvider,
    signInAnonymously,
    signInWithPopup,
} from 'firebase/auth'

// Create Context
const userAuthContext = createContext()

//  to wrap the component with the context , children => components
export const UserAuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    // to create new user
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //  to lgoin user
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // login with google
    const googleSignIn = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }

   

    // login with Github
    const githubSignIn = () => {
        const githubProvider = new GithubAuthProvider()
        return signInWithPopup(auth, githubProvider)
    }

    // login with anonymous
    const anonymousSignIn = () => {
        return signInAnonymously(auth)
    }

    // to logout user
    const logOut = () => {
        return signOut(auth)
    }

    //  whenever user is created or existing user is logged in
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    return (
        <>
            <userAuthContext.Provider
                value={{
                    user,
                    signUp,
                    logIn,
                    logOut,
                    googleSignIn,
                    githubSignIn,
                    anonymousSignIn,
                }}
            >
                {children}
            </userAuthContext.Provider>
        </>
    )
}

//  Use Context and to get the value
export const useUserAuth = () => {
    return useContext(userAuthContext)
}

//  OR const useUserAuth = useContext(userAuthContext)
//  // login with Twitter
//     const twitterSignIn = () => {
//         const twitterProvider = new TwitterAuthProvider()
//         return signInWithPopup(auth, twitterProvider)
//     }