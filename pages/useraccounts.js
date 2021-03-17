import React ,{useState}from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import Spinner from '../Components/Blocks/spinner'
import PageHeader from '../Components/Blocks/PageHeader'
import { useAuth } from '../Context/AuthContext'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import useTable from "../Components/useTable"
import Input from "../Components/Blocks/input";
import ActionButton from "../Components/Blocks/ActionButton";
import { Search } from "@material-ui/icons"
import AddIcon from '@material-ui/icons/Add'
import { firebaseClient } from '../firebaseClient'
import Link from 'next/link'


const useStyles = makeStyles((theme) => ({
	pageContent: {
		margin: theme.spacing(2),
		padding: theme.spacing(2),
	},
	searchInput: {
		width: '50%',
	},
	addBtn: {
		backgroundColor: '#00bfa5',

	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}))

const headCells = [
	{ id: 'Name', label: 'Name' },
	{ id: 'email', label: 'Email Address', disableSorting: true },
	{ id: 'mobile', label: 'Phone Number', disableSorting: true },
	{ id: 'role', label: 'role', disableSorting: true },
	{ id: 'actions', label: 'Actions', disableSorting: true },
]

function UserAccounts({accounts ,Docs}) {

	const [records, setRecords] = useState(accounts)
	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			return items
		},
	})

	const handleDelete = async (uid) => {
		console.log(uid)
		// const deleteReq = await fetch('/api/deleteaccount', {
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/json',
		// 	},
		// 	method: 'POST',
		// 	body: JSON.stringify({uid}),
		// })

		let confirmed = confirm("Are You sure you want to delete account")
		console.log(confirmed)
		
	}

	const {currentUser} = useAuth()
	const router = useRouter()

	console.log(currentUser)
	// if(!auth.currentUser) {
	// 	router.push('./login')
	// }
	
	console.log(accounts, Docs)

	const classes = useStyles()

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	} = useTable(records, headCells, filterFn)

	const handleSearch = (e) => {
		let target = e.target
		setFilterFn({
			fn: (items) => {
				if (target.value == '') return items
				else
					return items.filter((x) =>
						x.name.toLowerCase().includes(target.value)
					)
			},
		})
	}

	return (
		<>
			<DashboardLayout role="Manager">
				<PageHeader Title="User Accounts" />
				<Paper className={classes.pageContent}>
					<Toolbar className={classes.toolbar}>
						<Input
							label="Search Accounts"
							className={classes.searchInput}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Search />
									</InputAdornment>
								),
							}}
							onChange={handleSearch}
						/>
						<Link href="./createprofile">
							<Button className={classes.addBtn} startIcon={<AddIcon />}>
								Add New Account
							</Button>
						</Link>
					</Toolbar>
					<TblContainer>
						<TblHead />
						<TableBody>
							{recordsAfterPagingAndSorting().map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.email}</TableCell>
									<TableCell>{item.phone}</TableCell>
									<TableCell>{item.role}</TableCell>
									<TableCell>
										<ActionButton color="primary" onClick={() => {}}>
											<EditOutlinedIcon fontSize="small" />
										</ActionButton>
										<ActionButton
											color="error"
											onClick={() => {
												handleDelete(item.uid)
											}}>
											<DeleteOutlineIcon fontSize="small" />
										</ActionButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</TblContainer>
					<TblPagination />
				</Paper>
			</DashboardLayout>
		</>
	)
}

UserAccounts.getInitialProps = async (ctx) => {

	const firestore = firebaseClient.firestore()
	const collectionRef = firestore.collection("userAccs")

	let accounts= []
	let data = []

	const Docs = await  collectionRef.get()

	Docs.forEach((doc)=> {

		const {displayName, email , phone , role} = doc.data()
		const uid = doc.id

		const obj = {
			name: displayName,
			email,
			phone,
			role,
			uid
		}

		accounts.push(obj)
	})

	return {accounts, Docs: data}
}


export default UserAccounts
