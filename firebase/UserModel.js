import app from './Connect'
import {getFirestore, collection, doc, setDoc} from 'firebase/firestore'

const db = getFirestore(app)
const usersColl = collection(db, "users")

export const addUser = (user, profile, success, unsuccess)=>{
  console.log(`addUser in UserModel user id: ${user.uid} fullname: ${profile.fullname}`)

  setDoc(doc(usersColl, user.uid),{
    email: user.email,
    fullname: profile.fullname
  })
  .then(()=>{
    success({fullname: user.email})
  })
  .catch((error)=>{
    console.error(`addUser in users collection error: ${error}`)
    console.error(msg)
    unsuccess(msg)
  })
}


