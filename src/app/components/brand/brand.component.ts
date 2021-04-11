import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';

import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

   brands:Brand[]=[];
   brandFilter='';

  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=> {
      this.brands=response.data;
    })
  } 

 

}
