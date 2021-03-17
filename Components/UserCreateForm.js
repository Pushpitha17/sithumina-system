import React , {useState}from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography } from '@material-ui/core'
import Textfield from './FormsUI/Textfield'
import Checkbox from './FormsUI/Checkbox'
import DateTimePicker from './FormsUI/DataTimePicker'
import Select from './FormsUI/Select'
import Button from './FormsUI/Button'

const useStyles = makeStyles((theme) => ({
	formWrapper: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5),
		padding: theme.spacing(4),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	container: {
		wdith: '100%',
		margin: theme.spacing(2),
		backgroundColor: theme.palette.white.main,
	},
	subtitle: {
		fontWeight: '500',
	},
	divider: {
		height : theme.spacing(3)
	}
}))

const INITIAL_FORM_STATE = {
	fullName: '',
	nic: '',
	address: '',
	email: '',
	phone: '',
	birthdate: '',
	displayName: '',
	role: '',
}

const FORM_VALIDATION = Yup.object().shape({
	fullName: Yup.string().required('Required'),
	nic: Yup.string().required('Required'),
	address: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email.').required('Required'),
	phone: Yup.number()
		.integer()
		.typeError('Please enter a valid phone number')
		.required('Required'),
	birthDate: Yup.string().required('Required'),
	displayName: Yup.string().required('Required'),
	role: Yup.string().required('Required'),
})

const Roles = {
	Manager: 'Manager',
	Employee: 'Employee',
	Supervisor: 'Supervisor',
}

const handleFormSubmit = async (
	values,
	setCredentials,
	setLoading,
	setAccCreated
) => {
	console.log(values)
	const password = (Math.floor(100000 + Math.random() * 900000)).toString();
	const { role, displayName } = values

	const credentials = {
		email: values.email,
		password,
	}

	setLoading(true)

	const resCreateAcc = await fetch('/api/createaccount', {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({ ...credentials, role, displayName }),
	})
	if (resCreateAcc.status == 200) {
		const resData = await resCreateAcc.json()

		const resSaveProfile = await fetch('/api/saveprofile', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({data:values ,uid: resData.uid }),
		})
		setCredentials(credentials)
		setAccCreated(true)
		setLoading(false)
	}else{
		setLoading(false)
	}
}


export default function UserCreateForm({ setCredentials, setLoading, setAccCreated }) {
	const classes = useStyles()

	const [checked, setChecked] = useState(false)

	return (
		<div className={classes.container}>
			<Grid container>
				<Grid item xs={12}>
					<Container maxWidth="md">
						<div className={classes.formWrapper}>
							<Formik
								initialValues={{
									...INITIAL_FORM_STATE,
								}}
								validationSchema={FORM_VALIDATION}
								onSubmit={(values) => {
									handleFormSubmit(
										values,
										setCredentials,
										setLoading,
										setAccCreated
									)
								}}>
								<Form>
									<Grid container spacing={2} alignContent="center">
										<Grid item xs={12}>
											<Typography className={classes.subtitle}>
												Basic Infomation
											</Typography>
										</Grid>

										<Grid item xs={12}>
											<Textfield name="fullName" label="Full Name" />
										</Grid>

										<Grid item xs={12} md={6}>
											<Textfield name="nic" label="NIC number" />
										</Grid>

										<Grid item xs={12} md={6}>
											<Textfield name="phone" label="Phone" />
										</Grid>

										<Grid item xs={12}>
											<Textfield
												name="address"
												label="Address"
												multiline={true}
												rows={4}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<DateTimePicker name="birthDate" label="Birth Date" />
										</Grid>
										<Grid item xs={12} className={classes.divider}></Grid>

										<Grid item xs={12}>
											<Typography className={classes.subtitle}>
												Account Information
											</Typography>
										</Grid>

										<Grid item xs={12}>
											<Textfield name="email" label="Email" />
										</Grid>

										<Grid item xs={12} md={6}>
											<Textfield name="displayName" label="Display Name" />
										</Grid>

										<Grid item xs={12} md={6}>
											<Select name="role" label="Role" options={Roles} />
										</Grid>
										<Grid item xs={12} className={classes.divider}></Grid>
										<Grid item xs={3}></Grid>
										<Grid item xs={6}>
											<Checkbox
												name="checkbox"
												label="Check all the details"
												setState={setChecked}
											/>
										</Grid>
										<Grid item xs={3}></Grid>
										<Grid item xs={3}></Grid>
										<Grid item xs={6}>
											<Button disabled={!checked}>Add profile</Button>
										</Grid>
										<Grid item xs={3}></Grid>
									</Grid>
								</Form>
							</Formik>
						</div>
					</Container>
				</Grid>
			</Grid>
		</div>
	)
}

