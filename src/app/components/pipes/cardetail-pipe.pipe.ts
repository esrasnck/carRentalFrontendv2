import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/cardetail';

@Pipe({
  name: 'cardetailPipe'
})
export class CardetailPipePipe implements PipeTransform {

  transform(value: CarDetail[], cardetailFilter: string): CarDetail[] {
    cardetailFilter = cardetailFilter?cardetailFilter.toLocaleLowerCase():""
    return cardetailFilter?value.filter((d:CarDetail)=>(
    d.carName.toLocaleLowerCase().indexOf(cardetailFilter)!==-1 || 
    d.brandName.toLocaleLowerCase().indexOf(cardetailFilter)!==-1 || 
    d.colorName.toLocaleLowerCase().indexOf(cardetailFilter)!==-1)||
    d.modelYear.toString().indexOf(cardetailFilter)!==-1 ||
    d.dailyPrice.toString().indexOf(cardetailFilter)!==-1 ||
    d.description.toLocaleLowerCase().indexOf(cardetailFilter)!==-1):value;
  }

}
