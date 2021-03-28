import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardetailComponent } from './components/cardetail/cardetail.component';

const routes: Routes = [
  {path:"",component:CardetailComponent},
  {path:"cardetails",component:CardetailComponent},
  {path:"cardetails/brand/:brandId",component:CardetailComponent},
  {path:"cardetails/color/:colorId",component:CardetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
