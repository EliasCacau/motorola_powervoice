package com.example.powervoice.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.powervoice.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    
    @Query(
        "SELECT U FROM User U WHERE U.name LIKE %?1%"+
        "OR username LIKE %?1%"+
        "OR email LIKE %?1%"
    )
    Page<List<User>> findByAll(String termoBusca, Pageable pageable);
    User findByUsername(String username);
    User findByEmail(String email);
    User findByUsernameOrEmail(String username, String email);

    @Query("SELECT u FROM User u")
    Page<List<User>> findPageable (Pageable pageable);

}
