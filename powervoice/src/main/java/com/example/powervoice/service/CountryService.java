package com.example.powervoice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.powervoice.model.Country;
import com.example.powervoice.repository.CountryRepository;

@Service
public class CountryService implements ICrudService<Country> {

    private final CountryRepository repo;

    @Autowired
    public CountryService(CountryRepository repo){
        this.repo = repo;
    }
    
    @Override
    public List<Country> getAll() {
        List<Country> registros = repo.findAll();
        return registros;
    }

    @Override
    public Country getById(Long id) {
        Country registro = repo.findById(id).orElse(null);
        return registro;
    }

    @Override
    public Page<List<Country>> getByAll(String termoBusca, int page, int size) {
        return null;
    }
    
    @Override
    public Country save(Country objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
}
