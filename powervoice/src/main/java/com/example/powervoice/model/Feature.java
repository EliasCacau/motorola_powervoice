package com.example.powervoice.model;


import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Getter
@Setter
@Entity
public class Feature implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne
    private User user;

    @Column(nullable = false)
    private int viewsAmount;

    @ManyToOne(optional = false)
    private Product product;

    @ManyToOne(optional = false)
    private Category category;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EStatus status;

    @Column(nullable = false)
    private Date publishDate;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer likes;

    @Column(nullable = false)
    private boolean report;
    

}
