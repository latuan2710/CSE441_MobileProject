package com.baki.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 100)
    private String name;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    @JsonIgnore
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "subcategory_id", nullable = false)
    @JsonIgnore
    private Subcategory subcategory;

    @Column(nullable = false)
    private double price;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    private String image;

    private double sale = 0;

    private double rating;
}