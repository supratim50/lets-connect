import {v4 as uuidv4 } from "uuid";
import {firebaseApp} from "./firebase";

import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

const storage = getStorage(firebaseApp);

export const uploadFile = async (file) => {
    try{
        const imageRef = ref(storage, `uploads/profileImages/${uuidv4()}-${file.name}`);
        return await uploadBytes(imageRef, file);
    } catch(e) {
        return e
    }
}
export const getImage = async (path) => {
    return await getDownloadURL(ref(storage, path));
}