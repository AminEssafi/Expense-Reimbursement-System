package com.revature.controllers;

import com.revature.aspects.AdminOnly;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursements")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")
public class ReimbursementController {

    private final ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }

    @PostMapping
    public ResponseEntity<Reimbursement> insertReimbursement(@RequestBody IncomingReimbursementDTO reimbursementDTO) {

        Reimbursement reimbursement = reimbursementService.insertReimbursement(reimbursementDTO);
        return ResponseEntity.status(201).body(reimbursement);
    }

    @GetMapping("/all")
    @AdminOnly
    public ResponseEntity<List<Reimbursement>> getAllReimbursements() {
        return ResponseEntity.ok(reimbursementService.getAllReimbursements());
    }

    @GetMapping("/pending")
    @AdminOnly
    public ResponseEntity<List<Reimbursement>> getPendingReimbursements() {
        return ResponseEntity.ok(reimbursementService.getPendingReimbursements());
    }

    @PatchMapping("/status/{reimbursementId}")
    @AdminOnly
    public ResponseEntity<Reimbursement> updateReimbursementStatus(@PathVariable int reimbursementId, @RequestBody String status) {

        return ResponseEntity.accepted().body(reimbursementService.updateReimbursementStatus(reimbursementId, status));
    }

    @GetMapping("/userId/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByUserId(@PathVariable int userId) {
        return ResponseEntity.ok(reimbursementService.getReimbursementsByUserId(userId));
    }

    @GetMapping("/userIdPending/{userId}")
    public ResponseEntity<List<Reimbursement>> getPendingReimbursementsByUserId(@PathVariable int userId) {
        return ResponseEntity.ok(reimbursementService.getPendingReimbursementsByUserId(userId));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
