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

import com.example.powervoice.model.Category;
import com.example.powervoice.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController implements ICrudController<Category> {

    private final CategoryService servico;

    @Autowired
    public CategoryController(CategoryService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/get/all")
    public ResponseEntity<List<Category>> getAll() {
        List<Category> registros = servico.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/get/all/pageable")
    public ResponseEntity<Page<List<Category>>> getAllPageable(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "20") int size) {
        Page<List<Category>> registros = servico.getAllPageable(page, size);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @Override
    @GetMapping("/get/id/{id}")
    public ResponseEntity<Category> getById(@PathVariable("id") Long id) {
        Category registro = servico.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Category>> getByAll(String termoBusca) {
        // TODO Auto-generated method stub
        return null;
    }

    @GetMapping("/get/by-term/{termoBusca}")
    public ResponseEntity<Page<List<Category>>> getByAll(@PathVariable("termoBusca") String termoBusca,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "20") int size) {
        Page<List<Category>> registros = servico.getByAll(termoBusca, page, size);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @Override
    @PostMapping("/create")
    public ResponseEntity<Category> insert(@RequestBody Category objeto) {
        Category registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @PutMapping("/edit")
    public ResponseEntity<Category> update(@RequestBody Category objeto) {
        Category registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        servico.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
