import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getDatabase } from 'firebase/database';

import constants from './constants';

const app = !getApps().length ? initializeApp(constants.FIREBASE_CONFIG) : getApp();
const firestoreDb = getFirestore(app);
const firebaseStorage = getDatabase();
const auth = getAuth(app);

export default { app, firebaseStorage, firestoreDb, auth };
