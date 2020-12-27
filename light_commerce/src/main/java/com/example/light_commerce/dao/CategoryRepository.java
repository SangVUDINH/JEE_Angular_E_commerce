package com.example.light_commerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.light_commerce.entities.Category;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
