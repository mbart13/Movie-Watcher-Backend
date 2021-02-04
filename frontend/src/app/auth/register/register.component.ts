import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  register(): void {
    this.authService.register(
      {
        email: this.form.email.value,
        password: this.form.password.value
      }
    )
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/login']);
        }
      });
  }

}
