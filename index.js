import { db, auth, storage } from "./firebaseconfig.js"
import { addDoc, getDocs, doc, setDoc, collection, onSnapshot,deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"
let uiSec = document.getElementById("uiSec");

const getPosts = async () => {

    onSnapshot(collection(db, "postsCollection"), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            // console.log(snapshot)
            console.log(change.doc.data().time);
            uiSec.innerHTML += `  <div class="border border-gray-200 p-6 rounded-lg">
            <div
                class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <img src="./Assets/pic.jpg" alt="">

            </div>
            <h2  class="text-2xl text-gray-900 font-medium title-font mb-2">${change.doc.data().post}</h2>
            <p  class="leading-relaxed text-base font-medium">${change.doc.data().desc}</p>
            <p class="leading-relaxed text-base font-medium">Date & Time : ${change.doc.data().time}</p>

            <div class="mt-5">
            <a onclick = "delBtn('${change.doc.id}')" class="mr-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
               >Delete</a>
            <a onclick = "editBtn()" class=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >Edit</a>
        </div>
        </div>`

        })

    });

}
getPosts()

// window.addEventListener("load", getPosts);
// async function getPosts() {
//     try {
//         const querySnapshot = await getDocs(collection(db, "postsCollection"));
//         querySnapshot.forEach((doc) => {
//             console.log("doc", doc.data().post, doc.data().desc);
//             uiSec.innerHTML += `  <div class="border border-gray-200 p-6 rounded-lg mt-10">
//             <div
//                 class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
//                 <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
//                     stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
//                     <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
//                 </svg>
//             </div>
//             <h2 class="text-lg text-gray-900 font-medium title-font mb-2">${doc.data().post}</h2>
//             <p class="leading-relaxed text-base">${doc.data().desc}</p>
//             <div class="mt-5">
//             <a class=" mr-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
//                 href="">Delete</a>
//             <a class=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
//                 href="">Edit</a>

//         </div>
//         </div>`

//         });
//     } catch (error) {
//         console.log(error.message)

//     }

// }
async function delBtn(id) {

    try {
        console.log("id", id)
        await deleteDoc(doc(db, "postsCollection", id));
    } catch (error) {
        console.log(error)

    }
}
const editBtn = () => {
    console.log("xakchak")
}
window.delBtn = delBtn
window.editBtn = editBtn