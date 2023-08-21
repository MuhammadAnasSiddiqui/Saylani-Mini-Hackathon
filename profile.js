import { db, auth, storage } from "./firebaseconfig.js"
import { addDoc, getDocs, getDoc, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js"


const userLogin = JSON.parse(localStorage.getItem("user"));
console.log(localStorage.getItem("user"));
console.log(userLogin);

if (localStorage.getItem("user") === null) {
    window.location.replace("/index.html");

}

const fullNameElement = document.getElementById("fullName");
const emailElement = document.getElementById("email");
// const phoneNumberElement = document.getElementById("phoneNumber");
const logoutBtn = document.getElementById("logoutBtn");


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "usersCollection", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            fullNameElement.textContent = `Full Name : ${userData.fullName}`;
            emailElement.textContent = `Email: ${user.email}`;
            // phoneNumberElement.textContent = `Phone: ${userData.phoneNumber || "N/A"}`;
        }
    }
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.replace("./index.html");
});









