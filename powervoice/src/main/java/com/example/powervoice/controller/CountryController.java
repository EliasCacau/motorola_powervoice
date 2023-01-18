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

import com.example.powervoice.model.Country;
import com.example.powervoice.service.CountryService;

@RestController
@RequestMapping("/location")
public class CountryController implements ICrudController<Country> {

    private final CountryService servico;

    @Autowired
    public CountryController(CountryService servico){
        this.servico = servico;
    }

    @Override
    @GetMapping("/get/countries")
    public ResponseEntity<List<Country>> getAll() {
        List<Country> registros = servico.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @Override
    @GetMapping("get/countries/{id}")
    public ResponseEntity<Country> getById(@PathVariable("id") Long id) {
        Country registro = servico.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Country>> getByAll(String termoBusca) {
        return null;
    }

    @Override
    @PostMapping("/countries")
    public ResponseEntity<Country> insert(@RequestBody Country objeto) {
        Country registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @PutMapping("/countries/editar")
    public ResponseEntity<Country> update(@RequestBody Country objeto) {
        Country registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/countries/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        servico.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
