import {useState} from "react";
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let agree = false
    const onSubmit = async(e) =>{
        //Prevents page refresh
        e.preventDefault()

        agree = document.getElementById("agree").checked === true;

        const data = {
            username,
            password,
            agree
        }
        const url = "http://127.0.0.1:5000/login"
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if(response.status !== 200){
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
        </form>
    );
};

export default Login;