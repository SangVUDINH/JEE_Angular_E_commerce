import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CatalogueService } from '../services/catalogue.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public products: any;
  public editPhoto: boolean = false;
  public currentProduct: any;
  private selectedFiles: any;
  public progess: number = 0;
  private currentFileUpload: any;
  private currentTimeStamp: number=0;

  title: string | undefined;

  constructor(private catalogueService: CatalogueService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authentificationService:AuthenticationService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(
      value => {
        if (value instanceof NavigationEnd) {
        
          let p1 = this.activatedRoute.snapshot.params.p1;
          if (p1 == 1) {

            this.title = "Selection";
            this.getProducts("/products/search/selectedProducts");
            console.log("SELECTED products");
          }

          else if (p1 == 2) {
            this.title = "Category";
            let idCategory = this.activatedRoute.snapshot.params.p2;
            this.getProducts('/categories/' + idCategory + '/products');
            console.log("CATEGORY products");
          }

          else if (p1 == 3) {
            this.title = "Promotion";
            this.getProducts('/products/search/promoProducts');
            console.log("PROMO products");
          }

          else if (p1 == 4) {
            this.title = "Disponible";
            this.getProducts('/products/search/dispoProducts');
            console.log("DISPO products");
          }

          else if (p1 == 5) {
            this.title="Rercherche ...";
          }
        }
      }
    );

    let p1 = this.activatedRoute.snapshot.params.p1;
    console.log("P1 :" + p1);
    if (p1 == 1) {
      this.getProducts("/products/search/selectedProducts");
      console.log("SELECTED products");
    }
  }

  getProducts(url: string) {
    this.catalogueService.getResource(url).subscribe
      (
        data => {
          this.products = data;
        }, error => {
          console.log(error);
        }
      );
  }

  onEditPhoto(p: any) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progess = 0;
    // on upload le 1 premier fichier
    this.currentFileUpload = this.selectedFiles.item(0);

    this.catalogueService.uploadPhoto(this.currentFileUpload, this.currentProduct.id).subscribe
      (event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progess = Math.round(100 * event.loaded / event.total);
        }
        else if (event instanceof HttpResponse) {
          // la MAJ le product en particulier, probleme de cache
          //solution => image ID+ timestamp
          this.currentTimeStamp= Date.now();

        }
      }, error => {
        alert('probleme de chargement !');
      }
      );

    this.selectedFiles = undefined;
  }

  getTS(){
    return this.currentTimeStamp;
  }

  getHost(){
    return this.catalogueService.host;
  }

  isAdmin(){
    return this.authentificationService.isAdmin();
  }

  onAddProductToCaddy(p:any){

  }
  

}
