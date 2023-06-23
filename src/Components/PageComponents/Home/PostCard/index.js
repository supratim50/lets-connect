import React, { useContext, useState } from 'react';
import "./PostCard.style.css";

import { PostContext } from '../../../../contexts/PostContext';

import ContentCard from '../../../Common/Crads/ContentCard';
import RoundedImage from '../../../Common/Images/RoundedImage';

import TextInput from '../../../Common/Input/TextInput/TextInput';
import IconTextButton from '../../../Common/Buttons/IconTextButton';
import PrimaryBtn from '../../../Common/Buttons/PrimaryBtn';
import {IoImage, IoPlayCircle, IoListCircle, IoCalendar} from "react-icons/io5";

import { setPostData, uploadFileForPosts } from '../../../../Middleware/db/CURD';

const PostCard = ({currentUser}) => {

  const {dispatch} = useContext(PostContext);

  const [textValue, setTextValue] = useState("");
  const [filePath, setfilePath] = useState("");
  const [progress, setProgress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // FILE UPLOAD
  const fileHandler = (e) => {
    uploadFileForPosts(e.target.files[0], currentUser.email, setProgress, setfilePath, setIsLoading);
  }

  const post = async () => {

    if(textValue === "" && progress === "" ) {
      return
    } else if(progress !== "" && progress < 100) {
      return
    } else {
      console.log(filePath)
        try{
          const post = await setPostData(currentUser.name, currentUser.email, currentUser.profileUrl, filePath, textValue);
          dispatch({type: "ADD", payload: {
            id: post.id,
            caption: textValue,
            name: currentUser.name,
            email: currentUser.email,
            profileImg: currentUser.profileUrl,
            postedTime: Date.now(),
            image: filePath
          }})
          setTextValue("");
          setfilePath("");
          setProgress("");
        } catch(e) {
          console.log("Couldn't Upload your POST!", e);
        }
    }

  }


  return (
    <ContentCard classes={"py-2 px-3"}>
        <div className='flex align-center px-1'>
            <div >
                <RoundedImage image={currentUser.profileUrl ? currentUser.profileUrl : ''} classes={"medium"} />
            </div>
            <TextInput 
              placeholder={"What's Happening?"} 
              classes={"ml-2 p-2"} 
              inputClass={"paragraph text-paragraph"} 
              resize 
              onChange={setTextValue} 
              value={textValue} 
            />
        </div>
        {/* FOR UPLOAD PROGRESS */}
        <div className='my-1 flex justify-end'>
        {
          progress === ""
          ? ""
          : progress == 100 
          ? <p className='px-2 ml-3 paragraph text-pass'>Upload Completed.</p>  
          : <p className='px-2 ml-3 paragraph text-pass'>Upload is {Math.round(progress)}% done</p> 
        }
        </div>
        <div className='py-2 px-1 flex justify-end'>
          <label for="file">
            <IconTextButton 
              classes={"px-4 py-2 mr-3"} 
              iconClasses={"green"} 
              icon={<IoImage />} 
              text={"Photo"} 
            />
          </label>
          <input type='file' id="file" onChange={fileHandler} />
          <IconTextButton classes={"px-4 py-2 mr-3"} iconClasses={"blue"} icon={<IoPlayCircle />} text={"Video"} />
          <IconTextButton classes={"px-4 py-2 mr-3"} iconClasses={"red"} icon={<IoListCircle />} text={"Story"} />
          {
            isLoading
            ? <PrimaryBtn text={"Uploading"} maxWidth />
            : <PrimaryBtn text={"Post"} maxWidth onClick={post} />
          }
          
        </div>
    </ContentCard>
  )
}

export default PostCard;