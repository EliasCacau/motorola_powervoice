package com.example.powervoice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.powervoice.model.Report;
import com.example.powervoice.repository.ReportRepository;

@Service
public class ReportService implements ICrudService<Report>{
    
    private final ReportRepository repo;

    @Autowired
    public ReportService(ReportRepository repo){
        this.repo = repo;
    }

    @Override
    public List<Report> getAll() {
        List<Report> registros = repo.findAll();
        return registros;
    }

    @Override
    public Report getById(Long id) {
        Report registro = repo.findById(id).orElse(null);
        return registro;
    }

    @Override
    public Page<List<Report>> getByAll(String termoBusca, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<List<Report>> registro = repo.findByAll(termoBusca, pageRequest);
        return registro;
    }

    @Override
    public Report save(Report objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
}
