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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMWEwYjI4YWEyYWU0MWQyYjRjZDMxIn0sImlhdCI6MTY1NzkwNTMzMH0.VRSow5MQ15X4oMAA2UFSc3SZF-qDD4O0SoiDedppRCU"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMWEwYjI4YWEyYWU0MWQyYjRjZDMxIn0sImlhdCI6MTY1NzkwNTMzMH0.VRSow5MQ15X4oMAA2UFSc3SZF-qDD4O0SoiDedppRCU"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMWEwYjI4YWEyYWU0MWQyYjRjZDMxIn0sImlhdCI6MTY1NzkwNTMzMH0.VRSow5MQ15X4oMAA2UFSc3SZF-qDD4O0SoiDedppRCU"
            },
        });
        var newpres = presimage.filter((img) => { return img._id !== id })
        setpresimg(newpres)
    }

    const Updateimage= async (id,file)=>{
        console.log(`the required id: ${id}`)
        const response = await fetch(`${host}/api/presc/updateimg/${id}`, {
            method: 'PUT',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMWEwYjI4YWEyYWU0MWQyYjRjZDMxIn0sImlhdCI6MTY1NzkwNTMzMH0.VRSow5MQ15X4oMAA2UFSc3SZF-qDD4O0SoiDedppRCU"
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