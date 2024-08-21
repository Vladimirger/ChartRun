import {useState} from "react";
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const onSubmit = async(e) =>{
        //Prevents page refresh
        e.preventDefault()

        const agree = document.getElementById("agree").checked === true;

        const data = {
            username,
            password,
            agree
        }
        const url = "http://127.0.0.1:5000/login"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        console.log(data)
        const response = await fetch(url, options)
        console.log(response.message)
        if(response.status === 200){

        }else{

        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>username:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label>password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                <label>agree to terms and conditions</label>
                <input type="checkbox" id="agree"/>
            </div>
            <button type="submit"></button>
        </form>
    );
};

export default Login;