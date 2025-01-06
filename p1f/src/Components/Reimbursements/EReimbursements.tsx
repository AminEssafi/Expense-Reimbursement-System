import { store } from "../../GlobalData/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Reimbursement {
    reimbId: number,
    description: string,
    amount: number,
    status: string,
    user: any
}

export const EReimbursements: React.FC = () => {  


    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

    useEffect(() => {
            getAllReimbursements();
    }, [])

    const navigate = useNavigate()

    const getAllReimbursements = async () => {
        const reimbursementData = await axios.get(`http://localhost:8080/reimbursements/userId/${store.loggedInUser.userId}`, {withCredentials:true}
        )

        setReimbursements(reimbursementData.data)
    }

    return (   
        <Container>
            <h1>Employee Reimbursements for {store.loggedInUser.username}</h1>
            <button onClick={() => (navigate("/"))}>Log Out</button>  
            <button onClick={() => (navigate("/employees"))}>Back</button>
            <Table className = "table-primary table-hover">
                            <thead>
                                <tr>
                                    <th>reimbId</th>
                                    <th>description</th>
                                    <th>amount</th>
                                    <th>status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {reimbursements.map((reimbursement:Reimbursement) => (
                                    <tr key={reimbursement.reimbId}>
                                        <td>{reimbursement.reimbId}</td>
                                        <td>{reimbursement.description}</td>
                                        <td>{reimbursement.amount}</td>
                                        <td>{reimbursement.status === "{\"status\":\"Approved\"}" ? "✔️" : reimbursement.status === "{\"status\":\"Denied\"}" ? "❌" : "⌛"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
        </Container>
    );
    

}