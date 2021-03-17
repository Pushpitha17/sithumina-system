import { firebaseAdmin } from '../../firebaseAdmin'

const auth = firebaseAdmin.auth()
const db = firebaseAdmin.firestore()

export default async (req, res) => {
	const { uid } = req.body

	const userAccsRef = db.collection('userAccs')


	if (req.method === 'POST') {
		try {
			await auth.deleteUser(uid)
            await userAccsRef.doc(uid).delete()
		} catch (error) {
			res.status(400).json('failed')
			return
		}
	}

	res.status(200).json({ uid: userrecord.uid })
}
