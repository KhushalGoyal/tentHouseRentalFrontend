import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path : 'home', loadChildren : () => import("src/app/home/home.module").then(mod => mod.HomeModule), canActivate: [AuthGuard]},
  { path : 'login', component : LoginComponent },
  { path : '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
