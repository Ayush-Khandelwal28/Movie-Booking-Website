import React, { useEffect, useState } from "react"
import axios from "axios"
import './SignUp.scss'
import { useNavigate, Link } from "react-router-dom"
function SignUp() {
    const history=useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    async function submit(e) {
        e.preventDefault();
        if (password !== confirmpassword) {
            setPasswordsMatch(false);
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long!!")
            return;
        }
        if (firstname.length == 0) {
            alert("One or more fields cannot be empty!!")
            return;
        }
        if (lastname.length == 0) {
            alert("One or more fields cannot be empty!!")
            return;
        }
        if (email.length == 0) {
            alert("One or more fields cannot be empty!!")
            return;
        }
        
        try {
            await axios.post("http://localhost/signup", {
                email, firstname, lastname, password, confirmpassword
            })
                .then(res => {
                    if (res.data === "exist") {
                        alert("User already exists");
                    }
                    else {
                        console.log("data is"+res.data);
                        localStorage.setItem('token',res.data.token);
                        localStorage.setItem('user',res.data.id);
                        history("/", { state: { id: email } }); // redirect to home page
                    }
                })
                .catch(e => {
                    alert("Sign Up failed");
                    console.log(e)
                })
        }
        catch (e) {
            console.log(e)
        }
    }
    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
        setPasswordsMatch(event.target.value === password);
    }
    return (
        <div className="SignUp">
            <h1>Welcome to MovieMania</h1>
            <form method="POST">
                <label>
                    Email    
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" required/>
                </label>
                <label>
                    First Name
                    <input type="text" onChange={(e) => { setFirstName(e.target.value) }} placeholder="First Name" required/>
                </label>
                <label>
                    Last Name
                    <input type="text" onChange={(e) => { setLastName(e.target.value) }} placeholder="Last Name" required/>
                </label>
                <label>
                    Password
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" required/>
                </label>
                <label>
                    Confirm Password
                    <input type="password" value={confirmpassword} onChange={handleConfirmPasswordChange} placeholder="Confirm password" required/>
                </label>
                {!passwordsMatch && <p>Passwords do not match</p>}
                <input type="submit" onClick={submit} />
            </form>
            <br />
            <p>Already an existing user ?</p>
            <Link to="/login">Login</Link>
        </div>
    )
}
export default SignUp