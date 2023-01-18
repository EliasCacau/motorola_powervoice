package com.example.powervoice.service;

import java.util.List;

import com.example.powervoice.model.Product;
import com.example.powervoice.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements ICrudService<Product> {

  private final ProductRepository productRepository;


  @Autowired
  public ProductService(ProductRepository productRepository){
    this.productRepository = productRepository;
  }


  @Override
  public List<Product> getAll() {
    return productRepository.findAll();
  }

  public Page<List<Product>> getAllPageable(int page, int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    return productRepository.findPageable(pageRequest);
  }


  @Override
  public Product getById(Long id) {
    return productRepository.findById(id).orElse(null);
  }


  @Override
  public Page<List<Product>> getByAll(String termoBusca, int page, int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    return productRepository.findByName(termoBusca, pageRequest);
  }


  @Override
  public Product save(Product objeto) {
    return productRepository.save(objeto);
  }


  @Override
  public void delete(Long id) {  
    productRepository.deleteById(id);  
  }
 
}
