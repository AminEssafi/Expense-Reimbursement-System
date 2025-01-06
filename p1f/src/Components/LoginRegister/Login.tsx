import axios from "axios";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { store } from "../../GlobalData/store";

export const Login: React.FC = () => {  

    const [loginCreds, setLoginCreds] = useState({
        username:"",
        password:""
    })

    const navigate = useNavigate()

    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setLoginCreds((loginCreds)=>({...loginCreds, [name]:value}))
    }


    const login = async () => {
        const response = await axios.post("http://localhost:8080/auth", loginCreds, {withCredentials:true})
        .then(
            (response) => {
                console.log(response)
                store.loggedInUser = response.data
                if(response.data.role === "employee"){
                    navigate("/Employees")
                } else {
                    navigate("/Managers")
                }
            }
        )
        .catch((error) => {
            console.log(error)
            alert(error.response.data)
            }
        )
    }

	return (
		<Container className="d-flex align-items-center flex-column mt-5">
			<h3>Login</h3>

            <div>
            <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={storeValues}
                />
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={storeValues}
                />
            </div>

            <button onClick={login}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
        </Container>

	);
};







