import { db, auth, storage } from "./firebaseconfig.js"
import { addDoc, getDocs, doc, setDoc, collection, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"

let userName = document.getElementById("userName");
let postsParent = document.getElementById("postSparent");


window.addEventListener("load", getName);
async function getName(e) {
    try {
        const querySnapshot = await getDocs(collection(db, "usersCollection"));
        querySnapshot.forEach((doc) => {
            console.log(doc.data().fullName);
            userName.innerHTML = doc.data().fullName
        });
    } catch (error) {
        console.log(error.message)
        alert(error.message)

    }

}
window.addEventListener("load", getPosts);
async function getPosts() {
    try {
        const querySnapshot = await getDocs(collection(db, "postsCollection"));
        querySnapshot.forEach((doc) => {
            console.log("doc", doc.data().post, doc.data().desc);
            postsParent.innerHTML += `  <div class="border border-gray-200 p-6 rounded-lg mt-10">
            <div
                class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                </svg>
            </div>
            <h2  class="text-lg text-gray-900 font-medium title-font mb-2">${doc.data().post}</h2>
            <p class="leading-relaxed text-base">${doc.data().desc}</p>
            <div class="mt-5">
            <a onclick = "delBtn()" class=" mr-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >Delete</a>
            <a onclick = "editBtn()" class=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >Edit</a>

        </div>
        </div>`

        });
    } catch (error) {
        console.log(error.message)

    }

}
const publishBtn = document.querySelector("#publishBtn");
publishBtn.addEventListener("click", addPost)
async function addPost() {
    const post = document.getElementById("post")
    const desc = document.getElementById("desc")
    const postObj = {
        post: post.value,
        desc: desc.value

    }
    try {
        const docRef = await addDoc(collection(db, "postsCollection"), {
            ...postObj
        });
        console.log("Document written with ID: ", docRef.id);
        postsParent.innerHTML += `  <div class="border border-gray-200 p-6 rounded-lg">
        <div
            class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
            </svg>
        </div>
        <h2  class="text-lg text-gray-900 font-medium title-font mb-2">${postObj.post}</h2>
        <p  class="leading-relaxed text-base">${postObj.desc}</p>
        <div class="mt-5">
        <a onclick = "delBtn()" class="mr-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
           >Delete</a>
        <a onclick = "editBtn()" class=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >Edit</a>

    </div>
    </div>`

        post.value = ""
        desc.value = ""

    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

const logoutBtn = document.getElementById("logOut");
logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("user")
    window.location.replace("/login.html")
});


async function editBtn() {
    
}
// async function delBtn() {

//     try {
//         await deleteDoc(doc(db, "postsCollection", docRef.id));
//     } catch (error) {
//         console.log(error.message)

//     }
// }


// window.delBtn = delBtn
window.editBtn = editBtn




















// listParent.addEventListener("click", handleDelete);

// function handleDelete(e) {
//   if (e.target.classList.contains("delete-btn")) {
//     const card = e.target.closest(".card");
//     const cardTitle = card.querySelector(".card-title").textContent;
    
//     // Delete the post from Firestore
//     // You need to implement this part based on the document ID or title
//     // ...
    
//     // Remove the card from the DOM
//     card.remove();
//   }
// }
// listParent.addEventListener("click", handleEdit);

// function handleEdit(e) {
//   if (e.target.classList.contains("edit-btn")) {
//     const card = e.target.closest(".card");
//     const cardTitle = card.querySelector(".card-title").textContent;
//     const cardDesc = card.querySelector(".card-text").textContent;

//     // Populate the form fields with the current post data for editing
//     document.getElementById("title").value = cardTitle;
//     document.getElementById("desc").value = cardDesc;

//     // Remove the card from the DOM
//     card.remove();
//   }
// }
// async function fetchAndDisplayPosts() {
//   try {
//     const querySnapshot = await getDocs(collection(db, "posts"));
    
//     querySnapshot.forEach((doc) => {
//       const post = doc.data();
//       const card = createPostCard(post);
      
//       const listParent = document.getElementById("listParent");
//       listParent.appendChild(card);
//     });
//   } catch (error) {
//     console.error("Error fetching posts: ", error);
//   }
// }

// // Function to create a post card
// function createPostCard(post) {
//   const card = document.createElement("div");
//   card.className = "card mb-3";
//   card.innerHTML = `<div class="card-body">
//       <h3 class="card-title text-4xl font-bold">${post.title}</h3>
//       <p class="card-text">${post.description}</p>
//       <button class="delete-btn">Delete</button>
//       <button class="edit-btn">Edit</button>
//   </div>`;
  
//   return card;
//   window.addEventListener("DOMContentLoaded", fetchAndDisplayPosts);
// }
// }