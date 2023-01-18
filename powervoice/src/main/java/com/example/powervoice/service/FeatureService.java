package com.example.powervoice.service;

import com.example.powervoice.model.Feature;
import com.example.powervoice.model.Category;
import com.example.powervoice.model.Product;
import com.example.powervoice.model.User;
import com.example.powervoice.repository.FeatureRepository;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class FeatureService implements ICrudService<Feature>{

  private final FeatureRepository featureRepository;

  private final ProductService productService;

  private final CategoryService categoryService;

  private final UserService userService;

  public FeatureService(FeatureRepository featureRepository,
      ProductService product, CategoryService category, UserService userService) {
    this.featureRepository = featureRepository;
    this.productService = product;
    this.categoryService = category;
    this.userService = userService;
  }

  @Override
  public List<Feature> getAll() {
    return featureRepository.findAll();
  }

  @Override
  public Feature getById(Long id) {
    return featureRepository.findById(id).orElse(null);
  }

  @Override
  public Page<List<Feature>> getByAll(String termoBusca, int page, int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    return featureRepository.findByFeature(termoBusca, pageRequest);
  }

  @Override
  public Feature save(Feature objeto) {
    return featureRepository.save(objeto);
  }

  @Override
  public void delete(Long id) {
    featureRepository.deleteById(id);
  }

  public Page<List<Feature>> getRankingFeature(int page, int size) {
    PageRequest pageRequest = PageRequest.of(page, size);

    return featureRepository.rankingFeature(pageRequest);
  }
  public List<Feature> getTop10Feature() {
    Pageable pageable = PageRequest.of(0, 10);
    return featureRepository.rankingTop10Feature(pageable);
  }
  public List<Feature> getUser(String username){
    User user = userService.getByUserName(username);
    return featureRepository.findByUser(user);
  }

  public List<Feature> getUserAndId(String username, Long id){
    User user = userService.getByUserName(username);
    Feature feature = featureRepository.findById(id).orElse(null);
    return featureRepository.findByUserAndId(user, feature);
  }

  public List<Feature> getProduct(Long id){
    Product product = productService.getById(id);
    return featureRepository.findByProduct(product);
  }

  public List<Feature> getCategory(Long id){
    Category category = categoryService.getById(id);
    return featureRepository.findByCategory(category);
  }

  public List<Feature> getFilter(Long problemId, Long productId){
    Category category = categoryService.getById(problemId);
    Product product = productService.getById(productId);
    return featureRepository.filterFeatures(category, product);
  }

  public Feature incrementaLike(Long id) {
    Feature registro = featureRepository.getById(id);
    registro.setLikes(registro.getLikes()+1);
    registro = featureRepository.save(registro);
    return registro;
}

  public Feature decrementaLike(Long id) {
    Feature registro = featureRepository.getById(id);
    registro.setLikes(registro.getLikes()-1);
    registro = featureRepository.save(registro);
    return registro;
  }
}
