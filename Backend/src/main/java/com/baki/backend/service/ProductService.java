package com.baki.backend.service;

import com.baki.backend.dto.ProductDTO;
import com.baki.backend.model.Brand;
import com.baki.backend.model.Product;
import com.baki.backend.model.Subcategory;
import com.baki.backend.repository.BrandRepository;
import com.baki.backend.repository.ProductRepository;
import com.baki.backend.repository.SubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private SubcategoryRepository subcategoryRepository;
    @Autowired
    private CloudinaryService cloudinaryService;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(int id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product createProduct(ProductDTO productDTO, MultipartFile file) {
        Subcategory subcategory = subcategoryRepository.findById(productDTO.getSubcategoryId())
                .orElseThrow(() -> new RuntimeException("Subcategory not found"));
        Brand brand = brandRepository.findById(productDTO.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        Product newProduct = new Product();

        newProduct.setName(productDTO.getName());
        newProduct.setBrand(brand);
        newProduct.setSubcategory(subcategory);
        newProduct.setPrice(productDTO.getPrice());
        newProduct.setStockQuantity(productDTO.getStockQuantity());
        newProduct.setImage(cloudinaryService.uploadFile(file, "products"));

        return productRepository.save(newProduct);
    }

    public Product updateProduct(int id, ProductDTO productDTO, MultipartFile file) {
        Product existingProduct = getProductById(id);
        Subcategory subcategory = subcategoryRepository.findById(productDTO.getSubcategoryId())
                .orElseThrow(() -> new RuntimeException("Subcategory not found"));
        Brand brand = brandRepository.findById(productDTO.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        existingProduct.setName(productDTO.getName());
        existingProduct.setBrand(brand);
        existingProduct.setSubcategory(subcategory);
        existingProduct.setPrice(productDTO.getPrice());
        existingProduct.setStockQuantity(productDTO.getStockQuantity());

        if (file != null)
            existingProduct.setImage(cloudinaryService.uploadFile(file, "products"));

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    // New methods
    public List<Product> getProductsByCategoryId(int categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> getProductsBySubcategoryId(int subcategoryId) {
        return productRepository.findBySubcategoryId(subcategoryId);
    }

    public List<Product> getProductsByBrandId(int brandId) {
        return productRepository.findByBrandId(brandId); // New method
    }

    public List<Product> search(String key) {
        return productRepository.searchByKey(key);
    }
}