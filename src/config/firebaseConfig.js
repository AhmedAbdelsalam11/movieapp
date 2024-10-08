
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFZSOThxOrUN8199Z38AD5mEQyUSs35CI",
  authDomain: "movie-auth-4b01d.firebaseapp.com",
  projectId: "movie-auth-4b01d",
  storageBucket: "movie-auth-4b01d.appspot.com",
  messagingSenderId: "763186553548",
  appId: "1:763186553548:web:d9fc380990bc6a39a99869",
  measurementId: "G-NJGGQ3QX0R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };