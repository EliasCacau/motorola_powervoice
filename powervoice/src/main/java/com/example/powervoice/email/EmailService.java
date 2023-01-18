package com.example.powervoice.email;

import org.springframework.stereotype.Service;


@Service
public class EmailService {

    private final SendEmailService sendEmailService;
    private Email email;

    public Email getEmail() {
        return email;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public EmailService(SendEmailService sendEmailService) {
        this.sendEmailService = sendEmailService;
    }

    public void enviar() {
        sendEmailService.enviar(email.getPara(), email.getTitutlo(), email.getMensagem());
    }

}
