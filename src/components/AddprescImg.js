import React, { useContext, useState } from 'react'
import presContext from "../context/prescimages/presContext"

function AddprescImg() {
    const context = useContext(presContext);
    const { Addimage } = context;
    const [filedata, setfiledata] = useState()
    const fileChangehandle = (e) => {
        setfiledata(e.target.files[0])
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("image",filedata)
        console.log(filedata)

Addimage(data)
    }
    return (
        <div className="container my-3">
            <h2 className='my-3'>Add Image</h2>
            <form onSubmit={handlesubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label htmlFor="Prescription Image" className="form-label">Prescription Image</label>
                    <input type="file" className="form-control" id="Title" name='image' aria-describedby="emailHelp" onChange={fileChangehandle} required minLength={5} />
                </div>
                <br />
                <br />
                <button type="submit" className="btn btn-primary">Add Notes</button>
            </form>
        </div>
    )
}

export default AddprescImg