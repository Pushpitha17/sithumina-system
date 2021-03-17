import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {firebaseClient} from '../firebaseClient'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [isLoading, setLoading] = useState(true)

	const router = useRouter()

	async function  logout() {
		console.log("log out")
		const res = await firebaseClient.auth().signOut()
		await firebaseClient.auth().signOut()
		// router.push("/login")
		console.log(res)
	}

	useEffect(() => {
		(async () => {
			setLoading(false)
		})()
	}, [])

	const value = {
		currentUser,
		setCurrentUser,
		logout,
	}

	return (
		<AuthContext.Provider value={value}>
			{!isLoading && children}
		</AuthContext.Provider>
	)
}
