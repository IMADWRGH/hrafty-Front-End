import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-registration',
  templateUrl: './choose-registration.component.html',
  styleUrls: ['./choose-registration.component.css']
})
export class ChooseRegistrationComponent {

  constructor(private route: Router) { }

  register(type: string) {
    if (type === 'customer') {
      this.route.navigate(['/customer-register'])
    } else {
      this.route.navigate(['/seller-register'])
    }
  }
}
