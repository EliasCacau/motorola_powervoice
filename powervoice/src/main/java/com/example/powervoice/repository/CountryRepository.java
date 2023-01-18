package com.example.powervoice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.powervoice.model.Country;

@Repository
public interface CountryRepository extends JpaRepository <Country, Long> {

    List<Country> findByName(String name);
    
}
