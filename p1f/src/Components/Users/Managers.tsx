import { store } from "../../GlobalData/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Managers: React.FC = () => {  

    const navigate = useNavigate()

    return (   
        <Container>
            <h1>Manager Dashboard</h1>
            <h3>Welcome {store.loggedInUser.username}</h3>
            <button onClick={() => (navigate("/users"))}>All Users</button>
            <button onClick={() => (navigate("/reimbursements"))}>All Reimbursements</button>
            <button onClick={() => (navigate("/preimbursements"))}>Pending Reimbursements</button>
            <button onClick={() => (navigate("/"))}>Log Out</button>            
        </Container>
    );
}