import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './img.component.html',
  styleUrl: './img.component.css'
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img:string='';


  @Input('img')
  set changeImg(newImg:string){
    this.img = newImg;
  }
  @Input()alt:string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault:string = 'https://www.w3schools.com/howto/img_avatar.png';
  // counter:number = 0;
  // counterFn: number | undefined;
  //before render
  //NO async -- once time
  constructor(){
  }


  //before - during render
  //Changes inputs -- times
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnChanges():void{

  }

  //before render
  // async - fetch -- once time
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(){
    // this.counterFn = window.setInterval(()=>{
    //   this.counter +=1;
    //   console.log('RUN COUNTER ',this.counter);
    // },1000);
  }


  // after render
  // handler children
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngAfterViewInit(): void {
  }

  // delete
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    // window.clearInterval(this.counterFn);
  }



  imgError(){
    this.img = this.imageDefault;
  }

  imgLoad(){
    this.loaded.emit(this.img);
  }

}
