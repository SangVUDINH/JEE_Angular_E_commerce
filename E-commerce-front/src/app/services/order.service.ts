import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { Order } from '../models/order.model';
import { CaddyService } from './caddy.service';
import { CatalogueService } from './catalogue.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order:Order= new Order();

  constructor(
    private caddyService:CaddyService,
    private catalogueService: CatalogueService,
    private httpClient:HttpClient
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

  submitOrder():Observable<Order> {
    return this.httpClient.post<Order>(this.catalogueService.host+"/orders",this.order);
  }

  public getOrder(id:number):Observable<Order>{
    return this.httpClient.get<Order>(this.catalogueService.host+"/orders/"+id);
  }

}
