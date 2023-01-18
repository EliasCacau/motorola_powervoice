package com.example.powervoice.controller;


import com.example.powervoice.controller.request.FeatureRequest;
import com.example.powervoice.model.Feature;
import com.example.powervoice.model.User;
import com.example.powervoice.repository.FeatureRepository;
import com.example.powervoice.service.FeatureService;
import com.example.powervoice.utils.UserHelper;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feature")
public class FeatureController<defaultValue> {

  private final FeatureService featureService;
  private final FeatureRepository featureRepository;
  private final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
  private List<Feature> features = null;

  @Autowired
  public FeatureController(FeatureService featureService,
      FeatureRepository featureRepository) {
    this.featureService = featureService;
    this.featureRepository = featureRepository;
  }


  @GetMapping("/get/all")
  public  ResponseEntity<Page<List<Feature>>> getAll(
      @RequestParam( value = "page", required = false, defaultValue = "0") int page,
      @RequestParam(value = "size", required = false, defaultValue = "20") int size) {
      Page<List<Feature>> features = featureService.getRankingFeature(page, size);
    return new ResponseEntity<>(features, HttpStatus.OK);

  }

  @GetMapping("/get/top10")
  public ResponseEntity<List<Feature>> getRankingTop10() {
    List<Feature> features = featureService.getTop10Feature();
    return new ResponseEntity<>(features, HttpStatus.OK);
  }


  @GetMapping("/get/{id}")
  public ResponseEntity<Feature> getById(@PathVariable("id") Long id) {
    User user = UserHelper.getAuthenticatedUser();
    Set<String> roles = UserHelper.getRolesUser();

    Optional<Feature> featureCheck = featureRepository.findById(id);
    if(featureCheck.isEmpty())
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    final Feature feature = featureCheck.get();
    // if(!feature.getUser().equals(user) && roles.contains("ROLE_USER")) {
    //   return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    // }

    return new ResponseEntity<>(feature, HttpStatus.OK);
  }

  @GetMapping("/get/by-term/{termoBusca}")
  public ResponseEntity<Page<List<Feature>>> getByAll(@PathVariable("termoBusca") String termoBusca, 
  @RequestParam( value = "page", required = false, defaultValue = "0") int page,
  @RequestParam(value = "size", required = false, defaultValue = "20") int size) {
    
    Page<List<Feature>> features = featureService.getByAll(termoBusca, page, size);
    return new ResponseEntity<>(features, HttpStatus.OK);
  }

  @PostMapping("/create")
  public ResponseEntity<Feature> insert(@RequestBody FeatureRequest objeto) {
    Feature feature = featureService.save(objeto.getFeature());
    return new ResponseEntity<>(feature, HttpStatus.CREATED);
  }

  @PutMapping("/edit/{id}")
  public ResponseEntity<Feature> update(@PathVariable ("id") Long id, @RequestBody FeatureRequest objeto) {
    User user = UserHelper.getAuthenticatedUser();
    Set<String> roles = UserHelper.getRolesUser();
    Optional<Feature> featureCheck = featureRepository.findById(id);
    if(featureCheck.isEmpty())
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    final Feature feature = featureCheck.get();
    if(!feature.getUser().equals(user) && !roles.contains("ROLE_ADMIN")) {
      return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    Feature a = objeto.getFeature();
    Integer likes = feature.getLikes();
    a.setLikes(likes);
    a.setId(id);
    Feature featureResponse = featureService.save(a);
    return new ResponseEntity<>(featureResponse, HttpStatus.OK);

  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> delete( @PathVariable("id") Long id) {
    User user = UserHelper.getAuthenticatedUser();

    Optional<Feature> featureCheck = featureRepository.findById(id);
    if(featureCheck.isEmpty())
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    final Feature feature = featureCheck.get();
    if(!feature.getUser().equals(user)) {
      return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    featureService.delete(id);
    return new ResponseEntity<>(HttpStatus.OK);

  }

  @GetMapping("/user/")
  public ResponseEntity<List<Feature>> getByUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    Set<String> roles = authentication.getAuthorities().stream().map(r -> r.getAuthority()).collect(Collectors.toSet());
    if(roles.contains("ROLE_USER"))
      features = featureService.getUser(authentication.getName());
    return new ResponseEntity<>(features, HttpStatus.OK);
  }


  @GetMapping("/product/{id}")
  public ResponseEntity<List<Feature>> getByProduct(@PathVariable("id")  Long id) {
    List<Feature> features = featureService.getProduct(id);
    return new ResponseEntity<>(features, HttpStatus.OK);
  }

  @GetMapping("/category/{id}")
  public ResponseEntity<List<Feature>> getByCategory(@PathVariable("id")  Long id) {
    List<Feature> features = featureService.getCategory(id);
    return new ResponseEntity<>(features, HttpStatus.OK);
  }

  @GetMapping("/filter/")
  public ResponseEntity<List<Feature>> getFilter(@RequestParam("categoryId") Optional<Long> categoryId, @RequestParam("productId") Optional<Long> productId) {

    List<Feature> features = new ArrayList<>();
    if (categoryId.isPresent() && productId.isPresent() )
      features = featureService.getFilter(categoryId.get(), productId.get());
    else if (productId.isPresent())
      features = featureService.getProduct(productId.get());
    else if (categoryId.isPresent() )
      features = featureService.getCategory(categoryId.get());
    else
      getAll(0,20);

    return new ResponseEntity<>(features, HttpStatus.OK);
  }
}

