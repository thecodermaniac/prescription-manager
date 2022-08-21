import React, { useEffect } from 'react'
import {
    Link,
    useLocation,
    useHistory
} from "react-router-dom";

function NavBar() {
    const history = useHistory()
    let location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('patient-token')
        history.push('/login')
    }
    useEffect(() => {
        console.log(location)
    }, [location]);
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <Link className="navbar-brand" to="/">Note It</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                            <li class="nav-item">
                                <Link className={`nav-link ${location.pathname === '/dashboard' ? "active" : ""}`} aria-current="page" to="/dashboard">DashBoard</Link>
                            </li>

                            <li class="nav-item">
                                <Link className={`nav-link ${location.pathname === '/profile' ? "active" : ""}`} to="/profile">Profile</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('patient-token') ? <form class="d-flex">
                            <Link class="btn btn-dark" to="/login" role="button">Login</Link>
                            <Link class="btn btn-dark ms-4" to="/signUp" role="button">SignUp</Link>
                        </form> : <form class="d-flex"><button type="button" class="btn btn-dark" onClick={handleLogout}>Log Out</button></form>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar


