import { Product } from './../../../types';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [ReactiveFormsModule,DialogModule,CommonModule,FormsModule,RatingModule,ButtonModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css'
})
export class EditPopupComponent {
  formProduct:FormGroup;
  
  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }
  constructor(private formBuilder : FormBuilder){
    this.formProduct= this.formBuilder.group({
      name:['',[Validators.required,this.specialCharacterValidator()]],
      image:[''],
      price:['',[Validators.required,this.specialCharacterValidator]],
      rating:[0],
    })
  }

  
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

  ngOnChanges(){
    this.formProduct.patchValue(this.product);

  }

  onConfirm(){
    const {name,image,price,rating}=this.formProduct.value;
    this.confirm.emit({
      name: name ||'',
      image:image || '',
      price: price || '',
      rating: rating || 0,
    });
    this.display=false;
    this.displayChange.emit(this.display);
  }
  onCancel(){
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
