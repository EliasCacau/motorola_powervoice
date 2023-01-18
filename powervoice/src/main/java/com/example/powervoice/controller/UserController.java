package com.example.powervoice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.powervoice.model.Roles;
import com.example.powervoice.model.User;
import com.example.powervoice.service.UserService;

@RestController
@RequestMapping("/usuario")
public class UserController implements ICrudController<User> {

    private final UserService servico;

    @Autowired
    public UserController(UserService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/get/all")
    public ResponseEntity<List<User>> getAll() {
        List<User> registros = servico.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/get/all/pageable")
    public ResponseEntity<Page<List<User>>> getAllPageable(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "20") int size) {
        Page<List<User>> registros = servico.getAllPageable(page, size);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @Override
    @GetMapping("/get/{id}")
    public ResponseEntity<User> getById(@PathVariable("id") Long id) {
        User registro = servico.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }


    @Override
    public ResponseEntity<List<User>> getByAll(String termoBusca) {
        // TODO Auto-generated method stub
        return null;
    }

    @GetMapping("/get/by-term/{termoBusca}")
    public ResponseEntity<Page<List<User>>> getByAll(@PathVariable("termoBusca") String termoBusca,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "20") int size) {
        Page<List<User>> registros = servico.getByAll(termoBusca, page, size);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }
    

    @Override
    @PostMapping("/cadastro")
    public ResponseEntity<User> insert(@RequestBody User objeto) {
        objeto.setRole(Roles.ROLE_USER);
        User registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    
    }
    @PostMapping("/admin/cadastro")
    public ResponseEntity<User> insertADMIN(@RequestBody User objeto) {
        objeto.setRole(Roles.ROLE_ADMIN);
        User registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/edit")
    public ResponseEntity<User> update(@RequestBody User objeto) {
        User registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        servico.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/check-email/{email}")
    public ResponseEntity<User> checkEmail(@PathVariable("email") String email) {
        boolean emailExists = servico.checkEmail(email);
        if (emailExists == true )
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/check-username/{username}")
    public ResponseEntity<User> checkUsername(@PathVariable("username") String username) {
        boolean usernameExists = servico.checkUsername(username);
        if (usernameExists == true )
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}