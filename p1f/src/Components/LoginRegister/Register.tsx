import axios from "axios";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Container, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface User {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export const Register: React.FC = () => {  

    const [newUser, setNewUser] = useState<User>({
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    })

    const navigate = useNavigate()

    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewUser((newUser) => ({...newUser, [name]: value}))
        console.log(newUser)
    }

    const register = async () => {
        const response = await axios.post("http://localhost:8080/users", newUser, {withCredentials:true})
        .then(()=>{
            alert("User " + newUser.username + " created!")
            navigate("/")
        })
        .catch(()=>{alert("Registration failed! Make sure all fields are correct")})
    }
    

	return (
		<Container className="d-flex align-items-center flex-column mt-5">
			<h3>Register</h3>

            <div>
                <Form.Control
                    type="text"
                    placeholder="First Name"
                    name = "firstName"
                    onChange={storeValues}
                />
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={storeValues}
                />
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
            <div className="d-flex gap-1">
            <button onClick={register}>Register</button>
            <button onClick={() => navigate("/")}>Back</button>
            </div>

        </Container>
	);
};



