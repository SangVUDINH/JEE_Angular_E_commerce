import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Caddy } from '../models/caddy.model';
import { ProductItem } from '../models/item-product.model';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.scss']
})
export class CaddiesComponent implements OnInit {
  public caddies:Map<string,Caddy>= new Map();
  public currentCaddy:Caddy | undefined;
  
  constructor(public caddyService : CaddyService, 
    private authenticationService:AuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
    if(!this.authenticationService.isAuthenticated){
      this.router.navigateByUrl('/login');
    }
    this.currentCaddy=this.caddyService.getCurrentCaddy();
    this.caddies=this.caddyService.caddies;
  }

  onRemoveProductFromCaddy(pi:ProductItem){
    if(pi.product && this.currentCaddy){
      this.currentCaddy.items.delete(pi.product.id);
    }    
  }

  onNewOrder(){
    this.router.navigateByUrl("/client");
  }

  onAddCaddy(){
    this.caddyService.addNewCaddy();    
  }

  onSelectCaddy(caddyName:string){
    this.caddyService.currentCaddyName= caddyName;
    this.currentCaddy=this.caddyService.getCurrentCaddy();    
  }

  getValuesMap(map:any){   
      return Array.from(map.values());
  }
  
}
