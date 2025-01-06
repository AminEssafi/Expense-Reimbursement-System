package com.revature.services;


import com.revature.DAOs.AuthDAO;
import com.revature.controllers.AuthController;
import com.revature.models.DTOs.LoginDTO;
import com.revature.models.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthDAO authDAO;
    @Autowired
    public AuthService(AuthDAO authDAO) {
        this.authDAO = authDAO;
    }

    public User login(LoginDTO loginDTO) {
        User user = authDAO.findByUsernameAndPassword(loginDTO.getUsername(), loginDTO.getPassword());
        if(user != null) {


        }else{
            throw new IllegalArgumentException("Invalid credentials");
        }
        return new User(user.getUserId(), user.getFirstName(), user.getLastName(), user.getUsername(), null, user.getRole());
    }
}
