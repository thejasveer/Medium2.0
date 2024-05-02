 
import {useEffect, useMemo, useRef} from 'react';
import { ImgAtom, reviewToggleAtom } from '../store/EditorAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useBlogCrud } from '../hooks/apis';
import { imageDb } from '../utils/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
export const ImageIO = ({ imgSrc,placeholderId }:{imgSrc: string,placeholderId:string}) => {
    const review= useRecoilValue(reviewToggleAtom)
    const [img,setImg]= useRecoilState(ImgAtom)
    const { manageImage} = useBlogCrud(placeholderId)
    useEffect(()=>{
      setImg({...img,src:imgSrc})
    },[])
    useEffect(()=>{
       
      manageImage()
  },[img])
    const fileInputRef = useRef<any>(null);

    const handleImageInsert = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        
        const imageRef= await  ref(imageDb,`${uuidv4()}`)
        console.log("imageRef",imageRef)
        uploadBytes(imageRef, file).then((snapshot) => {
          console.log("File uploaded successfully!");
        
          // Get the download URL for the file
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImg({src:downloadURL,newSrc: downloadURL})
            // Now you can use the downloadURL to display the image or do whatever you need
          }).catch((error) => {
            // Handle any errors that occurred while retrieving the download URL
            console.error("Error getting download URL:", error);
          });
        }).catch((error) => {
          // Handle any errors that occurred while uploading the file
          console.error("Error uploading file:", error);
        });
       
          
        };
     
    };
    const height = useMemo(()=>{
      return review ? 'h-62': 'h-96'
    },[review])
  
    return (
      <>
  
        <div style={{ backgroundImage:  `url(${img.src})`,height: height }} className={`bg-slate-200   ${height} bg-cover bg-center   flex justify-center items-center p-10`}   onClick={handleImageInsert}>
          { review && <div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            { img.src ? <div className='font-extralight text-sm cursor-pointer bg-slate-900 p-2  border-2 border-slate-300  text-slate-200 rounded-full'>Change preview image
            </div>  :  <div className=' text-sm text-slate-600'>Include a high-quality image in your story to make it more inviting to readers.
            </div> }  
              </div> 
          }
       
        </div>
      </>
    );
  };