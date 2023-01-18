package com.example.powervoice.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.powervoice.model.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("SELECT R FROM Report R WHERE R.description LIKE %?1%")
    Page<List<Report>> findByAll(String termobusca, Pageable pageable);

}
