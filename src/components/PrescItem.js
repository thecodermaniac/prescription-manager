import React from 'react'
// public\uploads\1657997531645-FB_IMG_1654938387684.jpg
function PrescItem(props) {
    const { prescimgs } = props
    return (
        <div class="card" style={{ width: "18rem" }}>
            <img src={`/uploads/${prescimgs.pres_image}`} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">{prescimgs.date}</h5>
                <div class="d-flex justify-content-around">
                    <button type="button" class="btn btn-outline-success">Update</button>
                    <button type="button" class="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default PrescItem