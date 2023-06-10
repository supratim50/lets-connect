import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {firebaseApp} from "./firebase";

const firebaseAuth = getAuth(firebaseApp);

export const signupUser = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
}