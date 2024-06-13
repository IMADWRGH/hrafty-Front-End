import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {
  signupForm: FormGroup;

  constructor(public fb: FormBuilder, public authServices: AuthService, public router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    })
  }
  registerUser() {
    //   this.authServices.singup(this.signupForm.value).subscribe(
    //   (res) => {
    //     if (res.result) {
    //       this.signupForm.reset();
    //       this.router.navigate(['login'])
    //     }
    //   }
    // )
  }
}
