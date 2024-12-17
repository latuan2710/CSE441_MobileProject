package com.baki.backend.service;

import com.baki.backend.model.Product;
import com.baki.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(int id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product createProduct(Product product,MultipartFile file) {
        product.setImage(cloudinaryService.uploadFile(file,"products"));
        return productRepository.save(product);
    }

//    public ResponseEntity<Map> uploadImage(int id, MultipartFile file) {
//        try {
//            Product product = productRepository.findById(id)
//                    .orElseThrow(() -> new RuntimeException("Product not found"));
//            product.setImage(cloudinaryService.uploadFile(file,"products"));
//            productRepository.save(product);
//            String data = product.getImage().toString();
//
//            return ResponseEntity.ok().body(Map.of("url",data, "product",product
//            ));
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//
//
//    }
    public Product updateProduct(int id, Product product) {
        Product existingProduct = getProductById(id);
        existingProduct.setName(product.getName());
        existingProduct.setBrand(product.getBrand());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStockQuantity(product.getStockQuantity());
        existingProduct.setImage(product.getImage());
        existingProduct.setSale(product.getSale());
        existingProduct.setRating(product.getRating());
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
}