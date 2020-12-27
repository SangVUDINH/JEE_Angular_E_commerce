import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from './services/catalogue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public  categories:any;
  public currentCategory:any;

  constructor(private catalogueService: CatalogueService
    , private router: Router){
    
  }

  ngOnInit(): void {
    this.getCategories();
    this.router.navigateByUrl('/products/1/0');
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
  
}

