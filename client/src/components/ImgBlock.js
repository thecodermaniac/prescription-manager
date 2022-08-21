import React, { useContext, useEffect, useRef, useState } from 'react'
import presContext from "../context/prescimages/presContext"
import AddprescImg from './AddprescImg'
import PrescItem from './PrescItem';

function ImgBlock() {
  const refr = useRef(null)
  const context = useContext(presContext);
  const { presimage, getImages,Updateimage} = context;
  useEffect(() => {
    getImages()
  }, [])
  const [filedata, setfiledata] = useState()
    const fileChangehandle = (e) => {
        setfiledata(e.target.files[0])
    }
    const [pres_id,setpres_id]=useState('')
    const handleupdate = (currentpres) => { //img item theke ene ekhane save kora
      console.log('updating');
      refr.current.click()
      setpres_id(currentpres._id)
  }

  const handleclick=()=>{
    const data = new FormData()
    data.append("upimage",filedata)
    Updateimage(pres_id,data)
  }
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
              <h5 class="modal-title" id="exampleModalLabel">Update Prescription</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="Prescription Image" className="form-label">Prescription Image</label>
                  <input type="file" className="form-control" id="Title" name='upimage' aria-describedby="emailHelp" onChange={fileChangehandle} />
                </div>
                <br />
                <br />
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
            console.log(presimg);
            return <PrescItem prescimgs={presimg} key={key} updateimg={handleupdate}/>
          })}
        </div>
      </div>
    </>
  )
}

export default ImgBlock