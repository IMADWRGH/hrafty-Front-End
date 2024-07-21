import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from 'src/app/models/User.model';
import { Customer } from 'src/app/models/Customer.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  user: User = {
    fullName: '',
    password: '',
    email: '',
    role: 'CUSTOMER'
  };

  customer: Customer = {
    id: null,
    imageURL: null,
    sexe: '',
    phone: '',
    userId: null
  };

  selectedFile: File;

  constructor(private authService: AuthService) { }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('user', JSON.stringify(this.user));
    formData.append('customer', JSON.stringify(this.customer));

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.authService.registerCustomers(formData).subscribe(
      response => {
        console.log('Customer registered successfully:', response);
      },
      error => {
        console.error('Error registering customer:', error);
      }
    );
  }
}