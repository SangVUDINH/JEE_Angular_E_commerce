import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { CatalogueService } from '../services/catalogue.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public mode:number = 0;
  public products: any;
  public editPhoto: boolean = false;
  public currentProduct: Product;
  private selectedFiles: any;
  public progess: number = 0;
  private currentFileUpload: any;
  private currentTimeStamp: number=0;

  constructor(private route:ActivatedRoute,
    private catalogueService: CatalogueService,
    private authenticationService:AuthenticationService
    ) { }

    
  ngOnInit(): void {
    let url = atob(this.route.snapshot.params.url);
    console.log(url);
    this.catalogueService.getProduct(url).subscribe(
      data =>{        
          this.currentProduct = data;        
      }
    );
  }

  onEditProduct(){
    this.mode=1;
  }

  getTS(){
    return this.currentTimeStamp;
  }

  getHost(){
    return this.catalogueService.host;
  }

  isAdmin(){
    return this.authenticationService.isAdmin();
  }

  uploadPhoto() {
    this.progess = 0;
    // on upload le 1 premier fichier
    this.currentFileUpload = this.selectedFiles.item(0);
    if (this.currentProduct){
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
      });

    }    
    this.selectedFiles = undefined;
  }

  onEditPhoto(p: Product) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  onAddProductToCaddy(currentProduct:Product){

  }


  onUpdateProduct(data){
    let url=this.currentProduct._links.self.href;
    this.catalogueService.patchResource(url,data).subscribe(
      d=>{
        this.currentProduct=d;
        this.mode=0;
      },(error: any) =>{
        console.log(error);
        
      }
    );
  }
}
