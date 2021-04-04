
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/cardetail';
import { Color } from 'src/app/models/color';

import { BrandService } from '../../services/brand.service';
import { CardetailService } from '../../services/cardetail.service';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  cardetails: CarDetail[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  brandFilter: number=0;
  colorFilter: number=0;
  cardetailFilter='';
 

  imageUrl = 'https://localhost:44319/';

  constructor(
    private carDetailService: CardetailService,
    private activedRoute: ActivatedRoute,
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllColors();

    this.activedRoute.params.subscribe((params) => {
      if(params['colorId'] && params['brandId']){
        this.getCarDetailByColorAndBrand(params['colorId'],params['brandId']);
      }
       else if (params['colorId']) {
        this.getCarDetailByColor(params['colorId']);
      } else if (params['brandId']) {
        this.getBrandDetailByBrand(params['brandId']);
      } else {
        this.getCarDetails();
      }
    });
  }

  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe((response) => {
      this.cardetails = response.data;
      console.log(this.cardetails);
    });
  }

  getCarDetailByColor(colorId: number) {
    this.carDetailService
      .getCarDetailsByColor(colorId)
      .subscribe((response) => {
        this.cardetails = response.data;
        console.log(this.cardetails);
      });
  }

  getBrandDetailByBrand(brandId: number) {
    this.carDetailService
      .getCarDetailsByBrand(brandId)
      .subscribe((response) => {
        this.cardetails = response.data;
        console.log(this.cardetails);
      });
  }

  getAllColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      console.log(this.colors);
    });
  }

  getAllBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      console.log(this.brands);
    });
  }

  getSelectedBrand(brandId: number) {
    if (this.brandFilter == brandId) return true;
    else return false;
  }

  getSelectedColor(colorId:number){
    if(this.colorFilter == colorId) return true;
    else return false;
  }
 
  getCarDetailByColorAndBrand(colorId: number, brandId: number) {
    this.carDetailService.getCarDetailByColorAndBrand(colorId, brandId)
      .subscribe((response) => {
        console.log(response)
        this.cardetails = response.data;
      });
  }


  /* kullanmazsan sil. simdilik kullanmıyorsun
  getCarDetailByCarId(carId:number){
    this.carDetailService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.cardetails =response.data;
      console.log(this.cardetails);
    })
  }*/
}
