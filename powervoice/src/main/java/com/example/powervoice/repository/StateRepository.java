package com.example.powervoice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.powervoice.model.Country;
import com.example.powervoice.model.State;

@Repository
public interface StateRepository extends JpaRepository <State, Long> {

    List<State> findByCountry(Country country);
    List<State> findByIbge(Integer ibge);
    
}
