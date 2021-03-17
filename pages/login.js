import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from '../Context/AuthContext'
import { useRouter } from 'next/router'
import Login from '../Components/Login'


const useStyles = makeStyles((theme) => ({
	root:{
    display:"flex",
    alignContent : "center",
    justifyContent:"Center",
  }
}))


export default function login() {

  const { setCurrentUser, currentUser } = useAuth()
	const router = useRouter()

  const classes = useStyles()

  return (
      <Login/>
  )
}
