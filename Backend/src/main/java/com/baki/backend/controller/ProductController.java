package com.baki.backend.controller;

import com.baki.backend.dto.ProductDTO;
import com.baki.backend.model.Product;
import com.baki.backend.service.ProductService;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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
    public ResponseEntity<Product> getProduct(@PathVariable int id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String key) {
        return ResponseEntity.ok(productService.search(key));
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(
            @RequestPart ProductDTO product, @RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(productService.createProduct(product, file));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable int id, @RequestPart ProductDTO product, @RequestPart(required = false) MultipartFile file) {
        return ResponseEntity.ok(productService.updateProduct(id, product, file));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // New endpoints
    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategoryId(@PathVariable int categoryId) {
        return productService.getProductsByCategoryId(categoryId);
    }

    @GetMapping("/subcategory/{subcategoryId}")
    public List<Product> getProductsBySubcategoryId(@PathVariable int subcategoryId) {
        return productService.getProductsBySubcategoryId(subcategoryId);
    }

    @GetMapping("/brand/{brandId}") // New endpoint
    public List<Product> getProductsByBrandId(@PathVariable int brandId) {
        return productService.getProductsByBrandId(brandId);
    }
}