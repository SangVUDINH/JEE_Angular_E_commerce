import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentAmount :number | undefined;
  currentOrder:Order | undefined;

  constructor(
    private route:ActivatedRoute,
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
    let id=this.route.snapshot.params.orderID
    this.orderService.getOrder(id).subscribe(data=>{
      console.log(data);
      this.currentOrder=data;
    },err=>{
      console.log(err);
    })
  }

  onParOrder(data: any) {
    console.log(data);
  }

}
