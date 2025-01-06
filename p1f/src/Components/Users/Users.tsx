import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface User {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    role: string;
}



export const Users: React.FC = () => {  

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getAllUsers();
    }, [])

    const navigate = useNavigate()

    const getAllUsers = async () => {
        const response = await axios.get("http://localhost:8080/users", {withCredentials:true});

        setUsers(response.data);

        console.log(response.data)
    }

    const deleteUser = (userId:number) => async () => {
        try {
            await axios.delete(`http://localhost:8080/users/delete/${userId}`, {withCredentials:true});
            getAllUsers();
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    }

    return (
        <Container>
            <h1>All Users</h1>
            <button onClick={() => (navigate("/"))}>Log Out</button>
            <button onClick={() => (navigate("/managers"))}>Back</button>

            <h3>User</h3>
            <Table>
                <thead>
                    <tr>
                        <th>userId</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>username</th>
                        <th>role</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user:User) => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td><button onClick={deleteUser(user.userId)}>❌</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}