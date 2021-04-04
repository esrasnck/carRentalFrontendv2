import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { HttpClientModule } from '@angular/common/http';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CardetailimageComponent } from './components/cardetailimage/cardetailimage.component';
import { CustomerdetailComponent } from './components/customerdetail/customerdetail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { CardetailPipePipe } from './pipes/cardetail-pipe.pipe';
import { RentalComponent } from './components/rental/rental.component';
import { PaymentComponent } from './components/payment/payment.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BrandAddComponent } from './components/admin/add/brand-add/brand-add.component';
import { ColorAddComponent } from './components/admin/add/color-add/color-add.component';
import { CarAddComponent } from './components/admin/add/car-add/car-add.component';
import { CardetaillistComponent } from './components/admin/cardetaillist/cardetaillist.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BrandComponent,
    ColorComponent,
    CardetailComponent,
    CardetailimageComponent,
    CustomerdetailComponent,
    ColorPipePipe,
    BrandPipePipe,
    CardetailPipePipe,
    RentalComponent,
    PaymentComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CardetaillistComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
