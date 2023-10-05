import app from './Connect'
import {
  getAuth, createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  updateProfile, updatePassword, sendPasswordResetEmail
} from 'firebase/auth'

import {addUser} from './UserModel'

const auth = getAuth(app)

export const signUpEmailPass = (profile, success, unsuccess)=>{
    console.log(`email: ${profile.email}`)
    createUserWithEmailAndPassword(auth, profile.email, profile.password)
    .then((userCredential)=>{
      const user = userCredential.user
      console.log(`User: in signUpEmailPass: ${user}`)
      addUser(user, profile, success, unsuccess)
    })
    .catch((error)=>{
      const msg = (`signUpEmailPass error: ${error}`)
      console.error(msg)
      unsuccess(msg)
    })
}