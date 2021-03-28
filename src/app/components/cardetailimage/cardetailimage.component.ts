import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CarDetail } from '../models/cardetail';
import { CarImage } from '../models/carImage';
import { CardetailService } from '../services/cardetail.service';
import { CarimageService } from '../services/carimage.service';

@Component({
  selector: 'app-cardetailimage',
  templateUrl: './cardetailimage.component.html',
  styleUrls: ['./cardetailimage.component.css']
})
export class CardetailimageComponent implements OnInit {
  carImage:CarImage[]=[];
  cardetails:CarDetail;
  imageUrl = "https://localhost:44319";


  constructor(private cardetailService:CardetailService, private carImageService:CarimageService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
       this.getCarDetailByCarId(params["carId"]),
       this.getCarImage(params["carId"])
      }
     
    })
  }

  getCarImage(carId:number){
    this.carImageService.getCarImage(carId).subscribe(response=>{
      this.carImage = response.data;
      console.log(this.carImage);
      console.log(response)
    })
  }

  getCarDetailByCarId(carId:number){
    this.cardetailService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.cardetails = response.data[0];
    })
  }

  getImagePath(image:string){
    return this.imageUrl + image;
  }




}
