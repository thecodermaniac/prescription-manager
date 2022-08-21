import React from 'react'
import { useHistory } from "react-router-dom"
import ImgBlock from './ImgBlock'

function DashBoard() {
const history= useHistory()
  return (
    <>
      {localStorage.getItem('patient-token')? <ImgBlock/> :history.push('/SignUp')}
    </>
  )
}

export default DashBoard