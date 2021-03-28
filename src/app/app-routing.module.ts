import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CardetailimageComponent } from './components/cardetailimage/cardetailimage.component';

const routes: Routes = [
  {path:"",component:CardetailComponent},
  {path:"cardetails",component:CardetailComponent},
  {path:"cardetails/brand/:brandId",component:CardetailComponent},
  {path:"cardetails/color/:colorId",component:CardetailComponent},
  {path:"cardetails/cardetailimage/:carId",component:CardetailimageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
