import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDxYQIpxJrJNFGgfbl0ud4gYjGnndpqFzw",
    authDomain: "portfolio-hichamhr.firebaseapp.com",
    projectId: "portfolio-hichamhr",
    storageBucket: "portfolio-hichamhr.appspot.com",
    messagingSenderId: "966100435733",
    appId: "1:966100435733:web:4f05df35bb7456976c9f1c",
    measurementId: "G-DNM0FKWJNV"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)
