import { store } from "../../GlobalData/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Employees: React.FC = () => {  

    const navigate = useNavigate()

    return (   
        <Container>
            <h1>Employee Dashboard</h1>
            <h3>Welcome {store.loggedInUser.username}</h3>
            <button onClick={() => (navigate("/creimbursements"))}>Create Reimbursement</button>
            <button onClick={() => (navigate("/ereimbursements"))}>All Reimbursements</button>
            <button onClick={() => (navigate("/pereimbursements"))}>Pending Reimbursements</button>
            <button onClick={() => (navigate("/"))}>Log Out</button>  
        </Container>
    );
}