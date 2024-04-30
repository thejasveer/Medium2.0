 
import {useEffect, useMemo, useRef} from 'react';
import { ImgAtom, reviewToggleAtom } from '../store/EditorAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useBlogCrud } from '../hooks/apis';
export const ImageIO = ({ imgSrc,placeholderId }:{imgSrc: string,placeholderId:string}) => {
    const review= useRecoilValue(reviewToggleAtom)
    const [img,setImg]= useRecoilState(ImgAtom)
    const { updateBlog} = useBlogCrud(placeholderId)
    useEffect(()=>{
      setImg({...img,src:imgSrc})
    },[])
    useEffect(()=>{
 
      updateBlog()
  },[img])
    const fileInputRef = useRef<any>(null);

    const handleImageInsert = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imgData = new FormData()
          imgData.append('img',file)
          console.log(file)
          setImg({src:reader.result,new:imgData})
        };
        reader.readAsDataURL(file);
      }
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