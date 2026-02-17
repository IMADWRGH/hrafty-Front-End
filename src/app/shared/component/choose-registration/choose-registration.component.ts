import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-registration',
  templateUrl: './choose-registration.component.html',
  styleUrls: ['./choose-registration.component.css']
})
export class ChooseRegistrationComponent {

  constructor(private router: Router) { }

  register(type: string): void {
    if (type === 'customer') {
      this.router.navigate(['/customer-register']);
    } else {
      this.router.navigate(['/seller-register']);
    }
  }
}