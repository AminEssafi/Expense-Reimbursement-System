import { store } from "../../GlobalData/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Reimbursement {
    description: string;
    amount: number;
    status: string;
    userId: number;
}

export const CReimbursements: React.FC = () => {  

    const [newReimbursement, setNewReimbursement] = useState<Reimbursement>({
        description: "",
        amount: 0,
        status: "pending",
        userId: store.loggedInUser.userId
        })

    const navigate = useNavigate()

    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewReimbursement((newReimbursement) => ({...newReimbursement, [name]: value}))
        console.log(newReimbursement)
    }

    const create = async () => {
        const response = await axios.post("http://localhost:8080/reimbursements", newReimbursement, {withCredentials:true})
        .then(()=>{
            alert("Reimbursement " + newReimbursement.description + " created!")
            navigate("/ereimbursements")
        })
        .catch(()=>{alert("Creation failed! Make sure all fields are correct")})
    }


    return (   
        <Container className="d-flex align-items-center flex-column mt-5">
            <h1>Create Reimbursements for {store.loggedInUser.username}</h1>
            <button onClick={() => (navigate("/"))}>Log Out</button>  
            <button onClick={() => (navigate("/employees"))}>Back</button>

            <div>
                <Form.Control
                    type="text"
                    placeholder="Description"
                    name = "description"
                    onChange={storeValues}
                />
                <Form.Control
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    onChange={storeValues}
                />
                <Form.Control
                    hidden
                    type="text"
                    placeholder="Status"
                    name="status"
                    value={newReimbursement.status}
                    readOnly
                />
                <Form.Control
                hidden
                    type="number"
                    placeholder="userId"
                    name="userId"
                    value={newReimbursement.userId}
                    readOnly
                />

            </div>
            <div className="d-flex gap-1">
            <button onClick={create}>Create</button>
            </div>

        </Container>
    );
    

}