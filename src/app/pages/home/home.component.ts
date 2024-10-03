import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  products:Product[] = [];
  limit = 10;
  offset = 0;

  constructor(private productsService: ProductsService){}

  ngOnInit():void{
    this.paginator(10,0);
  }


  paginator(limit:number, offset:number){
    this.productsService.getproductsByPage(limit,offset).subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }

  onLoadMore() {
    this.paginator(this.limit,this.offset);
  }
}
