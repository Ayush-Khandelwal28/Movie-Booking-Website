import React, {useEffect,useState} from "react"
import axios from "axios"
import './Login.scss'
import {useNavigate, Link} from "react-router-dom" 
function Login(){
    const history=useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    async function submit(e){
        e.preventDefault();
        try{
        await axios.post("http://localhost/login",{
            email,password
        }) 
        .then(res=>{
            if(res.data=="exist"){
                history("/home",{state:{id:email}}); // redirect to home page
            }
            else if(res.data=="notexist"){
                alert("User have not signed up yet")
            }
            else if(res.data=="wrong password"){
                alert("Wrong password")
            }
        }) 
        .catch(e=>{
            alert("Login failed");
            console.log(e)
        })
    }
    catch(e)
        {
            console.log(e)
        }
    }
    return (
        <div className="Login">
            <h1>Login to MovieMania</h1>
            <form method="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"/>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password"/>
                <input type="submit" onClick={submit}/>
            </form>
            <br/>
            <p>Not an existing user ?</p>
            <Link to="/signup">Create a new account</Link>
        </div>
    )
}
export default Login