package com.example.powervoice.service;

import com.example.powervoice.model.User;
import com.example.powervoice.repository.UserRepository;
import java.sql.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.example.powervoice.model.Feature;
import com.example.powervoice.model.Reaction;
import com.example.powervoice.repository.FeatureRepository;
import com.example.powervoice.repository.ReactionRepository;

@Service
public class ReactionService implements ICrudService<Reaction> {

    public final ReactionRepository repo;
    public final FeatureRepository repoFeature;
    public final UserService userService;


    public ReactionService(ReactionRepository repo, FeatureRepository repoFeature,
        UserService userService){
        this.repo = repo;
        this.repoFeature = repoFeature;
        this.userService = userService;
    }


    public boolean exists(Reaction objeto) {
        boolean check = repo.existsByFeatureAndUser(objeto.getFeature(), objeto.getUser());
        return check;
    }

    public Reaction findByFeatureAndUser(Reaction objeto) {
        Reaction like = repo.findByFeatureAndUser(objeto.getFeature(), objeto.getUser());
        return like;
    }

    public Long countByFeature(Long id) {
        Feature feature = repoFeature.findById(id).orElse(null);
        long amount = repo.countByFeature(feature);
        return amount;
    }

    @Override
    public List<Reaction> getAll() {
        List<Reaction> registros = repo.findAll();
        return registros;
    }

    @Override
    public Reaction getById(Long id) {
        Reaction registro = repo.findById(id).orElse(null);
        return registro;
    }

    @Override
    public Page<List<Reaction>> getByAll(String termoBusca, int page, int size) {
        return null;
    }

    public List<Reaction> getByDate(Date date){
        List<Reaction> registros = repo.findByDate(date);
        return registros;
    }

    @Override
    public Reaction save(Reaction objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Reaction> listFeatureByUser(Long id) {
        User user = userService.getById(id);
        return repo.findByUser(user);
    }
    
}
