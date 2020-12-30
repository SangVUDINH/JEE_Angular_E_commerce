import { Client } from "./client.model";
import { ProductItem } from "./item-product.model";

export class Caddy {    
    public name:string | undefined;
    
    public items:Map<number,ProductItem>= new Map();
    public client: Client | undefined;
    
    constructor( name:string){this.name=name;}
}