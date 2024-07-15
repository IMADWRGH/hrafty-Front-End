import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (res) => {
        console.log(res);
        if (UserStorageService.isSellerLoggedIn()) {
          this.router.navigate(['seller/profile']);
        } else if (UserStorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl('customer');
        }
      },
      (err) => {
        console.log(err);
        if (err.error === 'Email not found') {
          this.loginError = 'Email not found.';
        } else if (err.error === 'Invalid password') {
          this.loginError = 'Invalid password.';
        } else {
          this.loginError = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }
}
