import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { LoginComponent } from './pages/login/login.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'category/:id',
    component: CategoryComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'myCart',
    component: MyCartComponent
  },
  {
    path:'notFound',
    component:NotFoundComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'recovery',
    component:RecoveryComponent
  },
  {
    path: '**',
    component:NotFoundComponent
  }
];
