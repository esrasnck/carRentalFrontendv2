import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, 
    private brandService:BrandService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
   this.createBrandAddForm();

  }

  createBrandAddForm(){
  this.brandAddForm = this.formBuilder.group({
    brandName:["",Validators.required]
  })

  }

  addBrand(){
  
   if (this.brandAddForm.valid) {
      let brandModel=Object.assign({},this.brandAddForm.value)
       console.log(brandModel);
       this.brandService.add(brandModel).subscribe(response=>{
         console.log(response)
         this.toastrService.success(response.message,"Başarılı")
         setTimeout(() => {
          this.router.navigate(["/admin/cardetails"])
         }, 1000);
         
       },
       (responseError)=>{
        if (responseError.error.Errors.length > 0) {
          console.log(responseError.error.Errors);
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Doğrulama hatası'
            );
          }
        }
       }
       )
   }
   else{
     this.toastrService.error("Form eksik","Dikkat")
   }
    
  }
}
