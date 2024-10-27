import { Pipe, PipeTransform } from '@angular/core';
import { max } from 'rxjs';

@Pipe({
  name: 'trucateName',
  standalone: true
})
export class TrucateNamePipe implements PipeTransform {

  transform(value: string, maxLength:number = 16 , ellipses:string = "..."): unknown {
    if(value.length>maxLength){
      return value.slice(0,maxLength) + ellipses;

    }
    return value;
  }

}
