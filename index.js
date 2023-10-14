import {initializeApp} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB39IBJiE4OjuhHSG2oCOob_jAROJBfudA",
    authDomain: "auth-c1.firebaseapp.com",
    projectId: "auth-c1",
    storageBucket: "auth-c1.appspot.com",
    messagingSenderId: "22652636656",
    appId: "1:22652636656:web:94a909cdf3e6a373b1a135"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();

let signUp = document.getElementById('signUp');
signUp.addEventListener('click', (e) => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user)
            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email,
            }).then(() => {
                console.log(true)
            })

            console.log('user created')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
})