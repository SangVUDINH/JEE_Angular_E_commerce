import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Order } from '../models/order.model';
import { CaddyService } from './caddy.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order:Order= new Order();

  constructor(
    private caddyService:CaddyService
  ) { }

  public setClient(client:Client){
    this.order.client=client;
  }

  public loadProductsFromCaddy(){
    this.order.products=[];

    this.caddyService.getCurrentCaddy()?.items.forEach((value: any, key: any) => {
      console.log(key, value);
      this.order.products.push(value);
    });
    console.log(this.order.products);
  }

  public getTotal():number{
    let total:number=0;
    this.order.products.forEach(p=>{
      total+=p.price!*p.quantity!;
    });
    return total;
  }

}
