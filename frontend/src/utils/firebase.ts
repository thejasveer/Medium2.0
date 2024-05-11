// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain:  import.meta.env.VITE_AUTH_DOMAIN,
//   projectId:  import.meta.env.VITE_PROJECT_ID,
//   storageBucket:  import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId:  import.meta.env.VITE_MESSAGE_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId:  import.meta.env.VITE_MESSAGE_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyCH0cnyAZJpAUdnhzrPbdfmutxkWT622HM",
  authDomain: "medium-5c170.firebaseapp.com",
  projectId: "medium-5c170",
  storageBucket: "medium-5c170.appspot.com",
  messagingSenderId: "601789224220",
  appId: "1:601789224220:web:a8984b29142dcec16916d9",
  measurementId: "G-W4KHVKF9RV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)
console.log(imageDb)
 