 
import {useEffect, useMemo, useRef, useState} from 'react';
import { ImgAtom, reviewToggleAtom } from '../store/EditorAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
 
import { imageDb } from '../utils/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
 
import { ButtonSpinner } from './ButtonSpinner';
export const ImageIO = ({ imgSrc }:{imgSrc: string}) => {
    const review= useRecoilValue(reviewToggleAtom)
    const [img,setImg]= useRecoilState(ImgAtom)
 
    const [loading,setLoading] =useState(true)
    useEffect(()=>{
   
      setImg({...img,src:imgSrc})
    
      setLoading(false)
    },[])
  
    const fileInputRef = useRef<any>(null);

    const handleImageInsert = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = async (event: any) => {
      setLoading(true)
      
     
      const file = event.target.files[0];
      if (file) {
         const imageRef= await  ref(imageDb,`${uuidv4()}`)
         uploadBytes(imageRef, file).then((snapshot) => {
         
          // Get the download URL for the file
          getDownloadURL(snapshot.ref).then( async(downloadURL) => {
        
            // await   manageImage(setLoading)
              setImg({src:downloadURL,newSrc: downloadURL})
              setLoading(false)
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

    const removeImg= ()=>{
      setImg({...img,src:"",newSrc:""})
    
    }
    const height = useMemo(()=>{
      return review ? 'h-62': 'h-96'
    },[review])
  
    return imgSrc=="" && !review ?(""):(
      <>
       <div style={{ backgroundImage:  `url(${img.src})`,height: height }} className={`relative bg-slate-200 drop-shadow-md  ${height} bg-cover bg-center  rounded-lg flex justify-center items-center p-10`}  >
          {loading ? (
          <div><ButtonSpinner/></div>
        ) : (
          review && (
            <div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            { img.src ? (
              <div>
                <div className=''>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 absolute -top-8 right-1  text-slate-700" onClick={removeImg}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  </div >
                    <div className='font-extralight text-sm cursor-pointer bg-slate-900 p-2  border-2 border-slate-300  text-slate-200 rounded-full' onClick={handleImageInsert}>Change preview image

              </div> 
              </div>
        
          ) :(  <div  className=' text-sm text-slate-600 flex   justify-center items-center  gap-1 cursor-pointer' onClick={handleImageInsert}>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg> <p>
          Include a high-quality image in your story to make it more inviting to readers.</p>
                      </div>) }  
            </div>
          ) 
        )
   
      }
       </div>
      </>
    );
  };