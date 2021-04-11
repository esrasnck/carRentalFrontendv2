import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/admin/add/brand-add/brand-add.component';
import { CarAddComponent } from './components/admin/add/car-add/car-add.component';
import { ColorAddComponent } from './components/admin/add/color-add/color-add.component';
import { CardetaillistComponent } from './components/admin/cardetaillist/cardetaillist.component';
import { UserComponent } from './components/admin/user/user.component';

import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CardetailimageComponent } from './components/cardetailimage/cardetailimage.component';
import { CustomerdetailComponent } from './components/customerdetail/customerdetail.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",component:CardetailComponent},
  {path:"cardetails",component:CardetailComponent},
  {path:"cardetails/brand/:brandId",component:CardetailComponent},
  {path:"cardetails/color/:colorId",component:CardetailComponent},
  {path:"cardetails/color/:colorId/brand/:brandId",component:CardetailComponent},
  {path:"cardetails/cardetailimage/:carId",component:CardetailimageComponent},
  {path:"cardetails/customers/:carId",component:CustomerdetailComponent},
  {path:"cardetails/rental/:carId",component:RentalComponent},
  {path:"cardetails/payment",component:PaymentComponent},
  {path:"admin/brands/add",component:BrandAddComponent,canActivate:[AdminGuard]},
  {path:"admin/colors/add",component:ColorAddComponent,canActivate:[AdminGuard]},
  {path:"admin/cars/add",component:CarAddComponent,canActivate:[AdminGuard]},
  {path:"admin/cardetails",component:CardetaillistComponent,canActivate:[AdminGuard]},
  {path:"admin/user",component:UserComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
