import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Caddy } from '../models/caddy.model';
import { Client } from '../models/client.model';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public mode:number = 0;
  public currentCaddy:Caddy | undefined;

  constructor( private caddyService:CaddyService,
    private authentificationService: AuthenticationService,
    public orderService:OrderService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentCaddy = this.caddyService.getCurrentCaddy();
  }

  getCurrentCaddy(){
    return this.caddyService.getCurrentCaddy();
  }



  onSaveClient(client:Client) {
    client.username=this.authentificationService.userAuthenticated.username;
    

    // SI j'utilise 2WAYs bindign [(ngModel)] je n'ai pas besoin de faire un MAJ    
    //this.caddyService.setClient(client);

    this.orderService.setClient(client);
    this.orderService.loadProductsFromCaddy();
    
    console.log(this.getCurrentCaddy());
    this.mode=1;
  }

  onOrder() {
    this.orderService.submitOrder().subscribe(data=>{
      console.log(data);
      this.orderService.order.id=data.id;
      this.orderService.order.date=data.date;    

    },err=>{
      console.log(err);
    });
  }

  onPayOrder() {
    this.router.navigateByUrl("/payment/"+this.orderService.order.id);
  }

}
