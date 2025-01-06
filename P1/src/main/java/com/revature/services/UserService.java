package com.revature.services;

import com.revature.DAOs.UserDAO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User insertUser(User user) {
        if(user.getFirstName() == null || user.getFirstName().isBlank()) {
            throw new IllegalArgumentException("First name cannot be blank");
        }
        if(user.getLastName() == null || user.getLastName().isBlank()) {
            throw new IllegalArgumentException("Last name cannot be blank");
        }
        if(user.getUsername() == null || user.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username cannot be blank");
        }
        if(user.getPassword() == null || user.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password cannot be blank");
        }
        return userDAO.save(user);
    }

    public List<User> getAllUsers() {
        return userDAO.findAll();
    }

    public List<User> findByRole(String role) {

        if(role == null || role.isBlank()) {
            throw new IllegalArgumentException("Role cannot be null or blank");
        }

        List<User> users = userDAO.findByRole(role);

        return users;
    }

    public void deleteUser(int id) {
        userDAO.deleteById(id);
    }
}
