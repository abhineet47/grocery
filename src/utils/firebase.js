import firebase from 'firebase'
 
const firebaseConfig = {
    apiKey: "AIzaSyBACll_OdU9FJGdV_D5rd3Gvm4-_88R0xU",
    authDomain: "myfreshbasket-99c04.firebaseapp.com",
    databaseURL: "https://myfreshbasket-99c04.firebaseio.com",
    projectId: "myfreshbasket-99c04",
    storageBucket: "myfreshbasket-99c04.appspot.com",
    messagingSenderId: "960425567228",
    appId: "1:960425567228:web:b663701b1d30502f718879",
    measurementId: "G-Z24PGFWJ0D"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
export default firebase;