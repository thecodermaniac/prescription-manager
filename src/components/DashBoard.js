import React, { useContext,useEffect } from 'react'
import presContext from "../context/prescimages/presContext"
import AddprescImg from './AddprescImg'
import PrescItem from './PrescItem';

function DashBoard() {
    const context = useContext(presContext);
    const { presimage ,getImages } = context;
    useEffect(() => {
        getImages()
    }, [])
    // Backend\images\1657990448505-redmi10s.jpg
  return (
    <>
    <AddprescImg/>
    <div className="container my-3">
                <div className="row my-3">
                    <h2>Your Prescription Images</h2>
                    {presimage.map((presimg,key) => {
                        return <PrescItem prescimgs={presimg} key={key}/>
                    })}
                </div>
            </div>
    </>
  )
}

export default DashBoard