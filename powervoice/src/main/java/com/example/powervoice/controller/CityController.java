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

import com.example.powervoice.model.City;
import com.example.powervoice.service.CityService;

@RestController
@RequestMapping("/location")
public class CityController implements ICrudController<City> {

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService){
        this.cityService = cityService;
    }
    
    @Override
    @GetMapping("/get/cities")
    public ResponseEntity<List<City>> getAll() {
        List<City> registros = cityService.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @Override
    @GetMapping("get/cities/{id}")
    public ResponseEntity<City> getById(@PathVariable("id") Long id) {
        City registro = cityService.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }
    
    @GetMapping("/citiesbystate/{id}")
    public ResponseEntity<List<City>> getByState(@PathVariable("id") Long id) {
        List<City> city = cityService.getState(id);
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<City>> getByAll(String termoBusca) {
        return null;
    }

    @Override
    @PostMapping("/cities")
    public ResponseEntity<City> insert(@RequestBody City objeto) {
        City registro = cityService.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @PutMapping("/cities/editar")
    public ResponseEntity<City> update(@RequestBody City objeto) {
        City registro = cityService.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/cities/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        cityService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    
}