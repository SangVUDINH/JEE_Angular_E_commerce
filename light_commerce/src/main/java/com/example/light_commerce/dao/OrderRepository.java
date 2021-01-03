package com.example.light_commerce.dao;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.light_commerce.entities.Order;

@CrossOrigin("*")
@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long> {

}

