package com.example.powervoice.service;

import com.example.powervoice.model.City;
import com.example.powervoice.model.State;
import com.example.powervoice.repository.CityRepository;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class CityService implements ICrudService<City>{

    private final CityRepository cityRepository;

    private final StateService stateService;

    public CityService(CityRepository cityRepository, StateService stateService){
        this.cityRepository = cityRepository;
        this.stateService = stateService;
    }

    @Override
    public List<City> getAll() {
        return cityRepository.findAll();
    }

    @Override
    public City getById(Long id) {
        return cityRepository.findById(id).orElse(null);
    }

    @Override
    public Page<List<City>> getByAll(String termoBusca, int page, int size) {
        return null;
    }

    @Override
    public City save(City objeto) {
        return cityRepository.save(objeto);
    }

    @Override
    public void delete(Long id) {
        cityRepository.deleteById(id);        
    }
    
    public List<City> getState(Long id){
        State state = stateService.getById(id);
        return cityRepository.findByState(state);
    }

}