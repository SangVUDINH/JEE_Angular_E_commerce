import { Client } from "./client.model";
import { ProductItem } from "./item-product.model";

export class Order {
    public id:number |undefined;
    public client:Client={name:"", address:"", phoneNumber:"", email:"", username:""}
    public products:Array<ProductItem>=[];
    public totalAmount:number=0;
    public date:Date | undefined;
}