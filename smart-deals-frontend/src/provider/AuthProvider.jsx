import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.init'
import { AuthContext } from './AuthContext'

 

const AuthProvider = ({children}) => {

const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)

const googleProvider = new GoogleAuthProvider()


    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (updateInfo) => {
        return updateProfile(auth.currentUser, updateInfo)
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }


    const logout = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscibe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return() => {
            unsubscibe()
        }

    },[])

    const authData = {
        user,
        setUser,
        loading,
        createUser,
        logout,
        updateUser,
        setLoading,
        signInUser,
        googleLogin
    }

  return (
    <div>
        <AuthContext value={authData}>{children}</AuthContext>
    </div>
  )
}

export default AuthProvider