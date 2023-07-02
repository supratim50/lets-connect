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
            console.log('Upload is ' + progress + '% done');
            setProgress && setProgress(progress);
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
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
            console.log('Upload is ' + progress + '% done');
            setProgress && setProgress(progress);
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
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
            console.log('Upload is ' + progress + '% done');
            setProgress && setProgress(progress);
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
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
    const storageRef = ref(storage, `uploads/posts/${email}}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress && setProgress(progress);
    }, 
    (error) => {
        // Handle unsuccessful uploads
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
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
    console.log(id, data);
    const userRef = doc(firestore, "users", id);
    await updateDoc(userRef, data);
}

// POSTS
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

export const getUserById = async (uid, setUser) => {
    // let user = {};
    try{
        const userRef = collection(firestore, "users");
        const q = query(userRef, where("uid", "==", uid));
        // REALETIME DATA OF UER
        // ---------------------
        onSnapshot(q, (querySnapshot) => {
            console.log(querySnapshot);
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