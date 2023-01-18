package com.example.powervoice.repository;

import com.example.powervoice.model.Category;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

  @Query("SELECT c FROM Category c WHERE c.category LIKE %?1%" +
      "OR c.id LIKE %?1%")
  Page<List<Category>> findByCategory(String category, Pageable pageble);

  @Query("SELECT c FROM Category c ORDER BY c.id ASC")
  Page<List<Category>> findPageable(Pageable pageable);
}
