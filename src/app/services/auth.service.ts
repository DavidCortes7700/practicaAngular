import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { User } from './../models/user.model';
import { tap } from 'rxjs';
import { TokenService } from './token.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl:string = `https://young-sands-07814.herokuapp.com/api/auth`;
  constructor(private http: HttpClient, private tokenService:TokenService) { }

  login(email: string,password:string){
    return this.http.post<Auth>(this.apiUrl+'/login',{email,password}).pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }


  profile(){
    // let headers = new HttpHeaders();
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // headers = headers.set('Authorization', `Bearer ${token}`);
    // return this.http.get<User>(`${this.apiUrl}/profile`, { headers });
    return this.http.get<User>(`${this.apiUrl}/profile`);

  }

}
