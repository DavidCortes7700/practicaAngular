import { CommonModule } from '@angular/common';
import { Product } from './../../models/product.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImgComponent } from '../img/img.component';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ImgComponent, ReversePipe, HighlightDirective],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {


  @Input() product!: Product;
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  constructor(){

  }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }

}
