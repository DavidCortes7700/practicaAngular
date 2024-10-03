import { EventEmitter, Input, Output } from '@angular/core';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StoreService } from './../../services/store.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { VocalToNumberPipe } from '../../pipes/vocal-to-number.pipe';
import { register } from 'swiper/element/bundle';
import { switchMap, zip } from 'rxjs';
register();

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent,CommonModule,TimeAgoPipe, VocalToNumberPipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  totalPrice = 0;
  @Input() products:Product[] = [];
  @Output() loadMore = new EventEmitter();
  showProductDetail = false;
  productChosen: Product = {
    id:'',
    price:0,
    images:[],
    title:'',
    category:{
      id:'',
      name:''
    },
    description:''
  }

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(private storeService:StoreService, private productsService: ProductsService){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }


  onAddToShoppingCart(product:Product) {
    this.storeService.addProduct(product);
    this.totalPrice = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.productsService.getProduct(id).subscribe(data =>{
      this.productChosen = data;
      this.statusDetail = 'success';
    }, errorMsg =>{
      window.alert(errorMsg);
      this.statusDetail = 'error';
    });
  }

  readAndUpdate(id: string){
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title:'change'}))
    ).subscribe(data =>{
      console.log(data);
    });

    this.productsService.fetchReadAndUpdate(id,{title:'change'}).subscribe(data =>{
      const read = data[0];
      const update = data[1];
    })
  }

  createNewProduct(){
    const product:CreateProductDTO = {
      title:'Nuevo producto',
      description:'nuevo producto prueba',
      images: [''],
      price: 3500,
      categoryId:2,
    }
    this.productsService.create(product).subscribe(data => {
      this.products.unshift(data);
    })
  }

  updateProduct(){
    const changes:UpdateProductDTO = {
      title: 'CHANGE titulo',
    }
    const id  = this.productChosen.id;
    this.productsService.update(id, changes).subscribe(data=>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex,1);
      this.showProductDetail = false;
    });
  }

  onLoadMore(){
    this.loadMore.emit();
  }
}
