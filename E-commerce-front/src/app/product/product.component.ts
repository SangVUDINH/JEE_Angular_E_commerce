import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CatalogueService } from '../services/catalogue.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public products: any;

  constructor(private catalogueService: CatalogueService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){    
     }

  ngOnInit(): void {    
    this.router.events.subscribe(
      value => {
       if (value instanceof NavigationEnd ){
         let url = value.url;
         console.log(url);

         let p1 = this.activatedRoute.snapshot.params.p1;

         console.log("P1 :"+p1);         
         if (p1 == 1){
           this.getProducts("/products/search/selectedProducts");
           console.log("SELECTED products");
         }
         
         if (p1 ==2){
           let idCategory = this.activatedRoute.snapshot.params.p2;
           this.getProducts('/categories/'+idCategory+'/products');
           console.log("CATEGORY products");
         }
       }       
      }
    );

    let p1 = this.activatedRoute.snapshot.params.p1;
         console.log("P1 :"+p1);         
         if (p1 == 1){
           this.getProducts("/products/search/selectedProducts");
           console.log("SELECTED products");
         }
  }

  getProducts(url:string) {
    this.catalogueService.getResource(url).subscribe
    (
      data=>{
        this.products = data;
      }, error => {
        console.log(error);
      }
    );
  }

}
