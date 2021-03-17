import React from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import UserCreateForm from '../Components/UserCreateForm'
import { useAuth } from '../Context/AuthContext'
import { useRouter } from 'next/router'

function dashboard() {

  const {  currentUser } = useAuth()

  const router = useRouter()

	// if (!currentUser) {
	// 	router.push('./login')
	// }

	return (
		<div>
			<DashboardLayout role="Manager">
			</DashboardLayout>
		</div>
	)
}

export default dashboard
