import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { VerificationComponent } from './component/verification/verification.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo:'welcome', pathMatch:'full'},
  {path: 'login' , component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'cart', component: CartComponent},
  {path: 'verification/:email_id', component: VerificationComponent},
  {path: 'feedback/:order_id', component: FeedbackComponent},
  { path: 'welcome', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
