package com.baki.backend.controller;

import com.baki.backend.model.Subcategory;
import com.baki.backend.service.SubcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service/subcategories")
public class SubcategoryController {
    @Autowired
    private SubcategoryService subcategoryService;

    @GetMapping
    public List<Subcategory> getAllSubcategories() {
        return subcategoryService.getAllSubcategories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subcategory> getSubcategory(@PathVariable Long id) {
        return ResponseEntity.ok(subcategoryService.getSubcategoryById(id));
    }

    @PostMapping
    public ResponseEntity<Subcategory> createSubcategory(@RequestBody Subcategory subcategory) {
        return ResponseEntity.ok(subcategoryService.createSubcategory(subcategory));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subcategory> updateSubcategory(@PathVariable Long id, @RequestBody Subcategory subcategory) {
        return ResponseEntity.ok(subcategoryService.updateSubcategory(id, subcategory));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubcategory(@PathVariable Long id) {
        subcategoryService.deleteSubcategory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category/{categoryId}")
    public List<Subcategory> getSubcategoriesByCategoryId(@PathVariable Long categoryId) {
        return subcategoryService.getSubcategoriesByCategoryId(categoryId);
    }
}