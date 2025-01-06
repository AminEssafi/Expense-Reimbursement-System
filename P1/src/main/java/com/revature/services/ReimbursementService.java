package com.revature.services;

import com.revature.DAOs.ReimbursementDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    private final ReimbursementDAO reimbursementDAO;
    private final UserDAO userDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO reimbursementDAO, UserDAO userDAO) {
        this.reimbursementDAO = reimbursementDAO;
        this.userDAO = userDAO;
    }

    public Reimbursement insertReimbursement(IncomingReimbursementDTO reimbursementDTO) {
        Reimbursement reimbursement = new Reimbursement(0, reimbursementDTO.getDescription(), reimbursementDTO.getAmount(), reimbursementDTO.getStatus(), null);

        Optional<User> user = userDAO.findById(reimbursementDTO.getUserId());

        reimbursement.setUser(user.get());
        return reimbursementDAO.save(reimbursement);
    }

    public Reimbursement updateReimbursementStatus(int reimbursementId, String status) {
        Reimbursement reimbursement = reimbursementDAO.findById(reimbursementId).orElseThrow(() -> {
            throw new IllegalArgumentException("Reimbursement with id " + reimbursementId + " not found.");
        });

        reimbursement.setStatus(status);
        return reimbursementDAO.save(reimbursement);
    }

    public List<Reimbursement> getAllReimbursements() {
        return reimbursementDAO.findAll();
    }

    public List<Reimbursement> getPendingReimbursements() {
        return reimbursementDAO.findAllByStatus("pending");
    }

    public List<Reimbursement> getReimbursementsByUserId(int userId) {
        return reimbursementDAO.findAllByUserUserId(userId);
    }

    public List<Reimbursement> getPendingReimbursementsByUserId(int userId) {
        return reimbursementDAO.findByUserUserIdAndStatus(userId, "pending");
    }
}
