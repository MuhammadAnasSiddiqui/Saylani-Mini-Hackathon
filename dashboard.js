import { db, auth, storage } from "./firebaseconfig.js"
import { addDoc, getDocs, doc, setDoc, collection, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"

let userName = document.getElementById("userName");
let postsParent = document.getElementById("postSparent");
const publishBtn = document.querySelector("#publishBtn");


const userLogin = JSON.parse(localStorage.getItem("user"));
console.log(localStorage.getItem("user"));
console.log(userLogin);

if (localStorage.getItem("user") === null) {
    window.location.replace("/index.html");

}

window.addEventListener("load", getName);
async function getName() {
    const currUser = JSON.parse(localStorage.getItem("user"))
    const userUid = currUser.userUid;
    console.log("userUid", userUid);
    userName.innerHTML = currUser.fullName

}

const getPosts = async () => {

    onSnapshot(collection(db, "postsCollection"), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            console.log("change", change.doc.id)
            // console.log(change.doc.data());
            postsParent.innerHTML += `  <div class="border border-gray-200 p-6 rounded-lg">
            <div
                class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <img src="./Assets/pic.jpg" alt="">

            </div>
            <h2  class="text-2xl text-gray-900 font-medium title-font mb-2">${change.doc.data().post}</h2>
            <p  class="leading-relaxed text-base">${change.doc.data().desc}</p>
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

publishBtn.addEventListener("click", addPosts)
async function addPosts() {
    const post = document.getElementById("post");
    const desc = document.getElementById("desc");
    const time = new Date();
    console.log(post,
        desc,
        time)
    console.log("time", time.toLocaleString())
    if (!post.value || !desc.value) {
        alert("Please adding a blog");
        return
    }
    const postObj = {
        post: post.value,
        desc: desc.value,
        time: time.toLocaleString()

    }
    try {
        const docRef = await addDoc(collection(db, "postsCollection"), {
            ...postObj
        });
        console.log("Document written with ID: ", docRef.id);

        post.value = ""
        desc.value = ""

    } catch (e) {
        console.error("Error adding document: ", e);
    }

}




async function editBtn() {

}
async function delBtn(id) {

    try {
        console.log("id", id)
        await deleteDoc(doc(db, "postsCollection", id));
    } catch (error) {
        console.log(error)

    }
}

const logoutBtn = document.getElementById("logOut");
logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("user")
    window.location.replace("/index.html")
});

window.delBtn = delBtn
// window.editBtn = editBtn


export { getPosts }