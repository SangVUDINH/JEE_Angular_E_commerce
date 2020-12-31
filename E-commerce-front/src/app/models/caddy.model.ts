import { ClientComponent } from "../client/client.component";
import { Client } from "./client.model";
import { ProductItem } from "./item-product.model";

export class Caddy {    
    public name:string="";
    
    public items:Map<number,ProductItem>= new Map();
    public client: Client = new Client();
    
    constructor( name:string){this.name=name;}
}