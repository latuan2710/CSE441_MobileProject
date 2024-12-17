package com.baki.backend.controller;

import com.baki.backend.model.Product;
import com.baki.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/service/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestPart Product product, @RequestPart("file") MultipartFile file) {
       try {
           return ResponseEntity.ok(productService.createProduct(product,file));
       } catch (Exception e) {
        e.printStackTrace();
        return null;
        }

    }


    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // New endpoints
    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategoryId(@PathVariable Long categoryId) {
        return productService.getProductsByCategoryId(categoryId);
    }

    @GetMapping("/subcategory/{subcategoryId}")
    public List<Product> getProductsBySubcategoryId(@PathVariable Long subcategoryId) {
        return productService.getProductsBySubcategoryId(subcategoryId);
    }

    @GetMapping("/brand/{brandId}") // New endpoint
    public List<Product> getProductsByBrandId(@PathVariable Long brandId) {
        return productService.getProductsByBrandId(brandId);
    }
}