import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore,} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getAuth, } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCUlkelaHQrzLqVewn0_aUrtBMkh1Yl62A",
    authDomain: "saylani-mini-hackathon-df32d.firebaseapp.com",
    projectId: "saylani-mini-hackathon-df32d",
    storageBucket: "saylani-mini-hackathon-df32d.appspot.com",
    messagingSenderId: "1011023054555",
    appId: "1:1011023054555:web:98f73c5cbc662c64e76efe"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { db, auth, storage}