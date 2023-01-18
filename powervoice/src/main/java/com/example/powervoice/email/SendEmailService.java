package com.example.powervoice.email;

import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SendEmailService {

    private final JavaMailSender javaMailSender;

    public SendEmailService(final JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void enviar(String para, String titulo, String conteudo) {
        log.info("Enviando email");

        var mensagem = new SimpleMailMessage();
        mensagem.setTo(para);

        mensagem.setSubject(titulo);
        mensagem.setText(conteudo);
        javaMailSender.send(mensagem);
        log.info("Email enviado com sucesso!");
    }
}