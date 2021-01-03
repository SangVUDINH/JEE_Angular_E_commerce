package com.example.light_commerce.web;

import com.example.light_commerce.entities.Product;

import lombok.Data;

@Data
class OrderProduct{
    private Product product;
    private int quantity;

}
