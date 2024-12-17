package com.baki.backend.repository;

import com.baki.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.subcategory.category.id = :categoryId")
    List<Product> findByCategoryId(Long categoryId);

    List<Product> findBySubcategoryId(Long subcategoryId);

    List<Product> findByBrandId(Long brandId); // New method
}