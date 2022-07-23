import React, { useContext, useEffect, useRef } from 'react'
import presContext from "../context/prescimages/presContext"
import AddprescImg from './AddprescImg'
import PrescItem from './PrescItem';

function DashBoard() {
  const refr = useRef(null)
  const context = useContext(presContext);
  const { presimage, getImages,Updateimage } = context;
  const handleupdate=()=>{
    
  }
  useEffect(() => {
    getImages()
  }, [])
  // Backend\images\1657990448505-redmi10s.jpg
  return (
    <>
      <AddprescImg />
      <button ref={refr} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handlesubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="Prescription Image" className="form-label">Prescription Image</label>
                  <input type="file" className="form-control" id="Title" name='image' aria-describedby="emailHelp" onChange={fileChangehandle} required minLength={5} />
                </div>
                <br />
                <br />
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <div className="row my-3">
          <h2>Your Prescription Images</h2>
          {presimage.map((presimg, key) => {
            return <PrescItem prescimgs={presimg} key={key} updateimg={handleupdate}/>
          })}
        </div>
      </div>
    </>
  )
}

export default DashBoard