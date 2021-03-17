import { firebaseAdmin } from '../../firebaseAdmin'

const firestore = firebaseAdmin.firestore()

export default async (req, res) => {
	const { data , uid } = req.body

	const userAccsRef = firestore.collection('userAccs')

	if (req.method === 'POST') {
		userAccsRef.doc(uid).set({
			...data,
			createdAt : new Date(),
			updateddAt : new Date(),
		});
	}

	res.status(200).json("succces")
}
