import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsComponent } from '../../components/products/products.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  categoeyId:string | null = null;
  limit = 10;
  offset = 0;
  products:Product[] = [];

  constructor(private route:ActivatedRoute, private productsService:ProductsService ){

  }

  ngOnInit():void{
    this.route.paramMap.pipe(
      switchMap(params => {
        this.categoeyId = params.get('id');
        if(this.categoeyId){
          return this.productsService.getByCategory(this.categoeyId,this.limit,this.offset)
        }
        return []
      })
    ).subscribe((data) =>{
      this.products = data;
    });
  }

}
