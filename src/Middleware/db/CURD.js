import {v4 as uuidv4 } from "uuid";
import {firebaseApp} from "./firebase";

import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {getFirestore, collection, addDoc, query, where, getDocs} from "firebase/firestore";

const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const uploadFile = async (file, email) => {
    try{
        const imageRef = ref(storage, `uploads/profileImages/${email}`);
        const imageUrl = await uploadBytes(imageRef, file);
        return await getDownloadURL(ref(storage, imageUrl.ref.fullPath));
    } catch(e) {
        return e
    }
}
export const setUserData = async (name, userName, email, profileImg, uid) => {
    return await addDoc(collection(firestore, 'users'), {
        uid,
        name,
        userName,
        email,
        profileUrl: profileImg
    })
}

// READ DATA
export const getUser = async (userName) => {

    let users = [];

    console.log("search.. ", userName)
    try{
        console.log("searching...");
        const userRef = collection(firestore, "users");
        const q = query(userRef, where("name", "==", userName));

        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot.data());
        console.log("Allmost there...", querySnapshot);
        querySnapshot.forEach((doc) => {
            // adding data to an array 
            users = [...users, {...doc.data()}]
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // console.log(users);
        });

        return users;
    } catch {
        console.log("User is not found")
    } 

}