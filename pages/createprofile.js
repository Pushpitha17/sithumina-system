import React ,{useState}from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import Spinner from '../Components/Blocks/spinner'
import UserCreateForm from '../Components/UserCreateForm'
import PageHeader from '../Components/Blocks/PageHeader'
import UserCreatedScreen from '../Components/UsercreatedScreen'
import { useAuth } from '../Context/AuthContext'
import { useRouter } from 'next/router'


function CreateProfile() {

	const auth = useAuth()
	const router = useRouter()

	// if(!auth.currentUser) {
	// 	router.push('./login')
	// }

	const [loading , setLoading ] = useState(false)
	const [accCreated, setAccCreated] = useState(false)
	const [credentials ,setCredentials] = useState({email:"" , password:""})

	return (
		<div>
			<DashboardLayout>
				<PageHeader Title="Add New User" />
				{accCreated || (loading ? (
						<Spinner text="Creating Account" />
					) : 
						<UserCreateForm setCredentials={setCredentials} setLoading={setLoading} setAccCreated={setAccCreated}/>
					)}
				{accCreated &&
					(loading ? (
						<Spinner text="Population Database" />
					) : (
						<UserCreatedScreen
							email={credentials.email}
							password={credentials.password}
							setAccCreated={setAccCreated}
						/>
					))}
			</DashboardLayout>
		</div>
	)
}

export default CreateProfile
