import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut} from "firebase/auth";
import {firebaseApp} from "./firebase";

export const firebaseAuth = getAuth(firebaseApp);

export const signupUser = async (email, password, name, profileImage) => {
    const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    console.log(res.user)
    await updateProfile(res.user, {
        displayName: name,
        photoURL: profileImage
    })
    return res.user;
}

export const signinUser = async (email, password) => {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
}

export const userLogOut = () => {
    signOut(firebaseAuth);
}