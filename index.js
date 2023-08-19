import { db, auth, storage } from "./firebaseconfig.js"
import { addDoc, getDocs, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"

let uiSec = document.getElementById("uiSec");

window.addEventListener("load", getPosts);
async function getPosts() {
    try {
        const querySnapshot = await getDocs(collection(db, "postsCollection"));
        querySnapshot.forEach((doc) => {
            console.log("doc", doc.data().post, doc.data().desc);
            uiSec.innerHTML += `  <div class="border border-gray-200 p-6 rounded-lg mt-10">
            <div
                class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                </svg>
            </div>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">${doc.data().post}</h2>
            <p class="leading-relaxed text-base">${doc.data().desc}</p>
            <div class="mt-5">
            <a class=" mr-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                href="">Delete</a>
            <a class=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                href="">Edit</a>

        </div>
        </div>`

        });
    } catch (error) {
        console.log(error.message)

    }

}