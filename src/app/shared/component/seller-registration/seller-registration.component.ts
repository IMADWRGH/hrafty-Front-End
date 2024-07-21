import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-registration',
  templateUrl: './seller-registration.component.html',
  styleUrls: ['./seller-registration.component.css']
})
export class SellerRegistrationComponent implements OnInit {
  currentStep: number = 0;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) { }

  userSignupFormGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    nb_license: ['', Validators.required],
    image: ['', Validators.required],
    sexe: ['', Validators.required],
    phone: ['', Validators.required],
    site: ['', Validators.required],
    street: ['', Validators.required],
    name_regional: ['', Validators.required],
    name_city: ['', Validators.required],
    shop_number: ['', Validators.required]
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
      role: 'SELLER'
    };

    const address = {
      street: this.userSignupFormGroup.value.street,
      name_regional: this.userSignupFormGroup.value.name_regional,
      name_city: this.userSignupFormGroup.value.name_city,
      shop_number: this.userSignupFormGroup.value.shop_number,
    };

    const seller = {
      nb_license: this.userSignupFormGroup.value.nb_license,
      image: this.userSignupFormGroup.value.image,
      sexe: this.userSignupFormGroup.value.sexe,
      phone: this.userSignupFormGroup.value.phone,
      site: this.userSignupFormGroup.value.site,
      addressId: address
    };

    const payload = { user, seller };

    this.authService.registerSeller(payload).subscribe({
      next: data => {
        this.route.navigate(['/login']);
        console.log('Seller registered successfully', data);
      },
      error: error => {
        console.error('Error registering seller:', error);
        catchError(error);
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
