import React, { useEffect, useState } from "react"
import axios from "axios"
import './Login.scss'
import { useNavigate, Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function Login() {
    const history = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const auth = useAuth();
    async function submit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost/login", {
                email, password
            })
                .then(res => {
                    if (res.data == "notexist") {
                        console.log(res);
                        alert("User have not signed up yet")
                    }
                    else if (res.data != "") {
                        auth.login(res.data.token);
                        console.log(res.data.token);
                        localStorage.setItem('token',res.data.token);
                        localStorage.setItem('user',res.data.id);
                        history("/", { state: { id: email } }); // redirect to home page
                    }
                    else if (res.data == "") {
                        alert("Wrong password")
                    }
                })
                .catch(e => {
                    alert("Login failed");
                    console.log(e)
                })
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="Login">
            <h1>Login to MovieMania</h1>
            <form method="POST">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="password" />

                <input type="submit" onClick={submit} />

            </form>
            <br />
            <p>Not an existing user ?</p>
            <Link to="/signup">Create a new account</Link>
        </div>
    )
}
export default Login