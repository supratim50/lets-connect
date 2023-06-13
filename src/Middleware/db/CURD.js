import {v4 as uuidv4 } from "uuid";
import {firebaseApp} from "./firebase";

import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {getFirestore, collection, addDoc} from "firebase/firestore";

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
// export const getImage = async (path) => {
//     return await getDownloadURL(ref(storage, path));
// }

export const setUserData = async (name, userName, email, profileImg, uid) => {
    return await addDoc(collection(firestore, 'users'), {
        uid,
        name,
        userName,
        email,
        profileUrl: profileImg
    })
}