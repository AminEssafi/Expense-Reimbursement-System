package com.revature.DAOs;


import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbursementDAO extends JpaRepository<Reimbursement, Integer> {

    public List<Reimbursement> findByUserUserId(int userId);

    List<Reimbursement> findAllByStatus(String pending);

    List<Reimbursement> findAllByUserUserId(int userId);

    List<Reimbursement> findByUserUserIdAndStatus(int userId, String pending);
}
