package com.example.powervoice.controller;

import com.example.powervoice.model.EReportStatus;
import com.example.powervoice.model.Feature;
import com.example.powervoice.service.FeatureService;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.powervoice.model.Report;
import com.example.powervoice.service.ReportService;

@RestController
@RequestMapping("/report")
public class ReportController implements ICrudController<Report> {

    private final ReportService servico;

    private final FeatureService featureService;

    @Autowired
    public ReportController(ReportService servico,
            FeatureService featureService) {
        this.servico = servico;
        this.featureService = featureService;
    }

    @Override
    @GetMapping("/get/all")
    public ResponseEntity<List<Report>> getAll() {
        List<Report> registros = servico.getAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @Override
    @GetMapping("/get/id/{id}")
    public ResponseEntity<Report> getById(@PathVariable("id") Long id) {
        Report registro = servico.getById(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Report>> getByAll(String termoBusca) {
        // TODO Auto-generated method stub
        return null;
    }

    @GetMapping("/get/by-term/{termoBusca}")
    public ResponseEntity<Page<List<Report>>> getByAll(@PathVariable("termoBusca") String termoBusca,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "20") int size) {
        Page<List<Report>> registros = servico.getByAll(termoBusca, page, size);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @Override
    @PostMapping("/create")
    public ResponseEntity<Report> insert(@RequestBody Report objeto) {
        objeto.setReportDate(Date.valueOf(LocalDate.now()));
        Report registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @PutMapping("/edit/")
    public ResponseEntity<Report> update(@RequestBody Report report) {
        Feature feature = featureService.getById(report.getFeature().getId());
        if (report.getReportStatus() == EReportStatus.Accepted)
            feature.setReport(true);
        Report registro = servico.save(report);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        servico.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
