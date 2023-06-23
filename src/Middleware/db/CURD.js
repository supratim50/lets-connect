import {v4 as uuidv4 } from "uuid";
import {firebaseApp} from "./firebase";

import {getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {
    getFirestore, 
    collection, 
    addDoc, 
    query, 
    where, 
    getDocs, 
    Timestamp, 
    getDoc, 
    updateDoc, 
    doc, 
    arrayUnion,
    arrayRemove
} from "firebase/firestore";

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
export const uploadFileForPosts = async (file, email, setProgress, setfilePath, setIsLoading) => {
    setIsLoading(true);
    const storageRef = ref(storage, `uploads/posts/${email}-${uuidv4()}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);
    }, 
    (error) => {
        // Handle unsuccessful uploads
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setfilePath(downloadURL);
        });
        
        setIsLoading(false);
    }
    );

}
export const setUserData = async (name, userName, email, profileImg, uid, coverPhoto) => {
    return await addDoc(collection(firestore, 'users'), {
        uid,
        name,
        userName,
        email,
        about: "",
        skills: "",
        location: "",
        followers: [],
        following: [],
        coverPhoto,
        profileUrl: profileImg
    })
}

export const setPostData = async (name, email, profileImg, postImg, caption) => {
    return await addDoc(collection(firestore, 'posts'), {
        name,
        email,
        profileImg,
        image: postImg,
        caption,
        postedTime: Date.now(),
        likes: [],
        comments: []
    })
}

export const likingPost = async (postId, userId) => {
    return await updateDoc(doc(firestore, "posts", postId), {
        likes: arrayUnion(userId)
      });
}
export const likeUndo = async (postId, userId) => {
    return await updateDoc(doc(firestore, "posts", postId), {
        likes: arrayRemove(userId)
      });
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
        });

        return users;
    } catch {
        console.log("User is not found")
    } 

}

export const getUserById = async (uid) => {

    let users = [];
    try{
        const userRef = collection(firestore, "users");
        const q = query(userRef, where("uid", "==", uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // adding data to an array 
            users = [...users, {...doc.data()}]
        });
        console.log("CURD",users);
        return users;
    } catch {
        console.log("User is not found")
    } 

}

export const getPosts = async () => {
    let posts = [];
    try {
        const postsSnapshot = await getDocs(collection(firestore, "posts"));
        postsSnapshot.forEach((post) => {
            posts.push({...post.data(), id: post.id});
        })
    } catch(e) {
        console.log(e.message);
    }

    return posts;
}