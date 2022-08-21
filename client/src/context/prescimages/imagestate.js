import { useState } from "react"
import ImageContext from './presContext'


const ImageState = (props) => {
    const host = "http://localhost:5000"

    const Initpres = []
    const [presimage, setpresimg] = useState(Initpres)
    const getImages = async () => {
        // API Call 
        const response = await fetch(`${host}/api/presc/fetchallpresc`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('patient-token')
            }
        });
        const json = await response.json()
        console.log(json)
        setpresimg(json)
    }

    const Addimage = async (file) => {
        const response = await fetch(`${host}/api/presc/addimage`, {
            method: 'POST',
            headers: {
                "auth-token": localStorage.getItem('patient-token')
            },
            body: file
        });

        getImages()
    }

    const Deleteimage = async (id) => {
        console.log(`the required id: ${id}`)
        const response = await fetch(`${host}/api/presc/deletepresc/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('patient-token')
            },
        });
        var newpres = presimage.filter((img) => { return img._id !== id })
        setpresimg(newpres)
    }

    const Updateimage= async (id,file)=>{
        console.log(`the required id: ${id}`)
        console.log(file?.filename);
        const response = await fetch(`${host}/api/presc/updateimg/${id}`, {
            method: 'PUT',
            headers: {
                "auth-token": localStorage.getItem('patient-token')
            },
            body: file
        });
        getImages()
    }

    return (
        <ImageContext.Provider value={{ presimage, getImages, Addimage, Deleteimage,Updateimage }}>
            {props.children}
        </ImageContext.Provider>
    )
}



export default ImageState