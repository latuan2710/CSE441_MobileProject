package com.baki.backend.controller;

import com.baki.backend.model.Brand;
import com.baki.backend.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/service/brands")
public class BrandController {
    @Autowired
    private BrandService brandService;

    @GetMapping
    public List<Brand> getAllBrands() {
        return brandService.getAllBrands();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrand(@PathVariable int id) {
        return ResponseEntity.ok(brandService.getBrandById(id));
    }

    @PostMapping
    public ResponseEntity<Brand> createBrand(@RequestPart Brand brand, @RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(brandService.createBrand(brand, file));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brand> updateBrand(
            @PathVariable int id, @RequestBody Brand brand, @RequestPart(required = false) MultipartFile file) {
        return ResponseEntity.ok(brandService.updateBrand(id, brand,file));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable int id) {
        brandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }
}