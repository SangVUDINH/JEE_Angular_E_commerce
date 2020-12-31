import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaddiesComponent } from './caddies/caddies.component';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [

  { path:'login', component:LoginComponent},
  { path:'caddies', component:CaddiesComponent},
  { path:'client', component:ClientComponent},
  { path:'products/:p1/:p2', component:ProductComponent},
  { path:'product-details/:url', component:ProductDetailComponent},
  { path:'', redirectTo:'products/1/0', pathMatch:'full'},  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
