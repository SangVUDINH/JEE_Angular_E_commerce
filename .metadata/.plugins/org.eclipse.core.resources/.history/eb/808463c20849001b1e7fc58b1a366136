package com.example.light_commerce.web;

import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.light_commerce.dao.ProductRepository;
import com.example.light_commerce.entities.Product;

@RestController
public class CatalogueController {
	
	
	private ProductRepository productRepository;
	
	// injection via un constructor et no @Autowired
	public CatalogueController( ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	// fichier donc on return un array de byte
	@GetMapping(path="/photoProduct/{id}", produces = MediaType.IMAGE_PNG_VALUE)
	public byte[] getPhoto(@PathVariable("id") Long id)  throws Exception{
		
		Product p = productRepository.findById(id).get();
		return Files.readAllBytes(Paths.get(System.getProperty("user.home")+"/ecom/products/"+p.getPhotoName()));
		
		
	}
}
