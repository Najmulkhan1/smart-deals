import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.init'

export const AuthContext = createContext()

const AuthProvider = ({children}) => {

const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)


    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (updateInfo) => {
        return updateProfile(auth.currentUser, updateInfo)
    }


    const logout = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscibe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
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
        updateUser
    }

  return (
    <div>
        <AuthContext value={authData}>{children}</AuthContext>
    </div>
  )
}

export default AuthProvider