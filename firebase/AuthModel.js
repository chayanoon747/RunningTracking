import {app} from './Connect'
import {
  getAuth, createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  updateProfile, updatePassword, sendPasswordResetEmail,
  initializeAuth, getReactNativePersistence
} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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

export const signInEmailPass = (email, password, success,unsuccess) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
      const user = userCredential.user;
      console.log(`user after logged in: ${user}`)
      success(user)
  })
  .catch((error) => {
    const msg = (`signInEmailPass error: ${error}`)
    console.error(msg)
    unsuccess(msg)
  });
}

export const signOutUser = (success, unsuccess)=>{
  signOut(auth)
  .then(()=>{
    console.log(`Logged out`)
    success()
  })
  .catch((error)=>{
    const msg = (`logout error: ${error}`)
    console.error(msg)
    unsuccess(msg)
  })
}