import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/models/Auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    const { value } = this.loginForm;
    this.service.login(value.email, value.password).subscribe({
      next: (response: Auth) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        if (response.customer) {
          localStorage.setItem('customer', JSON.stringify(response.customer));
          this.router.navigate(['/customer']);
        } else if (response.seller) {
          localStorage.setItem('seller', JSON.stringify(response.seller));
          this.router.navigate(['/seller']);
        }
      },
      error: (error) => {
        console.error('Invalid email or password', error);
      }
    });
  }

}
