import {initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5i2k-Rrx-tsuTysfYYZBT_n0cPpIVQwg",
  authDomain: "cooking-ninja-site-a9bf4.firebaseapp.com",
  projectId: "cooking-ninja-site-a9bf4",
  storageBucket: "cooking-ninja-site-a9bf4.appspot.com",
  messagingSenderId: "448532520652",
  appId: "1:448532520652:web:cc8622078fe0aa0652ac69",
};

//initialize firebase
const app = initializeApp(firebaseConfig);

//initialize services
const projectFirestore = getFirestore(app);


export {projectFirestore}