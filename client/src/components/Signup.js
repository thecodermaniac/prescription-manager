import React, { useState } from 'react'
import { useHistory } from "react-router-dom"



function Signup() {
    const history = useHistory()
    const host = "http://localhost:5000"
    const [newuser, setnewUser] = useState({ name: "", email: "", password: "" })
    const handleChange = (ev) => {
        setnewUser({ ...newuser, [ev.target.name]: ev.target.value })
    }

    const handleclick = async (e) => {
        e.preventDefault()
        let name = newuser.name
        let email = newuser.email
        let password = newuser.password
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json();
        if (json.valid) {
            console.log(json)
            localStorage.setItem('patient-token', json.authtoken)
            history.push('/dashboard')
        }
        else {
            alert('Give proper Values')
        }
        setnewUser({ name: "", email: "", password: "" })
    }
  return (
    <div className='container'>
            <h2 className='my-4'>New User SignUp</h2>
            <form onSubmit={handleclick}>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" id="UserName" aria-describedby="emailHelp" name='name' onChange={handleChange} />
                    <div id="nameHelp" class="form-text">Eg:- Aritra Mondal</div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" id="UserEmail" aria-describedby="emailHelp" name='email' onChange={handleChange} />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" id="UserPassword" name='password' onChange={handleChange} />
                </div>
                <button type="submit" class="btn btn-primary">Sign up</button>
            </form>
        </div>
  )
}

export default Signup