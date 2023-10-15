// import {initializeApp} from "firebase/app";
// import {getDatabase, set, ref} from "firebase/database";
// import  {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

import {initializeApp} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyB39IBJiE4OjuhHSG2oCOob_jAROJBfudA",
    authDomain: "auth-c1.firebaseapp.com",
    databaseURL: "https://auth-c1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "auth-c1",
    storageBucket: "auth-c1.appspot.com",
    messagingSenderId: "22652636656",
    appId: "1:22652636656:web:94a909cdf3e6a373b1a135"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

let signUp = document.getElementById("signUp");
let signIn = document.getElementById('signIn');

signUp.addEventListener("click", (e) => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                username: username,
                email: email
            };
            set(ref(database, "users/" + user.uid), userData).then(() => {
                console.log("success");
            }).catch((error) => {
                console.log(error.message);
            });
        }).catch((error) => {
            console.log(error.message);
        }
    );
});

signIn.addEventListener("click", (e) => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const date = new Date();

            update(ref(database, "users/" + user.uid), {
                last_login: date,
            })
            console.log('logged in');
            window.location.href = 'http://google.com';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
})


