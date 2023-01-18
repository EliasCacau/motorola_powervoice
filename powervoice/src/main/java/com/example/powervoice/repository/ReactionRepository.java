package com.example.powervoice.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

import com.example.powervoice.model.Feature;
import com.example.powervoice.model.Reaction;
import com.example.powervoice.model.User;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    
    long countByFeature(Feature feature);
    boolean existsByFeatureAndUser(Feature feature, User user);
    List<Reaction> findByDate(Date date);
    Reaction findByFeatureAndUser(Feature feature, User user);
    List<Reaction> findByUser(User user);


}
