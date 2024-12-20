package com.baki.backend.repository;

import com.baki.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT p FROM Product p WHERE p.subcategory.category.id = :categoryId")
    List<Product> findByCategoryId(int categoryId);

    @Query("SELECT p FROM Product p WHERE p.subcategory.id = :subcategoryId")
    List<Product> findBySubcategoryId(int subcategoryId);

    @Query("SELECT p FROM Product p WHERE p.brand.id = :brandId")
    List<Product> findByBrandId(int brandId); // New method

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :key, '%'))")
    List<Product> searchByKey(String key);
}