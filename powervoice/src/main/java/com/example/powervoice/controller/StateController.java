package com.example.powervoice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.powervoice.model.State;
import com.example.powervoice.service.StateService;

@RestController
@RequestMapping("/location")
public class StateController implements ICrudController<State>{

    private final StateService servico;

    @Autowired
    public StateController(StateService servico){
        this.servico = servico;
    }

    @Override
    @GetMapping("/states")
    public ResponseEntity<List<State>> getAll() {
        List<State> registros = servico.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }
    
    @GetMapping("/country/{id}")
    public ResponseEntity<List<State>> getByCountry(@PathVariable("id") Long id) {
        List<State> state = servico.getCountry(id);
        return new ResponseEntity<>(state, HttpStatus.OK);
    }
    
    @Override
    public ResponseEntity<State> getById(@PathVariable("id") Long id) {
        State registro = servico.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<State>> getByAll(String termoBusca) {
        return null;
    }

    @Override
    @PostMapping("/states")
    public ResponseEntity<State> insert(@RequestBody State objeto) {
        State registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @PutMapping("/states/editar")
    public ResponseEntity<State> update(@RequestBody State objeto) {      
        State registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/states/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {     
        servico.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
