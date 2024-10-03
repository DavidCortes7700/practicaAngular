import { FilesService } from './services/files.service';
import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImgComponent } from './components/img/img.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from "./components/products/products.component";
import { NavComponent } from './components/nav/nav.component';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImgComponent, FormsModule, ProductComponent, ProductsComponent, CommonModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  showImg=true;
  userName = '';
  imgRta = '';
  constructor(
    private authService:AuthService,
    private usersService:UsersService,
    private fileService:FilesService){

  }


  onLoaded(img: string){
    console.log('log padre ', img);
  }

  toggleImg(){
    this.showImg = !this.showImg;
  }

  createUser(){
    this.usersService.create({
      name:'David',
      email:'david@mail.com',
      password:'12345'
    }).subscribe(rta =>{
      console.log(rta,'Usuario creado');
    })
  }

  downloadPdf(){
    this.fileService.getFile('myPdf','https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf','application/pdf')
    .subscribe()
  }

  onUpload($event: Event) {
    const element = $event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.fileService.uploadFile(file).subscribe(rta => {
        this.imgRta = rta.location;
      });
    }
  }

}
