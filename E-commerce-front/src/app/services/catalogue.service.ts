import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host:string = "http://localhost:8080";

  // Injection de dépendance
  constructor(private http: HttpClient) { }

  public getResource(url: string){
    return this.http.get(this.host+url);

  }

}
