import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/models/Auth.model';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthService,

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
    this.service.login(this.loginForm.get(['email'])!.value, this.loginForm.get(['password'])!.value).subscribe(
      res => {
        console.log(res);
        if (UserStorageService.isSellerLoggedIn()) {
          this.router.navigate(['seller/profile']);
        } else if (UserStorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl('customer');
        }
      }
    );
  }

}
