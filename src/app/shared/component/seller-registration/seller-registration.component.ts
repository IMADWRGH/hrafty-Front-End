import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-registration',
  templateUrl: './seller-registration.component.html',
  styleUrls: ['./seller-registration.component.css']
})
export class SellerRegistrationComponent {
  currentStep: number = 0;
  fieldsets: number[] = [0, 1]
  steps: string[] = ['User Information', 'Profile Information'];
  password_confirmation!:string;

  userSignupFormGroup!: FormGroup;
  sellerSignupFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSignupFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required],
    });
    this.sellerSignupFormGroup = this.formBuilder.group({
      nbr_licese: ['', Validators.required],
      image: ['', Validators.required],
      sexe: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(12)]],
      website: ['', Validators.required],
    })
  }

get f() {
  return this.userSignupFormGroup.controls;

}

next(){
  if(this.currentStep==0 && this.userSignupFormGroup.invalid){

  }
}

  submitForm(): void {
    // this.http.post('http://localhost:3000/users', this.userSignupFormGroup.value)
    //   .subscribe((userResponse) => {
    //     console.log('User created:', userResponse);

    //     this.http.post('http://localhost:3000/candidats', {
    //       user: userResponse,
    //       ...this.candidatSignupFormGroup.value,
    //       skills: this.selectedSkills,
    //       education: [this.educationSignupFormGroup.value],
    //       experiences: [this.experienceSignupFormGroup.value],
    //     }).subscribe((candidatResponse) => {
    //       console.log('Candidat created:', candidatResponse);
    //       this.router.navigate(['/profile']); // Navigate to profile page after successful signup
    //     });
    //   });
  }

  previous(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
}
