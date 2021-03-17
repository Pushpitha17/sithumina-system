
import {firebaseAdmin} from '../../firebaseAdmin'

const auth = firebaseAdmin.auth()
const db = firebaseAdmin.firestore()

export default async (req, res) => {

    const { email, password, role, displayName } = req.body

    const userAccsRef = db.collection('userAccs')

    let userrecord 

    if (req.method === 'POST') {
        console.log(email, password, role)
        try {
            let user = await auth.createUser({
							email,
							password,
							displayName,
						})
						userrecord = user.toJSON()

            await auth.setCustomUserClaims(userrecord.uid, {
                role,
            })
        } catch (error) {
            res.status(400).json("failed")
            return
        }
        
	}

	res.status(200).json({ uid: userrecord.uid })
}
