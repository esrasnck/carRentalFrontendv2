import { Component, OnInit } from '@angular/core';
import { CarDetail } from '../models/cardetail';
import { CardetailService } from '../services/cardetail.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
 cardetails:CarDetail[]= []
 imageUrl="https://localhost:44319/"

  constructor(private carDetailService:CardetailService) { }

  ngOnInit(): void {
    this.getCarDetails();
   
  }
  
  getCarDetails(){
    this.carDetailService.getCarDetails().subscribe(response=>{
      this.cardetails =response.data;
      console.log(this.cardetails)
    })
  }




  }
  
