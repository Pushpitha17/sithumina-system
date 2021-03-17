import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Link from 'next/link'


const useStyles = makeStyles((theme) => ({
	container: {
		wdith: '100%',
		margin: theme.spacing(2),
		backgroundColor: theme.palette.white.main,
	},
	paper: {
		paddingTop: theme.spacing(5),
		paddingBottom: theme.spacing(5),
	},
	header: {
		display: 'flex',
		alignItems: 'center',
	},
	title: {
		fontSize: '1.5rem',
		fontWeight: '500',
		marginLeft: theme.spacing(2),
	},
	content: {
		margin: `${theme.spacing(6)}px 0`,
		fontSize: '1rem',
	},
	line: {
		display: 'flex',
	},
	label: {
		display: 'block',
		width: '80px',
		fontWeight: '500',
	},
	separator: {
		padding: '0 24px',
	},
	helperText: {
		fontSize: '0.6rem',
	},
	button: {
		margin: theme.spacing(1),
	},
}))

function UsercreatedScreen({email , password, setAccCreated}) {


    const classes = useStyles()

    return (
			<div className={classes.container}>
				<Container maxWidth="md">
					<Paper elevation={0} className={classes.paper}>
						<div className={classes.header}>
							<CheckCircleIcon style={{ color: '#4caf50' }} fontSize="large" />
							<span className={classes.title}>Account Created</span>
						</div>
						<div className={classes.content}>
							<div className={classes.line}>
								<p className={classes.label}>Email</p>
								<p className={classes.separator}>:</p>
								<p>{email}</p>
							</div>
							<div className={classes.line}>
								<p className={classes.label}>Password</p>
								<p className={classes.separator}>:</p>
								<p>{password}</p>
							</div>
							<div>
								<p classname={classes.helperText}>
									*once you log in , Please Change the password to secure your
									account.
								</p>
							</div>
						</div>
						<Link href="/useraccounts">
							<Button
								variant="outlined"
								color="primary"
								className={classes.button}
								startIcon={<ArrowBackIosIcon />}>
								Back
							</Button>
						</Link>
						<Link href="/createprofile">
							<Button
								variant="outlined"
								color="default"
								className={classes.button}
								onClick={()=> {
									setAccCreated(false)
								}}
								endIcon={<PersonAddIcon />}>
								Add another Profile
							</Button>
						</Link>
					</Paper>
				</Container>
			</div>
		)
}

export default UsercreatedScreen
