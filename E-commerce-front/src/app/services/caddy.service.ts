import { Injectable } from '@angular/core';
import { Caddy } from '../models/caddy.model';
import { ProductItem } from '../models/item-product.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  public caddies:Map<string,Caddy>= new Map();
  public currentCaddyName:string="Caddy1";

  constructor() { 
    /*
    let caddies = localStorage.getItem('myCaddies');
    if(caddies){
      this.caddies= JSON.parse(caddies);
    } else {
       //1 panier charger de base
      
    }    */   

    let caddy = new Caddy(this.currentCaddyName);
    this.caddies.set(this.currentCaddyName,caddy);
      
  }

  public addProductToCaddy(product:Product){
    let caddy = this.caddies.get(this.currentCaddyName);     
    let productItem = caddy?.items.get(product.id);

    if(productItem && productItem.quantity){
      productItem.quantity+=product.quantity;
    }
    else {
      productItem = new ProductItem();
      productItem.price = product.currentPrice;
      productItem.quantity= product.quantity;
      productItem.product = product;

      caddy?.items.set(product.id, productItem);

      
      
    }
    this.saveCaddies();
 
    
    }

  getCurrentCaddy(){
    return this.caddies.get(this.currentCaddyName);
  }

  public getTotal():number{
    let total=0;
    let items:IterableIterator<ProductItem>=this.getCurrentCaddy().items.values();
    
    for (let pi of items){
      total += pi.price*pi.quantity;
    }
    return total;
  }

  public saveCaddies(){
    localStorage.setItem('myCaddies', JSON.stringify(this.caddies));
  }
}
