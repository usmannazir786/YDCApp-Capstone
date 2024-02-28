import { initializeApp } from 'firebase/app'
import {
    getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBz-1JYWPWsPfTkbdenKi_n_Cmbvn7uBqU",
    authDomain: "ydcapp-88a12.firebaseapp.com",
    projectId: "ydcapp-88a12",
    storageBucket: "ydcapp-88a12.appspot.com",
    messagingSenderId: "748831351097",
    appId: "1:748831351097:web:9fdc23c68b3340001d88e8",
    measurementId: "G-ZPH3TF4WNX"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);