package com.example.powervoice.service;

import com.example.powervoice.model.Category;
import com.example.powervoice.repository.CategoryRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class CategoryService implements ICrudService<Category> {

  private final CategoryRepository repo;

  @Autowired
  public CategoryService(CategoryRepository repo){
    this.repo = repo;
  }

  @Override
  public List<Category> getAll() {
    List<Category> registros = repo.findAll();
    return registros;
  }

  public Page<List<Category>> getAllPageable(int page, int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    return repo.findPageable(pageRequest);
  }

  @Override
  public Category getById(Long id) {
    Category registro = repo.findById(id).orElse(null);
    return registro;
  }

  @Override
  public Page<List<Category>> getByAll(String termoBusca, int page, int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<List<Category>> registro = repo.findByCategory(termoBusca, pageRequest);
    return registro;
  }

  @Override
  public Category save(Category objeto) {
    return repo.save(objeto);
  }

  @Override
  public void delete(Long id) {
    repo.deleteById(id);    
  }


}
