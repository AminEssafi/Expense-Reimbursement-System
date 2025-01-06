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

export const Reimbursements: React.FC = () => {

    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

    useEffect(() => {
            getAllReimbursements();
    }, [])

    const navigate = useNavigate()

    const getAllReimbursements = async () => {
        const reimbursementData = await axios.get("http://localhost:8080/reimbursements/all", {withCredentials:true}
        )

        setReimbursements(reimbursementData.data)
    }

    const approve = (reimbId:number) => async () => {
        await axios.patch(`http://localhost:8080/reimbursements/status/${reimbId}`,"Approved" , { withCredentials: true });
        await getAllReimbursements();
    }
    

    const deny = (reimbId:number) => async () => {
        await axios.patch(`http://localhost:8080/reimbursements/status/${reimbId}`, {status: "Denied" }, { withCredentials: true });
        await getAllReimbursements();
    }

    return (
        <Container>
            <h1>All Reimbursements</h1>
        <button onClick={() => (navigate("/"))}>Log Out</button>
        <button onClick={() => (navigate("/managers"))}>Back</button>
            <Table className = "table-primary table-hover">
                <thead>
                    <tr>
                        <th>reimbId</th>
                        <th>description</th>
                        <th>amount</th>
                        <th>status</th>
                        <th>user</th>
                        <th>update</th>
                    </tr>
                </thead>
                <tbody>
                {reimbursements.map((reimbursement:Reimbursement) => (
                        <tr key={reimbursement.reimbId}>
                            <td>{reimbursement.reimbId}</td>
                            <td>{reimbursement.description}</td>
                            <td>{reimbursement.amount}</td>
                            <td>{reimbursement.status === "{\"status\":\"Approved\"}" ? "✔️" : reimbursement.status === "{\"status\":\"Denied\"}" ? "❌" : "⌛"}</td>
                            <td>{reimbursement.user.username}</td>
                            <td>{reimbursement.status === "pending" ? <><button onClick={approve(reimbursement.reimbId)}>✔️</button><button onClick={deny(reimbursement.reimbId)}>❌</button></> : null}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}