import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';



@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }
  
  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  addColor(){
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({},this.colorAddForm.value)
    console.log(colorModel);
    this.colorService.add(colorModel).subscribe(response=>{
      console.log(response)
      this.toastrService.success(response.message,"başarılı")
    },responseError=>{
      console.log(responseError.error)
      this.toastrService.error(responseError.error)
    })
    }
    else{
      this.toastrService.error("Form Eksik","dikkat")
    }
    
  }
}
