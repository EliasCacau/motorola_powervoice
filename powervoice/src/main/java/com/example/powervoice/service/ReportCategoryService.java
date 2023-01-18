package com.example.powervoice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.powervoice.model.ReportCategory;
import com.example.powervoice.repository.ReportCategoryRepository;

@Service
public class ReportCategoryService implements ICrudService<ReportCategory> {

    private final ReportCategoryRepository repo;

    @Autowired
    public ReportCategoryService(ReportCategoryRepository repo){
        this.repo = repo;
    }

    @Override
    public List<ReportCategory> getAll() {
        List<ReportCategory> registros = repo.findAll();
        return registros;
    }

    @Override
    public ReportCategory getById(Long id) {
        ReportCategory registro = repo.findById(id).orElse(null);
        return registro;
    }

    @Override
    public Page<List<ReportCategory>> getByAll(String termoBusca, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<List<ReportCategory>> registro = repo.findByReportCategory(termoBusca, pageRequest); 
        return registro;
    }

    @Override
    public ReportCategory save(ReportCategory objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
        
    }
    
}
