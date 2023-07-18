import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
  authDomain: "tigremadeapp.firebaseapp.com",
  projectId: "tigremadeapp",
  storageBucket: "tigremadeapp.appspot.com",
  messagingSenderId: "737200823064",
  appId: "1:737200823064:web:6e84b519f0bc3f41b41c6d",
  measurementId: "G-XW600PMT58"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    app,
    db
};
