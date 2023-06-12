import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {firebaseApp} from "./firebase";

export const firebaseAuth = getAuth(firebaseApp);

export const signupUser = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
}

export const signinUser = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
}