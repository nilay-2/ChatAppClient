// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfNMFZE-W4AZAdmBH4sWqv7E4VmRKX6MY",
  authDomain: "discordcloneimages.firebaseapp.com",
  projectId: "discordcloneimages",
  storageBucket: "discordcloneimages.appspot.com",
  messagingSenderId: "307613292082",
  appId: "1:307613292082:web:2fb153b4127b81a5b90e2b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
