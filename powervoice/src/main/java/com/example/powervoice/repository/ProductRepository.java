package com.example.powervoice.repository;

import com.example.powervoice.model.Product;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  @Query("SELECT P FROM Product P WHERE P.name LIKE %?1%" +
      "OR P.id LIKE %?1%")
  Page<List<Product>> findByName(String termoBusca, Pageable pageable);

  @Query("SELECT p FROM Product p ORDER BY p.id ASC")
  Page<List<Product>> findPageable(Pageable pageable);
}
