import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path:'products/:p1/:p2', component:ProductComponent},
  { path:'', redirectTo:'products/1/0', pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
