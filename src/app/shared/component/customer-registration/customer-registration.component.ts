import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent {
  currentStep: number = 0;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  userSignupFormGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    image: ['', Validators.required],
    sexe: ['', Validators.required],
    phone: ['', Validators.required],
  });

  ngOnInit(): void { }

  get f(): { [key: string]: AbstractControl } {
    return this.userSignupFormGroup.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.userSignupFormGroup.invalid) {
      return;
    }

    const user = {
      fullName: this.userSignupFormGroup.value.fullName,
      email: this.userSignupFormGroup.value.email,
      password: this.userSignupFormGroup.value.password,
      role: 'CUSTOMER'
    };

    const customer = {
      image: this.userSignupFormGroup.value.image,
      sexe: this.userSignupFormGroup.value.sexe,
      phone: this.userSignupFormGroup.value.phone,
    };

    const payload = { user, customer };

    this.authService.registerCustomer(payload).subscribe({
      next: data => {
        console.log('Seller registered successfully', data);
      },
      error: error => {
        console.log('Error registering seller', error);
      },
      complete: () => {
        console.log('Registration complete');
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.userSignupFormGroup.reset();
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userSignupFormGroup.patchValue({
        image: file.name
      });
    }
  }
}
