/* eslint-disable import/prefer-default-export */

// npmでimportしたfirebaseのpackage
import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './config'

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()

// これでFireStoreを使えるようになるが、今回は使用しない
