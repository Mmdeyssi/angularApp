import { Product } from './../../../types';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule,CommonModule,FormsModule,RatingModule,ButtonModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css'
})
export class EditPopupComponent {
  
  @Input() header!:string;//the ! means that this input will always be provided 
  @Output() confirm=new EventEmitter<Product>();
  @Input() display : boolean=false;
  @Output() displayChange = new EventEmitter<boolean>();
 
  @Input() product:Product={
    
    name:'',
    image:'',
    price:'',
    rating:0,
  };
  onConfirm(){
    this.confirm.emit(this.product);
    this.display=false;
    this.displayChange.emit(this.display);
  }
  onCancel(){
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
