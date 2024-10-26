import { Product, Products } from './../../types';
import { ProductsService } from './../services/products.service';
import { Component, ViewChild } from '@angular/core';
import { ProductComponent } from "../components/product/product.component";
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from "../components/edit-popup/edit-popup.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent,ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private ProductsService: ProductsService

  ){}
  @ViewChild('paginator') paginator : Paginator | undefined;
  totalRecords = 0;
  rows=5;
  displayEditPopup : boolean=false;
  displayAddPopup :boolean=false;

  selectedProduct : Product = {
    id:0,
    name:'',
    image:'',
    price:'',
    rating:0,

  };
  toggleEditPopup(product:Product){
    this.selectedProduct=product;
    this.displayEditPopup=true;
  }
  toggleAddPopup(){
    this.displayAddPopup=true;
  }
  toggleDeletePopup(product:Product){
    this.deleteProduct(product.id ??0);
  }
  onConfirmEdit(product:Product ){
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProduct(product,this.selectedProduct.id);
    this.displayEditPopup = false;
  }
  onConfirmAdd(product:Product){
    this.addProduct(product);
    this.displayAddPopup = false;


  }

  
  products: Product[] = [];
  onProduct(product:Product){
    console.log(product, 'output');
  }
  onPageChange(event:any){
    this.fetchProducts(event.page,event.rows); 

  }
  resetPginator(){
    this.paginator?.changePage(0);
  }
  fetchProducts(page: number, perPage: number) {
    this.ProductsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.ProductsService
      .editProducts(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPginator();
          
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number) {
    this.ProductsService
      .deleteProducts(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPginator();
         
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProduct(product: Product) {
    this.ProductsService
      .addProducts(`http://localhost:3000/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPginator();
          
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}