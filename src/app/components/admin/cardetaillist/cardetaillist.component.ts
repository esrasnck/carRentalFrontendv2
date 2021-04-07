import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CardetailService } from 'src/app/services/cardetail.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-cardetaillist',
  templateUrl: './cardetaillist.component.html',
  styleUrls: ['./cardetaillist.component.css']
})
export class CardetaillistComponent implements OnInit {
 cardetails: CarDetail[]=[];
 carDetail:CarDetail
 colors:Color[]=[];
 color:Color;
 brands:Brand[]=[];
 brand:Brand;
 car:Car;
 cars:Car[]=[];


  constructor(private cardetailService:CardetailService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.getCarDetails();
    this.getCars();

  }
  
  getCars(){
    this.cardetailService.getCars().subscribe(response=>{
      this.cars =response.data;
    })
  }

  getCarDetails() {
    this.cardetailService.getCarDetails().subscribe((response) => {
      this.cardetails = response.data;
      console.log(this.cardetails);
    });
  }
  getCarDetailByCarId(carId:number){
    this.cardetailService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.carDetail = response.data[0];
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=> {
      this.brands=response.data;
    })
  } 

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors =response.data;
      console.log(this.colors)
      
    })}

    getBrand(brandId:number){
      this.brandService.getByBrandId(brandId).subscribe(response=>{
        console.log(response)
        this.brand=response.data
        console.log(this.brand);
      })
    }  
  
    removeBrand(brand:Brand){
      console.log(brand)
   
      this.brandService.deleteBrand(brand).subscribe(response=>{
        this.toastrService.success("gitti")
      },responseError=>{
        this.toastrService.error(responseError.errors,"Marka silinemedi");
      });
     
    
    }
    
    removeCar(car:Car){
      this.cardetailService.deleteCar(car).subscribe(response=>{
        this.toastrService.success("silindi")
        console.log("deneme")
      },responseError=>{

        this.toastrService.error(responseError.errors,"Arac silinemedi");
        
      })
    }
   
    removeColor(color:Color){
      this.colorService.deleteColor(color).subscribe(response=>{
        this.toastrService.success("silindi")
      },responseError=>{
        this.toastrService.error(responseError.errors,"renk silinemedi");
        
      })
    }


  
}
