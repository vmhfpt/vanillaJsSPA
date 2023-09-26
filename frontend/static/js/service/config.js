// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
// import {  getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import { getStorage } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";
     export default class Config {
            constructor() {
                this.firebaseConfig = {
                    apiKey: "AIzaSyCM2oyggNJRserxaoa-Z62j5aH3SUo9LTs",
                    authDomain: "polyshop-d2f3a.firebaseapp.com",
                    projectId: "polyshop-d2f3a",
                    storageBucket: "polyshop-d2f3a.appspot.com",
                    messagingSenderId: "948480774165",
                    appId: "1:948480774165:web:a1a8be39e665b6fc62be1c"
                };
                this.app = initializeApp(this.firebaseConfig);
                this.db = getFirestore(this.app);
                this.storage = getStorage(this.app);
                
            }
        }