package com.example.powervoice.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.powervoice.model.ReportCategory;

@Repository
public interface ReportCategoryRepository extends JpaRepository<ReportCategory, Long> {

    @Query("SELECT R FROM ReportCategory R WHERE R.reportCategory LIKE %?1%")
    Page<List<ReportCategory>> findByReportCategory(String reportCategory, Pageable pageable);
}
