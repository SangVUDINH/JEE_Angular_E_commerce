import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
  }


  onLogin(dataForm:any){
    console.log(dataForm);
    this.authenticationService.login(dataForm.username,dataForm.password);
    this.authenticationService.saveAuthenticatedUser();
    if(this.authenticationService.isAuthenticated){
      this.router.navigateByUrl('');
    }

  }
}
