package com.example.powervoice.controller;

import java.sql.Date;
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

import com.example.powervoice.controller.request.ReactionRequest;
import com.example.powervoice.model.Reaction;
import com.example.powervoice.service.FeatureService;
import com.example.powervoice.service.ReactionService;

@RestController
@RequestMapping("/reaction")
public class ReactionController implements ICrudController<Reaction> {

    private final ReactionService servico;
    private final FeatureService servicoFeature;

    @Autowired
    public ReactionController (ReactionService servico, FeatureService servicoFeature) {
        this.servico = servico;
        this.servicoFeature = servicoFeature;
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<Reaction>> getAll() {
        List<Reaction> registros = servico.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Reaction> getById(@PathVariable("id") Long id) {
        Reaction registro = servico.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @GetMapping("getby/date/{date}")
    public ResponseEntity<List<Reaction>> getByDate(@PathVariable("date") Date date) {
        List<Reaction> registros = servico.getByDate(date);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/get/likeamount/{id}")
    public ResponseEntity<Long> featureLikeAmount(@PathVariable("id") Long id) {
        long amount = servico.countByFeature(id);
        return new ResponseEntity<>(amount, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Reaction> insert(@RequestBody ReactionRequest objeto) {
        Reaction like = objeto.getReaction();
        boolean check = servico.exists(like);
        if (check) {
            Reaction id = servico.findByFeatureAndUser(like);
            servico.delete(id.getId());
            servicoFeature.decrementaLike(objeto.getFeatureId());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        Reaction save = servico.save(like);
        servicoFeature.incrementaLike(objeto.getFeatureId());
        return new ResponseEntity<>(save, HttpStatus.CREATED);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Reaction> update(@PathVariable("id") Reaction objeto) {
        Reaction save = servico.save(objeto);
        return new ResponseEntity<>(save, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        servico.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<List<Reaction>> listByUser(@PathVariable("id")  Long id) {
        List<Reaction> like = servico.listFeatureByUser(id);
        return new ResponseEntity<>(like, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Reaction>> getByAll(String termoBusca) {
        return null;
    }

    @Override
    public ResponseEntity<Reaction> insert(Reaction objeto) {
        return null;
    }
    
}
