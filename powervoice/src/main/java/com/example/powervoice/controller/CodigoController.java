package com.example.powervoice.controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.powervoice.model.Codigo;
import com.example.powervoice.model.User;
import com.example.powervoice.service.CodigoService;
import com.example.powervoice.service.UserService;

@RestController
@RequestMapping("/redefine")
public class CodigoController implements ICrudController<Codigo> {

    private final UserService servicoUsuario;
    private final CodigoService servicoCodigo;


    @Autowired
    public CodigoController (UserService servicoUsuario, CodigoService servicoCodigo) {
        this.servicoUsuario = servicoUsuario;
        this.servicoCodigo = servicoCodigo;
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Codigo> sendEmail(@PathVariable("email") String email) {
        User usuario = servicoUsuario.getByEmail(email);
        if (usuario != null)
        {
            Codigo isCode = servicoCodigo.getByUser(usuario);
            if (isCode != null){
                servicoCodigo.delete(isCode.getId());
            }
            
            Random gerador = new Random();
            int var = gerador.nextInt(2147483647 - 1111111111);

            Codigo code = new Codigo();
            code.setUser(usuario);
            code.setCodigo(var);

            servicoCodigo.sendEmail(usuario, code);

            return new ResponseEntity<Codigo>(HttpStatus.OK);
        }
        return new ResponseEntity<Codigo>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user/{id}/code/{codigo}")
    public ResponseEntity<Codigo> verifyCode(@PathVariable("id") Long id, @PathVariable("codigo") Integer codigo) {
        User usuario = servicoUsuario.getById(id);
        Codigo registro = servicoCodigo.getByUserAndCodigo(usuario, codigo);

        if (registro != null)
        {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<List<Codigo>> getAll() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResponseEntity<Codigo> getById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResponseEntity<List<Codigo>> getByAll(String termoBusca) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResponseEntity<Codigo> insert(Codigo objeto) {
        servicoCodigo.save(objeto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Codigo> update(Codigo objeto) {
        servicoCodigo.save(objeto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        servicoCodigo.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
