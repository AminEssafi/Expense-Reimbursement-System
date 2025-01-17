package com.revature.aspects;

import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class AuthAspect {
    @Order(1)
    @Before("within(com.revature.controllers.*) " +
            "&& !execution(* com.revature.controllers.AuthController.login(..))" +
            "&& !execution(* com.revature.controllers.UserController.insertUser(..))")
    public void checkLoggedIn() {
        //get access to the session (or lack thereof)
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(false);

        System.out.println(session.getAttribute("username"));

        //we check if the session exists, and if the userId has been set in the session
        if (session == null || session.getAttribute("userId") == null) {
            throw new IllegalArgumentException("User is not logged in");
        }
    }
    @Order(2)
    @Before("@annotation(AdminOnly)")
    public void checkAdmin() {
        if(!"manager".equals(((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest().getSession().getAttribute("role"))){

            throw new IllegalArgumentException("User is not a manager!");

        }
    }
}
