import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from '../models/cardetail';
import { CardetailService } from '../services/cardetail.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  cardetails: CarDetail[] = [];
  
  imageUrl = 'https://localhost:44319/';

  constructor(
    private carDetailService: CardetailService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.activedRoute.params.subscribe((params) => {
      if (params['colorId']) {
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
        console.log(this.cardetails)
      });
  }

  getBrandDetailByBrand(brandId: number) {
    this.carDetailService
      .getCarDetailsByBrand(brandId)
      .subscribe((response) => {
        this.cardetails = response.data;
        console.log(this.cardetails)
      });
  }
}
