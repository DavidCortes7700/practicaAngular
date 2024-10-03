import { CategoriesService } from './../../services/categories.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { Category } from '../../models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter:number = 0;
  userNameReceive:string='';
  profile: User | null = null;
  categories:Category[] = [];
  constructor(private storeService: StoreService, private authService:AuthService, private usersService:UsersService, private categoriesService:CategoriesService){}

  ngOnInit():void{
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.login('david@mail.com','12345').subscribe(() =>{
      this.getProfile();
    })
  }

  getProfile(){
    this.authService.profile().subscribe(user =>{
      this.profile = user;
    });
  }

  getAllCategories(){
    this.categoriesService.getAll().subscribe(data => {
      this.categories=data;
      console.log(this.categories);
    });
  }

}
