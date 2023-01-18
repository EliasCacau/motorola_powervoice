package com.example.powervoice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.example.powervoice.model.Country;
import com.example.powervoice.model.State;
import com.example.powervoice.repository.StateRepository;

@Service
public class StateService implements ICrudService<State> {

    private final StateRepository repo;

    private final CountryService countryService;

    @Autowired
    public StateService(StateRepository repo, CountryService countryService){
        this.repo = repo;
        this.countryService = countryService;
    }

    @Override
    public List<State> getAll() {
        List<State> registros = repo.findAll();
        return registros;
    }

    @Override
    public State getById(Long id) {
        State registro = repo.findById(id).orElse(null);
        return registro;
    }

    @Override
    public Page<List<State>> getByAll(String termoBusca, int page, int size) {
        return null;
    }

    @Override
    public State save(State objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
    public List<State> getCountry(Long id) {
        Country country = countryService.getById(id);
        return repo.findByCountry(country);
    }

}
