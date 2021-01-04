import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CaddyService } from './services/caddy.service';
import { CatalogueService } from './services/catalogue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  public  categories:any;
  public currentCategory:any;

  constructor(private catalogueService: CatalogueService,
    private router: Router,
    private authenticationService:AuthenticationService,
    public caddyService:CaddyService
    ){
    
  }

  ngOnInit(): void {
    this.getCategories();
    this.router.navigateByUrl('/products/1/0');
    this.authenticationService.loadAuthenticatedUserFromLocalStorage();
  }

  getCategories() {
    this.catalogueService.getResource("/categories").subscribe(
      result => {
        this.categories=result;
      }, error =>{
        console.log(error);
      }
    );
  }

  getProductsByCategory(c:any){
    this.currentCategory=c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }

  onSelectedProducts(){
    this.currentCategory=undefined;
    this.router.navigateByUrl('/products/1/0');
  }

  onProductsPromo(){
    this.currentCategory=undefined;
    this.router.navigateByUrl('/products/3/0');
  }

  onProductsDispo(){
    this.currentCategory=undefined;
    this.router.navigateByUrl('/products/4/0');
  }
  
  onLogout(){
    this.authenticationService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }

}

