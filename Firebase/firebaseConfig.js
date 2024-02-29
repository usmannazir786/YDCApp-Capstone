import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBz-1JYWPWsPfTkbdenKi_n_Cmbvn7uBqU",
    authDomain: "ydcapp-88a12.firebaseapp.com",
    projectId: "ydcapp-88a12",
    storageBucket: "ydcapp-88a12.appspot.com",
    messagingSenderId: "748831351097",
    appId: "1:748831351097:android:b4889312b0d952721d88e8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//export const authentication = getAuth(app);

