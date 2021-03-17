import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import { useAuth} from "../Context/AuthContext"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Textfield from './FormsUI/Textfield'
import Button from './FormsUI/Button'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { firebaseClient } from '../firebaseClient'
import { useRouter } from 'next/router'

const auth = firebaseClient.auth()

const INITIAL_FORM_STATE = {
	email: '',
	password: '',
}

const FORM_VALIDATION = Yup.object().shape({
	password: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email.').required('Required'),
})

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'Center',
		minHeight: '100vh',
	},
	cardContainer: {
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginCard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	divider: {
		width: '100%',
		height: '2px',
	},
	title: {
		textAlign: 'center',
		fontWeight: '500',
		color: 'white',
		padding: theme.spacing(4),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		backgroundColor: theme.palette.primary.main,
	},
	cardContent: {
		padding: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: '#009688',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(5),
	},
	row: {
		marginBottom: theme.spacing(2),
	},
	formControls: {
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	errortxt:{
		color: theme.palette.error.main,
		fontSize: "0.8rem",
		textAlign: "center",
		margin : theme.spacing(1)
	}
}))




export default function Login() {

  const classes = useStyles();

  const { setCurrentUser, currentUser } = useAuth()

  const [error , setError] = useState("")

  const router = useRouter()

  if (currentUser) {
		router.push('./')
  }



  console.log(currentUser)

  const handleSubmit = async (values) => {
	  setError("")
      const {email,password} = values

	  try {
		  const user = await auth.signInWithEmailAndPassword(email, password)
		  setCurrentUser(user.user)
		  console.log(currentUser)
	  } catch (error) {
		setError(error.message)
	  }

  }

  return (
		<div className={classes.root}>
			<Container component="main" maxWidth="xs">
				<div className={classes.cardContainer}>
					<Card className={classes.loginCard}>
						<Typography component="h1" variant="h5" className={classes.title}>
							Sithumina Management System
						</Typography>
						<div className={classes.cardContent}>
							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Login
							</Typography>
							<div className={classes.form}></div>
							<Formik
								initialValues={{
									...INITIAL_FORM_STATE,
								}}
								validationSchema={FORM_VALIDATION}
								onSubmit={handleSubmit}>
								<Form>
									<Grid container spacing={2} alignContent="center">
										<Grid item xs={12} className={classes.row}>
											<Textfield label="Email" name="email" autoFocus />
										</Grid>
										<Grid item xs={12} className={classes.row}>
											<Textfield
												name="password"
												label="Password"
												type="password"
												id="password"
												autoComplete="current-password"
											/>
										</Grid>
										<Grid item xs={12} className={classes.formControls}>
											{<div className={classes.errortxt}>{error}</div>}
											<Button
												type="submit"
												fullWidth
												variant="contained"
												color="primary"
												className={classes.submit}>
												Login
											</Button>
										</Grid>
										<Grid item xs>
											<Link href="#" variant="body2">
												Forgot password?
											</Link>
										</Grid>
									</Grid>
								</Form>
							</Formik>
						</div>
					</Card>
				</div>
			</Container>
		</div>
	)
}