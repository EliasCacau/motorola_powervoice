package com.example.powervoice.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.powervoice.model.User;
import com.example.powervoice.service.UserService;

@RestController
@RequestMapping("/login")
public class LoginController {
    
    private final UserService servico;

    @Autowired
    public LoginController(UserService servico) {
        this.servico = servico;
    }

    @GetMapping("/")
    public ResponseEntity<User> getUsuario() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = servico.getByUserName(principal.getName());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
