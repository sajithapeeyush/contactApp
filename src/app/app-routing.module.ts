import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateContactComponent } from './secure/create-contact/create-contact.component';
import { SecureComponent } from './secure/secure.component';
import { ViewContactComponent } from './secure/view-contact/view-contact.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  
  // {path: '404', component: NotFoundComponent }
  // { path: '**', redirectTo: '404'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  
   {path: 'secure', canActivate: [ AuthGuard ], component: SecureComponent},
   {path: 'create-contact', canActivate: [ AuthGuard ], component:CreateContactComponent},
   {path: 'view-contact', canActivate: [ AuthGuard ], component:ViewContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
