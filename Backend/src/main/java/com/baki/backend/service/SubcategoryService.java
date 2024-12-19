package com.baki.backend.service;

import com.baki.backend.dto.SubCategoryDTO;
import com.baki.backend.model.Category;
import com.baki.backend.model.Subcategory;
import com.baki.backend.repository.CategoryRepository;
import com.baki.backend.repository.SubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubcategoryService {
    @Autowired
    private SubcategoryRepository subcategoryRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Subcategory> getAllSubcategories() {
        return subcategoryRepository.findAll();
    }

    public Subcategory getSubcategoryById(int id) {
        return subcategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subcategory not found"));
    }

    public Subcategory createSubcategory(SubCategoryDTO subCategoryDTO) {
        Category category = categoryRepository.findById(subCategoryDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Subcategory newSubcategory = new Subcategory();
        newSubcategory.setName(subCategoryDTO.getName());
        newSubcategory.setCategory(category);

        return subcategoryRepository.save(newSubcategory);
    }

    public Subcategory updateSubcategory(int id, SubCategoryDTO subCategoryDTO) {
        Subcategory existingSubcategory = getSubcategoryById(id);
        Category category = categoryRepository.findById(subCategoryDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        existingSubcategory.setName(subCategoryDTO.getName());
        existingSubcategory.setCategory(category);
        return subcategoryRepository.save(existingSubcategory);
    }

    public void deleteSubcategory(int id) {
        subcategoryRepository.deleteById(id);
    }

    public List<Subcategory> getSubcategoriesByCategoryId(int categoryId) {
        return subcategoryRepository.findByCategoryId(categoryId);
    }
}