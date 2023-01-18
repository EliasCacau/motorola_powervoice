package com.example.powervoice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.powervoice.model.Codigo;
import com.example.powervoice.model.User;

@Repository
public interface CodigoRepository extends JpaRepository<Codigo, Long> {
 
    Codigo findByUser(User usuario);
    Codigo findByUserAndCodigo (User usuario, Integer codigo);

}
