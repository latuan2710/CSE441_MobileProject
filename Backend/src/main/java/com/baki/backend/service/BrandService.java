package com.baki.backend.service;

import com.baki.backend.model.Brand;
import com.baki.backend.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class BrandService {
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public Brand getBrandById(Long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));
    }

    public Brand createBrand(Brand brand, MultipartFile file) {
        brand.setLogo(cloudinaryService.uploadFile(file,"Logo"));
        return brandRepository.save(brand);
    }

    public Brand updateBrand(Long id, Brand brand) {
        Brand existingBrand = getBrandById(id);
        existingBrand.setName(brand.getName());
        existingBrand.setLogo(brand.getLogo());
        return brandRepository.save(existingBrand);
    }

    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }
}