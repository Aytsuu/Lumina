import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyAoepqb3Nyt1Oo--Zl17jBSw7RcDMEMWKM",
    authDomain: "lumina-876fd.firebaseapp.com",
    databaseURL: "https://lumina-876fd-default-rtdb.firebaseio.com",
    projectId: "lumina-876fd",
    storageBucket: "lumina-876fd.appspot.com",
    messagingSenderId: "1092876361821",
    appId: "1:1092876361821:web:6024febe78d8bb089eadb4",
    measurementId: "G-TD448L7MJ8"
};

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export default database 