import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { Customer } from 'src/app/models/Customer.model';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent {
  userSignupFormGroup: FormGroup;
  hidePassword = true;
  selectedFile: File | null = null;
  EmailError: string = '';

  constructor(private formBuilder: FormBuilder,private auth: AuthService,private rout:Router) { }

  ngOnInit() {
    this.userSignupFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      sexe: ['', Validators.required]
    });
  }

  get f() { return this.userSignupFormGroup.controls; }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  
  onSubmit() {
    if (this.userSignupFormGroup.invalid) {
      return;
    }
    const formData = new FormData();
    const user: User = {
      fullName: this.f['fullName'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
      role: 'CUSTOMER'
    };
    const customer: Customer = {
      sexe: this.f['sexe'].value,
      phone: this.f['phone'].value
    };

    formData.append('user', JSON.stringify(user));
    formData.append('customer', JSON.stringify(customer));
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    console.log(formData);
    this.auth.registerCustomers(formData).subscribe({
      next: (data) => {
        console.log('User registered successfully', data);
        this.rout.navigate(['/login']);
      },
      error: (err) => {
        if (err.error === 'Email already exist') {
          this.EmailError = 'Email already exist';
        }else {
          this.EmailError = 'An unexpected error occurred. Please try again later.';
        }
        console.error('Error registering user', err);
      }
    })
  }


  onReset() {
    this.userSignupFormGroup.reset();
    this.selectedFile = null;
  }
}
