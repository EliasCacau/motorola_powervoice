package com.example.powervoice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.powervoice.model.City;
import com.example.powervoice.model.State;

@Repository
public interface CityRepository extends JpaRepository <City, Long> {
  
    List<City> findByState(State state);
    List<City> findByIbge(Integer ibge);
    
}


