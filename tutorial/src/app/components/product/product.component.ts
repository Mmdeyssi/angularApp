import { PricePipe } from './../../pipes/price.pipe';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { TrucateNamePipe } from '../../pipes/trucate-name.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule , FormsModule, ButtonModule,ConfirmPopupModule,PricePipe,TrucateNamePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers:[ConfirmationService]
})
  export class ProductComponent {
    constructor(private confirmationService:ConfirmationService){}
    @ViewChild ('deletebutton') deletebutton : any
    @Input() product! : Product;
    @Output() edit:EventEmitter<Product> = new EventEmitter<Product>();
    @Output() delete:EventEmitter<Product> = new EventEmitter<Product>();
    
    confirmDelete(){
      this.confirmationService.confirm({
        target : this.deletebutton.nativeElement,
        message: 'Are you sure you want to delete this product?',
        accept:()=>{
          this.deleteProduct();
        }, 
      });
    }
    editProduct(){
      this.edit.emit(this.product);
    }
    deleteProduct(){
      this.delete.emit(this.product);
    }
   
    ngOnInit(){}

}
