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

    public Brand getBrandById(int id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));
    }

    public Brand createBrand(Brand brand, MultipartFile file) {
        brand.setLogo(cloudinaryService.uploadFile(file, "Logo"));
        return brandRepository.save(brand);
    }

    public Brand updateBrand(int id, Brand brand, MultipartFile file) {
        Brand existingBrand = getBrandById(id);
        existingBrand.setName(brand.getName());
        existingBrand.setLogo(brand.getLogo());

        if (file != null) {
            existingBrand.setLogo(cloudinaryService.uploadFile(file, "Logo"));
        }

        return brandRepository.save(existingBrand);
    }

    public void deleteBrand(int id) {
        brandRepository.deleteById(id);
    }
}