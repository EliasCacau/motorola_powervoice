package com.example.powervoice.repository;

import com.example.powervoice.model.Feature;
import com.example.powervoice.model.Category;
import com.example.powervoice.model.Product;
import com.example.powervoice.model.User;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FeatureRepository extends JpaRepository<Feature, Long> {

  List<Feature> findByUser(User user);

  List<Feature> findByUserAndId(User user, Feature feature);

  @Query("SELECT f FROM Feature f "
      + "WHERE f.product = :product "
      + "ORDER BY f.likes DESC")
  List<Feature> findByProduct(Product product);

  @Query("SELECT f FROM Feature f "
      + "WHERE f.category = :category "
      + "ORDER BY f.likes DESC")
  List<Feature> findByCategory(Category category);

  @Query("SELECT f FROM Feature f "
      + "WHERE f.category = :category "
      + "AND f.product = :product "
      + "ORDER BY f.likes DESC")
  List<Feature> filterFeatures(Category category, Product product);

  @Query("SELECT f FROM Feature f WHERE f.report = 0 ORDER BY f.likes DESC")
  Page<List<Feature>> rankingFeature(Pageable pageable);

  @Query("SELECT f FROM Feature f ORDER BY f.likes DESC")
  List<Feature> rankingTop10Feature(Pageable pageable);

  @Query("SELECT f FROM Feature f "
      + "WHERE f.title LIKE  %?1% "
      + "OR f.description LIKE  %?1%"
      + "ORDER BY f.likes DESC")
  Page<List<Feature>> findByFeature(String termoBusca, Pageable pageable);

}
