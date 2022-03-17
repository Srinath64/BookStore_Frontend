import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
 
  constructor(private userService: UserService, private router: Router) {}
  
  ngOnInit(): void {
    const token = localStorage.getItem("token");
    // if(token != null){
    //   this.router.navigate(['home']);
    // }
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }
  
/**
 * This function is used to login the user
 */
  onSubmit(){
     this.userService.userLogin(this.formGroup.get("username")?.value, this.formGroup.get("password")?.value).subscribe(
      data => {
        
        if(data.token != "try again"){
          localStorage.setItem("token", data.token)
        }else{
          alert("Wrong Email Id or PassWord")
        }
        this.router.navigate(['/home']);
      });  
  }

/* This is used to show and hide the forgot password form. */
  forgotpass = false
  onForgotPassword(){
    this.forgotpass = !this.forgotpass
  }

/**
 * This function is called when the user clicks the "Verify" button. 
 * It calls the forgotPassword function of the userService. 
 * The forgotPassword function takes in the username and password entered by the user.
 */
  onVerify(){
    this.userService.forgotPassword(this.formGroup.get("username")?.value, this.formGroup.get("password")?.value)
    .subscribe(data =>{
      console.log("data ======>", data);
      this.onForgotPassword()
      this.ngOnInit()

    })
  }
}
