import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-registration',
  templateUrl: './seller-registration.component.html',
  styleUrls: ['./seller-registration.component.css']
})
export class SellerRegistrationComponent implements OnInit {
  submitted: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  userSignupFormGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    nb_license: ['', Validators.required],
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

    const formData = new FormData();

    const user = {
      fullName: this.userSignupFormGroup.value.fullName,
      email: this.userSignupFormGroup.value.email,
      password: this.userSignupFormGroup.value.password,
      role: 'SELLER'
    };

    const seller = {
      nb_license: this.userSignupFormGroup.value.nb_license,
      sexe: this.userSignupFormGroup.value.sexe,
      phone: this.userSignupFormGroup.value.phone,
      site: this.userSignupFormGroup.value.site,
      addressId: {
        street: this.userSignupFormGroup.value.street,
        shop_number: this.userSignupFormGroup.value.shop_number,
        name_city: this.userSignupFormGroup.value.name_city,
        name_regional: this.userSignupFormGroup.value.name_regional
      }
    };

    formData.append('user', JSON.stringify(user));
    formData.append('seller', JSON.stringify(seller));

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    this.authService.registerSeller(formData).subscribe({
      next: data => {
        this.router.navigate(['/login']);
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
    this.selectedFile = null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}