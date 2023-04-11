import { useEffect, useState } from "react";

export default function ImageUploader({name,oldfile,isrequired} ){
    const [img,setImage]=useState('');
    const [hasImage,setHasImage]=useState(false);
    useEffect(() => {
        setImage(oldfile??'');
        setHasImage(oldfile)
    },[])


    

    const imageLoaded=event=>{
        try {
            const files=event.target.files;
            console.log(files);
            if(files.length>0){
                setImage(URL.createObjectURL(event.target.files[0]));

            }else{
                setImage('');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const id= "image"+new Date().getTime();
    return (
        <label htmlFor={id} className="imageUploader">
            <input type="file" accept="image/*" className="d-none" required={isrequired} name={name} id={id} onChange={imageLoaded}></input>
            {
                img!=''?
                (<div className="imageHolder">
                    <img alt="localimage" src={img} className="h-100"/>
                </div>)
                :
                (<div className="imageHolder">
                    Please Click to Select a image
                </div>)
            }
        </label>
    )
}