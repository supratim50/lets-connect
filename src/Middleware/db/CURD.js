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
    arrayRemove,
    onSnapshot
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

// UPDATE PROFILE IMG
export const updateProfileImg = (file, id, email, setProgress, setfilePath, setIsLoading) => {
    try {
        setIsLoading &&  setIsLoading(true);
        const storageRef = ref(storage, `uploads/profileImages/${email}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress && setProgress(progress);
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                setfilePath(downloadURL);
                await updateDoc(doc(firestore, 'users', id), {
                    "profileUrl": downloadURL
                })
            });
            
            setIsLoading && setIsLoading(false);
        }
        );
    } catch(e) {
        return e;
    }
}

// UPDATE PROFILE IMG
export const updateCoverPhoto = (file, id, email, setProgress, setfilePath, setIsLoading) => {
    try {
        setIsLoading &&  setIsLoading(true);
        const storageRef = ref(storage, `uploads/coverImages/${email}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress && setProgress(progress);
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                setfilePath(downloadURL);
                await updateDoc(doc(firestore, 'users', id), {
                    "coverPhoto": downloadURL
                })
            });
            
            setIsLoading && setIsLoading(false);
        }
        );
    } catch(e) {
        return e;
    }
}

// UPDATE PROFILE IMG
export const updateCoverImg = (file, id, email, setProgress, setfilePath, setIsLoading) => {
    try {
        setIsLoading &&  setIsLoading(true);
        const storageRef = ref(storage, `uploads/coverImages/${email}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress && setProgress(progress);
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                setfilePath(downloadURL);
                await updateDoc(doc(firestore, 'users', id), {
                    "coverPhoto": downloadURL
                })
            });
            
            setIsLoading && setIsLoading(false);
        }
        );
    } catch(e) {
        return e;
    }
}




// UPLOAD FOR POST
export const uploadFileForPosts = async (file, email, setProgress, setfilePath, setIsLoading) => {
    setIsLoading &&  setIsLoading(true);
    const storageRef = ref(storage, `uploads/posts/${email}-${uuidv4()}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress && setProgress(progress);
    }, 
    (error) => {
        // Handle unsuccessful uploads
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setfilePath(downloadURL);
        });
        
        setIsLoading && setIsLoading(false);
    }
    );

}
export const setUserData = async (name, userName, email, profileImg, uid, coverPhoto) => {
    const user =  await addDoc(collection(firestore, 'users'), {
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
    });

    return await updateDoc(doc(firestore, 'users', user.id), {
        id: user.id
    })
}
// UPDATRE USER DATA
export const updateUserdata = async (id, data) => {
    const userRef = doc(firestore, "users", id);
    await updateDoc(userRef, data);
}

// POSTS
export const setPostData = async ( userId, postImg, caption) => {
    const post = await addDoc(collection(firestore, 'posts'), {
        userId,
        image: postImg,
        caption,
        postedTime: Date.now(),
        likes: [],
        comments: []
    })

    await updateDoc(doc(firestore, 'posts', post.id), {
        id: post.id
    })

    return post.id;
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

    try{
        const userRef = collection(firestore, "users");
        const q = query(userRef, where("name", "==", userName));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // adding data to an array 
            users = [...users, {...doc.data()}]
        });

        return users;
    } catch {
    } 

}

export const getUserById = async (uid, setUser) => {
    // let user = {};
    try{
        const userRef = collection(firestore, "users");
        const q = query(userRef, where("uid", "==", uid));
        // REALETIME DATA OF UER
        // ---------------------
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUser({...doc.data(), id: doc.data().id})
            });
          });
        // ONE TIME 
        // ---------
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //     // adding data to an array 
        //     user = {...doc.data(), id: doc.data().id};
        // });
        // return user;
    } catch (e){
        console.log(e);
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
    }

    return posts;
}