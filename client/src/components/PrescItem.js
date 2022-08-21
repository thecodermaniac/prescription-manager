import React, { useContext } from 'react'
import presContext from "../context/prescimages/presContext"
// public\uploads\1657997531645-FB_IMG_1654938387684.jpg
function PrescItem(props) {
    const context=useContext(presContext)
    const {Deleteimage}=context
    const { prescimgs,updateimg } = props
    const handleDelete=()=>{
        Deleteimage(prescimgs._id)
    }
   
    return (
        <div class="card" style={{ width: "18rem" }}>
            <img src={`/uploads/${prescimgs.pres_image}`} class="card-img-top" alt="..." style={{"height":'262px',"objectFit":'cover'}}/>
            <div class="card-body">
                <h5 class="card-title">{prescimgs.date}</h5>
                <div class="d-flex justify-content-around">
                    <button type="button" class="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
                    <button type='button' class="btn btn-outline-success" onClick={() => { updateimg(prescimgs) }}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default PrescItem