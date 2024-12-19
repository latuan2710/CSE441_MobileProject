package com.baki.backend.controller;

import com.baki.backend.dto.SubCategoryDTO;
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
    public ResponseEntity<Subcategory> getSubcategory(@PathVariable int id) {
        return ResponseEntity.ok(subcategoryService.getSubcategoryById(id));
    }

    @PostMapping
    public ResponseEntity<Subcategory> createSubcategory(@RequestBody SubCategoryDTO subCategoryDTO) {
        return ResponseEntity.ok(subcategoryService.createSubcategory(subCategoryDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subcategory> updateSubcategory(@PathVariable int id, @RequestBody SubCategoryDTO subCategoryDTO) {
        return ResponseEntity.ok(subcategoryService.updateSubcategory(id, subCategoryDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubcategory(@PathVariable int id) {
        subcategoryService.deleteSubcategory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category/{categoryId}")
    public List<Subcategory> getSubcategoriesByCategoryId(@PathVariable int categoryId) {
        return subcategoryService.getSubcategoriesByCategoryId(categoryId);
    }
}