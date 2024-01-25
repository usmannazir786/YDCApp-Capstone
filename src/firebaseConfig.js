import firebase from '@react-native-firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyBz-1JYWPWsPfTkbdenKi_n_Cmbvn7uBqU",
    authDomain: "ydcapp-88a12.firebaseapp.com",
    projectId: "ydcapp-88a12",
    storageBucket: "ydcapp-88a12.appspot.com",
    messagingSenderId: "748831351097",
    appId: "1:748831351097:android:b4889312b0d952721d88e8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
