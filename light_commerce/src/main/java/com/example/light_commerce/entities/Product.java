package com.example.light_commerce.entities;


import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class Product implements Serializable{
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String description;
	private Double currentPrice;
	private boolean promotion;
	private boolean selected;
	private boolean available;
	private String 	photoName;
	
	@Transient
	private int quantity = 1;
	
	@ManyToOne  // par default il prend  categoryid si on indique pas @JOINCOLUMNS
	private Category category;
}
