import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

function Login() {
  const history=useHistory()
  const host = "http://localhost:5000"
  const [user, setUser] = useState({ email: "", password: "" })
  const handleChange = (ev) => {
    setUser({ ...user, [ev.target.name]: ev.target.value })
  }

  const handleclick = async (e) => {
    e.preventDefault()
    let email = user.email
    let password = user.password
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
    const json = await response.json();
    if (json.valid) {
      console.log(json)
      localStorage.setItem('patient-token',json.authtoken)
      history.push('/dashboard')
    }
    else{
      alert('Give proper Values')
    }
    setUser({ email: "", password: "" })
  }

  return (
    <div className="container">
      <h2 className='my-4'>Login To Use The App</h2>
      <form onSubmit={handleclick}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.email} name='email' onChange={handleChange} required/>
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={user.password} onChange={handleChange} required/>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login