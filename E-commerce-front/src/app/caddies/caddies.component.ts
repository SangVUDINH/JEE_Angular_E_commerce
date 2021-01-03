import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Caddy } from '../models/caddy.model';
import { ProductItem } from '../models/item-product.model';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.scss']
})
export class CaddiesComponent implements OnInit {
  public caddies:Map<string,Caddy>= new Map();
  public currentCaddy:any;
  
  constructor(public caddyService : CaddyService, 
    private router:Router) { }

  ngOnInit(): void {
    this.currentCaddy=this.caddyService.getCurrentCaddy();
  }

  onRemoveProductFromCaddy(pi:ProductItem){
    if(pi.product){
      this.currentCaddy.items.delete(pi.product.id);
    }    
  }

  onNewOrder(){
    this.router.navigateByUrl("/client");
  }
  
}
