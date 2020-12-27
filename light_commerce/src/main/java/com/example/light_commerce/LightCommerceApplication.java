package com.example.light_commerce;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.example.light_commerce.dao.CategoryRepository;
import com.example.light_commerce.dao.ProductRepository;
import com.example.light_commerce.entities.Category;
import com.example.light_commerce.entities.Product;

import net.bytebuddy.utility.RandomString;

@SpringBootApplication
public class LightCommerceApplication implements CommandLineRunner {

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private RepositoryRestConfiguration repositoryRestConfiguration;
	
	public static void main(String[] args) {
		SpringApplication.run(LightCommerceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		repositoryRestConfiguration.exposeIdsFor(Product.class, Category.class);
		
		Category cate1 = new Category(null,"ORDINATEUR",null,null,null); 
		Category cate2 = new Category(null,"PORTABLE",null,null,null); 
		Category cate3 = new Category(null,"TABLETTE",null,null,null); 
		
		categoryRepository.save(cate1 );
		categoryRepository.save(cate2 );
		categoryRepository.save(cate3 );
		
		Random rnd = new Random();
		
		categoryRepository.findAll().forEach(c -> {
			for(int i = 0; i<10 ; i++) {
				Product p=new Product();
				p.setName(RandomString.make(18));
				p.setCurrentPrice((double) (100+rnd.nextInt(1000)));
				p.setAvailable(rnd.nextBoolean());
				p.setPromotion(rnd.nextBoolean());
				p.setSelected(rnd.nextBoolean());
				p.setPhotoName("unknown.png");
				p.setCategory(c);
				
				productRepository.save(p);
			}
			
		});
	}

}
