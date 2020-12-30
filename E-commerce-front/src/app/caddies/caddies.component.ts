import { Component, OnInit } from '@angular/core';
import { Caddy } from '../models/caddy.model';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.scss']
})
export class CaddiesComponent implements OnInit {
  public caddies:Map<string,Caddy>= new Map();
  
  constructor(public caddyService : CaddyService) { }

  ngOnInit(): void {
  }
  
}
